from flask import Blueprint, jsonify, request
from config.db import get_connection
import jwt

admin_bp = Blueprint('admin', __name__)
SECRET_KEY = 'localservice_secret_key_2024'

def require_admin(request):
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    if payload.get('role') != 'admin':
        raise Exception('Admin access required')
    return payload

@admin_bp.route('/stats', methods=['GET'])
def get_stats():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        stats = {}
        cursor.execute("SELECT COUNT(*) FROM users"); stats['total_users'] = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM bookings"); stats['total_bookings'] = cursor.fetchone()[0]
        cursor.execute("SELECT ISNULL(SUM(total_amount),0) FROM bookings WHERE status='completed'"); stats['total_revenue'] = float(cursor.fetchone()[0])
        cursor.execute("SELECT COUNT(*) FROM bookings WHERE status='pending'"); stats['pending_bookings'] = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM bookings WHERE status='completed'"); stats['completed_bookings'] = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM technicians WHERE is_available=1"); stats['active_technicians'] = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM services"); stats['total_services'] = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM contact_messages WHERE status='unread'"); stats['unread_messages'] = cursor.fetchone()[0]
        conn.close()
        return jsonify(stats)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/bookings/all', methods=['GET'])
def all_bookings():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT b.id, b.booking_code, b.scheduled_date, b.scheduled_time,
                   b.address, b.city, b.status, b.total_amount, b.created_at,
                   s.name as service_name, u.name as user_name,
                   ISNULL(tu.name,'Unassigned') as technician_name
            FROM bookings b
            JOIN services s ON b.service_id=s.id
            JOIN users u ON b.user_id=u.id
            LEFT JOIN technicians t ON b.technician_id=t.id
            LEFT JOIN users tu ON t.user_id=tu.id
            ORDER BY b.created_at DESC
        """)
        rows = cursor.fetchall()
        cols = [c[0] for c in cursor.description]
        conn.close()
        return jsonify([dict(zip(cols,r)) for r in rows])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/users', methods=['GET'])
def all_users():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, email, phone, role, created_at FROM users ORDER BY created_at DESC")
        rows = cursor.fetchall()
        cols = [c[0] for c in cursor.description]
        conn.close()
        return jsonify([dict(zip(cols,r)) for r in rows])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/bookings/<int:booking_id>/status', methods=['PUT'])
def update_booking_status(booking_id):
    try:
        data = request.get_json()
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("UPDATE bookings SET status=?, updated_at=GETDATE() WHERE id=?", (data['status'], booking_id))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Status updated'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/users/<int:user_id>/role', methods=['PUT'])
def update_user_role(user_id):
    try:
        data = request.get_json()
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("UPDATE users SET role=? WHERE id=?", (data['role'], user_id))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Role updated'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
