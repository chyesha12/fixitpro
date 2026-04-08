from flask import Blueprint, jsonify, request
from config.db import get_connection
import jwt

reviews_bp = Blueprint('reviews', __name__)
SECRET_KEY = 'localservice_secret_key_2024'

@reviews_bp.route('/', methods=['GET'])
def get_reviews():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        service_id = request.args.get('service_id')
        if service_id:
            cursor.execute("""
                SELECT r.*, u.name as user_name, s.name as service_name
                FROM reviews r
                JOIN users u ON r.user_id = u.id
                JOIN services s ON r.service_id = s.id
                WHERE r.service_id = ?
                ORDER BY r.created_at DESC
            """, (service_id,))
        else:
            cursor.execute("""
                SELECT TOP 20 r.*, u.name as user_name, s.name as service_name
                FROM reviews r
                JOIN users u ON r.user_id = u.id
                JOIN services s ON r.service_id = s.id
                ORDER BY r.created_at DESC
            """)
        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
        reviews = [dict(zip(columns, row)) for row in rows]
        conn.close()
        return jsonify(reviews)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@reviews_bp.route('/', methods=['POST'])
def create_review():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        user_id = payload['user_id']
        data = request.get_json()

        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO reviews (booking_id, user_id, technician_id, service_id, rating, comment)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (data.get('booking_id'), user_id, data.get('technician_id'),
              data.get('service_id'), data.get('rating'), data.get('comment', '')))

        cursor.execute("""
            UPDATE services SET
                rating = (SELECT AVG(CAST(rating AS FLOAT)) FROM reviews WHERE service_id = ?),
                total_reviews = (SELECT COUNT(*) FROM reviews WHERE service_id = ?)
            WHERE id = ?
        """, (data['service_id'], data['service_id'], data['service_id']))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Review submitted successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
