from flask import Blueprint, request, jsonify
from config.db import get_connection
import bcrypt
import jwt
import datetime

auth_bp = Blueprint('auth', __name__)
SECRET_KEY = 'localservice_secret_key_2024'

def generate_token(user_id, role):
    payload = {
        'user_id': user_id,
        'role': role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    phone = data.get('phone', '')
    address = data.get('address', '')

    if not all([name, email, password]):
        return jsonify({'error': 'Name, email and password are required'}), 400

    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)",
            (name, email, hashed, phone, address)
        )
        conn.commit()
        cursor.execute("SELECT id, role FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()
        conn.close()
        token = generate_token(user[0], user[1])
        return jsonify({'token': token, 'user': {'id': user[0], 'name': name, 'email': email, 'role': user[1]}}), 201
    except Exception as e:
        return jsonify({'error': 'Email already exists' if 'UNIQUE' in str(e) or 'unique' in str(e) else str(e)}), 400

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({'error': 'Email and password are required'}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, email, password, role, phone FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()
        conn.close()

        if not user or not bcrypt.checkpw(password.encode('utf-8'), user[3].encode('utf-8')):
            return jsonify({'error': 'Invalid credentials'}), 401

        token = generate_token(user[0], user[4])
        return jsonify({
            'token': token,
            'user': {'id': user[0], 'name': user[1], 'email': user[2], 'role': user[4], 'phone': user[5]}
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/profile', methods=['GET'])
def profile():
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, email, phone, role, address FROM users WHERE id = ?", (payload['user_id'],))
        user = cursor.fetchone()
        conn.close()
        if not user:
            return jsonify({'error': 'User not found'}), 404
        return jsonify({'id': user[0], 'name': user[1], 'email': user[2], 'phone': user[3], 'role': user[4], 'address': user[5]})
    except:
        return jsonify({'error': 'Invalid token'}), 401
