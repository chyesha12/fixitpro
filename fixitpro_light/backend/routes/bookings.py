from flask import Blueprint, jsonify, request
from config.db import get_connection
import jwt
import random
import string
import datetime

bookings_bp = Blueprint('bookings', __name__)
SECRET_KEY = 'localservice_secret_key_2024'

def get_user_from_token(request):
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    return payload['user_id']

def generate_booking_code():
    return 'BK' + ''.join(random.choices(string.digits, k=8))

@bookings_bp.route('/', methods=['POST'])
def create_booking():
    try:
        user_id = get_user_from_token(request)
        data = request.get_json()
        service_id = data.get('service_id')
        address = data.get('address')
        city = data.get('city', '')
        state = data.get('state', '')
        pincode = data.get('pincode', '')
        scheduled_date = data.get('scheduled_date')
        scheduled_time = data.get('scheduled_time')
        notes = data.get('notes', '')

        if not all([service_id, address, scheduled_date, scheduled_time]):
            return jsonify({'error': 'Missing required fields'}), 400

        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT base_price FROM services WHERE id = ?", (service_id,))
        service = cursor.fetchone()
        if not service:
            return jsonify({'error': 'Service not found'}), 404

        booking_code = generate_booking_code()
        cursor.execute("""
            INSERT INTO bookings (booking_code, user_id, service_id, address, city, state, pincode,
                scheduled_date, scheduled_time, total_amount, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (booking_code, user_id, service_id, address, city, state, pincode,
              scheduled_date, scheduled_time, service[0], notes))
        conn.commit()
        cursor.execute("SELECT id FROM bookings WHERE booking_code = ?", (booking_code,))
        booking_id = cursor.fetchone()[0]
        conn.close()
        return jsonify({'message': 'Booking created successfully', 'booking_id': booking_id, 'booking_code': booking_code}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/my', methods=['GET'])
def my_bookings():
    try:
        user_id = get_user_from_token(request)
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT b.id, b.booking_code, b.scheduled_date, b.scheduled_time,
                   b.address, b.status, b.total_amount, b.created_at,
                   s.name as service_name, s.icon, s.category,
                   u.name as technician_name, u.phone as technician_phone
            FROM bookings b
            JOIN services s ON b.service_id = s.id
            LEFT JOIN technicians t ON b.technician_id = t.id
            LEFT JOIN users u ON t.user_id = u.id
            WHERE b.user_id = ?
            ORDER BY b.created_at DESC
        """, (user_id,))
        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
        bookings = [dict(zip(columns, row)) for row in rows]
        conn.close()
        return jsonify(bookings)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/<int:booking_id>', methods=['GET'])
def get_booking(booking_id):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT b.*, s.name as service_name, s.icon, s.category, s.base_price,
                   u.name as technician_name, u.phone as technician_phone
            FROM bookings b
            JOIN services s ON b.service_id = s.id
            LEFT JOIN technicians t ON b.technician_id = t.id
            LEFT JOIN users u ON t.user_id = u.id
            WHERE b.id = ?
        """, (booking_id,))
        row = cursor.fetchone()
        conn.close()
        if not row:
            return jsonify({'error': 'Booking not found'}), 404
        columns = [col[0] for col in cursor.description]
        return jsonify(dict(zip(columns, row)))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/<int:booking_id>/cancel', methods=['PUT'])
def cancel_booking(booking_id):
    try:
        user_id = get_user_from_token(request)
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE bookings SET status = 'cancelled', updated_at = GETDATE() WHERE id = ? AND user_id = ?",
            (booking_id, user_id)
        )
        conn.commit()
        conn.close()
        return jsonify({'message': 'Booking cancelled successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
