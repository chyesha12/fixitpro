import pyodbc
import os

# ================================================================
# Microsoft SQL Server Configuration
# ================================================================
# OPTION A (Recommended - No password needed):
#   Set USE_WINDOWS_AUTH = True  -> uses your Windows login
#
# OPTION B (SQL Server login with sa):
#   Set USE_WINDOWS_AUTH = False
#   Set your sa password in DB_CONFIG below
# ================================================================

USE_WINDOWS_AUTH = True      # Change to False to use sa login

DB_CONFIG = {
    'server': 'localhost',        # Try: localhost, .\SQLEXPRESS, (local)
    'database': 'LocalServiceDB',
    'username': 'sa',             # Only used when USE_WINDOWS_AUTH = False
    'password': 'FixItPro@123',   # Only used when USE_WINDOWS_AUTH = False
    'driver': 'ODBC Driver 17 for SQL Server'
}


def get_connection():
    if USE_WINDOWS_AUTH:
        conn_str = (
            f"DRIVER={{{DB_CONFIG['driver']}}};"
            f"SERVER={DB_CONFIG['server']};"
            f"DATABASE={DB_CONFIG['database']};"
            "Trusted_Connection=yes;"
            "TrustServerCertificate=yes;"
        )
    else:
        conn_str = (
            f"DRIVER={{{DB_CONFIG['driver']}}};"
            f"SERVER={DB_CONFIG['server']};"
            f"DATABASE={DB_CONFIG['database']};"
            f"UID={DB_CONFIG['username']};"
            f"PWD={DB_CONFIG['password']};"
            "TrustServerCertificate=yes;"
        )
    return pyodbc.connect(conn_str)


def get_master_connection():
    if USE_WINDOWS_AUTH:
        conn_str = (
            f"DRIVER={{{DB_CONFIG['driver']}}};"
            f"SERVER={DB_CONFIG['server']};"
            "DATABASE=master;"
            "Trusted_Connection=yes;"
            "TrustServerCertificate=yes;"
        )
    else:
        conn_str = (
            f"DRIVER={{{DB_CONFIG['driver']}}};"
            f"SERVER={DB_CONFIG['server']};"
            "DATABASE=master;"
            f"UID={DB_CONFIG['username']};"
            f"PWD={DB_CONFIG['password']};"
            "TrustServerCertificate=yes;"
        )
    return pyodbc.connect(conn_str, autocommit=True)


