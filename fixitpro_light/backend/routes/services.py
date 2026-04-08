from flask import Blueprint, jsonify, request
from config.db import get_connection

services_bp = Blueprint('services', __name__)

@services_bp.route('/', methods=['GET'])
def get_services():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        category = request.args.get('category')
        if category:
            cursor.execute("SELECT * FROM services WHERE is_active = 1 AND category = ?", (category,))
        else:
            cursor.execute("SELECT * FROM services WHERE is_active = 1 ORDER BY category")
        rows = cursor.fetchall()
        conn.close()
        columns = [col[0] for col in cursor.description]
        services = [dict(zip(columns, row)) for row in rows]
        return jsonify(services)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@services_bp.route('/<int:service_id>', methods=['GET'])
def get_service(service_id):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM services WHERE id = ?", (service_id,))
        row = cursor.fetchone()
        conn.close()
        if not row:
            return jsonify({'error': 'Service not found'}), 404
        columns = [col[0] for col in cursor.description]
        return jsonify(dict(zip(columns, row)))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@services_bp.route('/categories', methods=['GET'])
def get_categories():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT DISTINCT category FROM services WHERE is_active = 1")
        categories = [row[0] for row in cursor.fetchall()]
        conn.close()
        return jsonify(categories)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
