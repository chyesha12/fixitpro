from flask import Blueprint, jsonify, request
from config.db import get_connection

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/', methods=['POST'])
def send_message():
    try:
        data = request.get_json()
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO contact_messages (name, email, phone, subject, message)
            VALUES (?, ?, ?, ?, ?)
        """, (data.get('name'), data.get('email'), data.get('phone', ''),
              data.get('subject', ''), data.get('message')))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Your message has been sent successfully!'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
