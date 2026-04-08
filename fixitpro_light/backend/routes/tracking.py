from flask import Blueprint, jsonify, request
from config.db import get_connection

tracking_bp = Blueprint('tracking', __name__)

@tracking_bp.route('/update', methods=['POST'])
def update_location():
    try:
        data = request.get_json()
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO technician_locations (technician_id, booking_id, lat, lng)
            VALUES (?, ?, ?, ?)
        """, (data['technician_id'], data['booking_id'], data['lat'], data['lng']))
        cursor.execute("""
            UPDATE technicians SET current_lat = ?, current_lng = ? WHERE id = ?
        """, (data['lat'], data['lng'], data['technician_id']))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Location updated'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@tracking_bp.route('/<int:booking_id>', methods=['GET'])
def get_tracking(booking_id):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT TOP 1 tl.lat, tl.lng, tl.timestamp,
                   u.name as technician_name, b.status
            FROM technician_locations tl
            JOIN bookings b ON tl.booking_id = b.id
            JOIN technicians t ON tl.technician_id = t.id
            JOIN users u ON t.user_id = u.id
            WHERE tl.booking_id = ?
            ORDER BY tl.timestamp DESC
        """, (booking_id,))
        row = cursor.fetchone()
        conn.close()
        if not row:
            return jsonify({'error': 'No tracking data'}), 404
        return jsonify({'lat': float(row[0]), 'lng': float(row[1]),
                        'timestamp': str(row[2]), 'technician_name': row[3], 'status': row[4]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