def init_db():
    """Initialize the database and create all tables."""
    try:
        conn = get_master_connection()
        cursor = conn.cursor()
        cursor.execute(f"""
            IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = '{DB_CONFIG['database']}')
            CREATE DATABASE {DB_CONFIG['database']}
        """)
        conn.close()
        print(f"Database '{DB_CONFIG['database']}' ready.")
    except Exception as e:
        print(f"DB creation warning: {e}")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
        CREATE TABLE users (
            id INT IDENTITY(1,1) PRIMARY KEY,
            name NVARCHAR(100) NOT NULL,
            email NVARCHAR(150) UNIQUE NOT NULL,
            password NVARCHAR(255) NOT NULL,
            phone NVARCHAR(20),
            role NVARCHAR(20) DEFAULT 'customer',
            address NVARCHAR(255),
            avatar NVARCHAR(255),
            created_at DATETIME DEFAULT GETDATE()
        )
    """)

    cursor.execute("""
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='services' AND xtype='U')
        CREATE TABLE services (
            id INT IDENTITY(1,1) PRIMARY KEY,
            name NVARCHAR(100) NOT NULL,
            category NVARCHAR(100) NOT NULL,
            description NVARCHAR(MAX),
            base_price DECIMAL(10,2) NOT NULL,
            duration_minutes INT DEFAULT 60,
            icon NVARCHAR(50),
            image_url NVARCHAR(255),
            rating DECIMAL(3,2) DEFAULT 0.0,
            total_reviews INT DEFAULT 0,
            is_active BIT DEFAULT 1,
            created_at DATETIME DEFAULT GETDATE()
        )
    """)

    cursor.execute("""
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='technicians' AND xtype='U')
        CREATE TABLE technicians (
            id INT IDENTITY(1,1) PRIMARY KEY,
            user_id INT REFERENCES users(id),
            service_id INT REFERENCES services(id),
            specialization NVARCHAR(100),
            experience_years INT DEFAULT 0,
            rating DECIMAL(3,2) DEFAULT 0.0,
            total_jobs INT DEFAULT 0,
            is_available BIT DEFAULT 1,
            current_lat DECIMAL(10,8),
            current_lng DECIMAL(11,8),
            verified BIT DEFAULT 0,
            created_at DATETIME DEFAULT GETDATE()
        )
    """)

    cursor.execute("""
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='bookings' AND xtype='U')
        CREATE TABLE bookings (
            id INT IDENTITY(1,1) PRIMARY KEY,
            booking_code NVARCHAR(20) UNIQUE NOT NULL,
            user_id INT REFERENCES users(id),
            service_id INT REFERENCES services(id),
            technician_id INT REFERENCES technicians(id),
            address NVARCHAR(255) NOT NULL,
            city NVARCHAR(100),
            state NVARCHAR(100),
            pincode NVARCHAR(10),
            lat DECIMAL(10,8),
            lng DECIMAL(11,8),
            scheduled_date DATE NOT NULL,
            scheduled_time TIME NOT NULL,
            status NVARCHAR(30) DEFAULT 'pending',
            total_amount DECIMAL(10,2),
            notes NVARCHAR(MAX),
            created_at DATETIME DEFAULT GETDATE(),
            updated_at DATETIME DEFAULT GETDATE()
        )
    """)

    cursor.execute("""
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='reviews' AND xtype='U')
        CREATE TABLE reviews (
            id INT IDENTITY(1,1) PRIMARY KEY,
            booking_id INT REFERENCES bookings(id),
            user_id INT REFERENCES users(id),
            technician_id INT REFERENCES technicians(id),
            service_id INT REFERENCES services(id),
            rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
            comment NVARCHAR(MAX),
            created_at DATETIME DEFAULT GETDATE()
        )
    """)

    cursor.execute("""
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='contact_messages' AND xtype='U')
        CREATE TABLE contact_messages (
            id INT IDENTITY(1,1) PRIMARY KEY,
            name NVARCHAR(100) NOT NULL,
            email NVARCHAR(150) NOT NULL,
            phone NVARCHAR(20),
            subject NVARCHAR(200),
            message NVARCHAR(MAX) NOT NULL,
            status NVARCHAR(20) DEFAULT 'unread',
            created_at DATETIME DEFAULT GETDATE()
        )
    """)

    cursor.execute("""
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='technician_locations' AND xtype='U')
        CREATE TABLE technician_locations (
            id INT IDENTITY(1,1) PRIMARY KEY,
            technician_id INT REFERENCES technicians(id),
            booking_id INT REFERENCES bookings(id),
            lat DECIMAL(10,8) NOT NULL,
            lng DECIMAL(11,8) NOT NULL,
            timestamp DATETIME DEFAULT GETDATE()
        )
    """)

    cursor.execute("SELECT COUNT(*) FROM services")
    if cursor.fetchone()[0] == 0:
        services = [
            ('Plumbing Repair',       'Plumbing',    'Fix leaks, pipes, drains and all plumbing issues',       499.00,  90,  '🔧'),
            ('Electrical Wiring',     'Electrical',  'Safe electrical installation and repair services',       599.00,  120, '⚡'),
            ('AC Repair & Service',   'HVAC',        'AC repair, cleaning, gas refilling and maintenance',     699.00,  120, '❄️'),
            ('Appliance Repair',      'Appliance',   'Repair of washing machines, refrigerators, microwaves', 449.00,  90,  '🔨'),
            ('Carpentry Work',        'Carpentry',   'Furniture assembly, repair, custom woodwork',            549.00,  180, '🪚'),
            ('Painting Services',     'Painting',    'Interior and exterior painting for homes and offices',   799.00,  240, '🎨'),
            ('Deep Cleaning',         'Cleaning',    'Full home deep cleaning with professional equipment',    999.00,  300, '🧹'),
            ('Pest Control',          'Pest Control','Effective pest control for home and office spaces',      599.00,  120, '🐛'),
            ('CCTV Installation',     'Security',    'CCTV camera setup, networking and monitoring',           1299.00, 180, '📹'),
            ('Internet & Networking', 'IT Services', 'WiFi setup, network configuration, cable management',    499.00,  90,  '🌐'),
            ('Water Purifier Service','Appliance',   'RO service, filter change, water purifier repair',      349.00,  60,  '💧'),
            ('Gas Stove Repair',      'Appliance',   'Gas stove cleaning, burner repair and servicing',       299.00,  60,  '🔥'),
            ('Bathroom Renovation',   'Renovation',  'Complete bathroom renovation and tiling work',           4999.00, 480, '🚿'),
            ('Solar Panel Service',   'Electrical',  'Solar panel installation, cleaning and maintenance',     1999.00, 240, '☀️'),
            ('Home Shifting',         'Moving',      'Safe and reliable home shifting and packing services',   2999.00, 360, '📦'),
        ]
        for s in services:
            cursor.execute("""
                INSERT INTO services (name, category, description, base_price, duration_minutes, icon)
                VALUES (?, ?, ?, ?, ?, ?)
            """, s)
        print("15 services seeded.")

    conn.commit()
    conn.close()
    print("All tables ready. Backend starting...")
