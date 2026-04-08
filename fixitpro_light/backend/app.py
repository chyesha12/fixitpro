from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from config.db import init_db
from routes.auth import auth_bp
from routes.services import services_bp
from routes.bookings import bookings_bp
from routes.reviews import reviews_bp
from routes.contact import contact_bp
from routes.tracking import tracking_bp
from routes.admin import admin_bp

app = Flask(__name__)
app.config['SECRET_KEY'] = 'localservice_secret_key_2024'
CORS(app, resources={r"/api/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize DB
init_db()

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(services_bp, url_prefix='/api/services')
app.register_blueprint(bookings_bp, url_prefix='/api/bookings')
app.register_blueprint(reviews_bp, url_prefix='/api/reviews')
app.register_blueprint(contact_bp, url_prefix='/api/contact')
app.register_blueprint(tracking_bp, url_prefix='/api/tracking')
app.register_blueprint(admin_bp, url_prefix='/api/admin')

# Real-Time Tracking via SocketIO
@socketio.on('technician_location')
def handle_location(data):
    socketio.emit('location_update', data, room=data.get('booking_id'))

@socketio.on('join_tracking')
def join_tracking(data):
    from flask_socketio import join_room
    join_room(data.get('booking_id'))

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)
