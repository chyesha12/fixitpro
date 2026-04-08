-- ============================================================
-- FixItPro - SQL Server Setup Script
-- Run this in Microsoft SQL Server Management Studio (SSMS)
-- ============================================================

-- Step 1: Create Database
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'LocalServiceDB')
BEGIN
    CREATE DATABASE LocalServiceDB;
    PRINT 'Database LocalServiceDB created successfully.';
END
GO

USE LocalServiceDB;
GO

-- ============================================================
-- TABLE: users
-- ============================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
CREATE TABLE users (
    id             INT IDENTITY(1,1) PRIMARY KEY,
    name           NVARCHAR(100) NOT NULL,
    email          NVARCHAR(150) UNIQUE NOT NULL,
    password       NVARCHAR(255) NOT NULL,
    phone          NVARCHAR(20),
    role           NVARCHAR(20) DEFAULT 'customer',
    address        NVARCHAR(255),
    avatar         NVARCHAR(255),
    created_at     DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================
-- TABLE: services
-- ============================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='services' AND xtype='U')
CREATE TABLE services (
    id               INT IDENTITY(1,1) PRIMARY KEY,
    name             NVARCHAR(100) NOT NULL,
    category         NVARCHAR(100) NOT NULL,
    description      NVARCHAR(MAX),
    base_price       DECIMAL(10,2) NOT NULL,
    duration_minutes INT DEFAULT 60,
    icon             NVARCHAR(50),
    image_url        NVARCHAR(255),
    rating           DECIMAL(3,2) DEFAULT 0.0,
    total_reviews    INT DEFAULT 0,
    is_active        BIT DEFAULT 1,
    created_at       DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================
-- TABLE: technicians
-- ============================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='technicians' AND xtype='U')
CREATE TABLE technicians (
    id                INT IDENTITY(1,1) PRIMARY KEY,
    user_id           INT REFERENCES users(id) ON DELETE CASCADE,
    service_id        INT REFERENCES services(id),
    specialization    NVARCHAR(100),
    experience_years  INT DEFAULT 0,
    rating            DECIMAL(3,2) DEFAULT 0.0,
    total_jobs        INT DEFAULT 0,
    is_available      BIT DEFAULT 1,
    current_lat       DECIMAL(10,8),
    current_lng       DECIMAL(11,8),
    verified          BIT DEFAULT 0,
    created_at        DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================
-- TABLE: bookings
-- ============================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='bookings' AND xtype='U')
CREATE TABLE bookings (
    id               INT IDENTITY(1,1) PRIMARY KEY,
    booking_code     NVARCHAR(20) UNIQUE NOT NULL,
    user_id          INT REFERENCES users(id),
    service_id       INT REFERENCES services(id),
    technician_id    INT REFERENCES technicians(id),
    address          NVARCHAR(255) NOT NULL,
    city             NVARCHAR(100),
    state            NVARCHAR(100),
    pincode          NVARCHAR(10),
    lat              DECIMAL(10,8),
    lng              DECIMAL(11,8),
    scheduled_date   DATE NOT NULL,
    scheduled_time   TIME NOT NULL,
    status           NVARCHAR(30) DEFAULT 'pending',
    -- Status values: pending | confirmed | in_progress | completed | cancelled
    total_amount     DECIMAL(10,2),
    notes            NVARCHAR(MAX),
    created_at       DATETIME DEFAULT GETDATE(),
    updated_at       DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================
-- TABLE: reviews
-- ============================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='reviews' AND xtype='U')
CREATE TABLE reviews (
    id             INT IDENTITY(1,1) PRIMARY KEY,
    booking_id     INT REFERENCES bookings(id),
    user_id        INT REFERENCES users(id),
    technician_id  INT REFERENCES technicians(id),
    service_id     INT REFERENCES services(id),
    rating         INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment        NVARCHAR(MAX),
    created_at     DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================
-- TABLE: contact_messages
-- ============================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='contact_messages' AND xtype='U')
CREATE TABLE contact_messages (
    id         INT IDENTITY(1,1) PRIMARY KEY,
    name       NVARCHAR(100) NOT NULL,
    email      NVARCHAR(150) NOT NULL,
    phone      NVARCHAR(20),
    subject    NVARCHAR(200),
    message    NVARCHAR(MAX) NOT NULL,
    status     NVARCHAR(20) DEFAULT 'unread',
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================
-- TABLE: technician_locations (Real-Time Tracking)
-- ============================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='technician_locations' AND xtype='U')
CREATE TABLE technician_locations (
    id             INT IDENTITY(1,1) PRIMARY KEY,
    technician_id  INT REFERENCES technicians(id),
    booking_id     INT REFERENCES bookings(id),
    lat            DECIMAL(10,8) NOT NULL,
    lng            DECIMAL(11,8) NOT NULL,
    timestamp      DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================
-- SEED DATA: Insert 15 Services
-- ============================================================
IF NOT EXISTS (SELECT TOP 1 * FROM services)
BEGIN
    INSERT INTO services (name, category, description, base_price, duration_minutes, icon) VALUES
    ('Plumbing Repair',         'Plumbing',    'Fix leaks, pipes, drains and all plumbing issues',                  499.00,  90,  N'🔧'),
    ('Electrical Wiring',       'Electrical',  'Safe electrical installation and repair services',                  599.00,  120, N'⚡'),
    ('AC Repair & Service',     'HVAC',        'AC repair, cleaning, gas refilling and maintenance',                699.00,  120, N'❄️'),
    ('Appliance Repair',        'Appliance',   'Repair of washing machines, refrigerators, microwaves',            449.00,  90,  N'🔨'),
    ('Carpentry Work',          'Carpentry',   'Furniture assembly, repair, custom woodwork',                       549.00,  180, N'🪚'),
    ('Painting Services',       'Painting',    'Interior and exterior painting for homes and offices',              799.00,  240, N'🎨'),
    ('Deep Cleaning',           'Cleaning',    'Full home deep cleaning with professional equipment',               999.00,  300, N'🧹'),
    ('Pest Control',            'Pest Control','Effective pest control for home and office spaces',                 599.00,  120, N'🐛'),
    ('CCTV Installation',       'Security',    'CCTV camera setup, networking and monitoring',                      1299.00, 180, N'📹'),
    ('Internet & Networking',   'IT Services', 'WiFi setup, network configuration, cable management',               499.00,  90,  N'🌐'),
    ('Water Purifier Service',  'Appliance',   'RO service, filter change, water purifier repair',                 349.00,  60,  N'💧'),
    ('Gas Stove Repair',        'Appliance',   'Gas stove cleaning, burner repair and servicing',                  299.00,  60,  N'🔥'),
    ('Bathroom Renovation',     'Renovation',  'Complete bathroom renovation and tiling work',                      4999.00, 480, N'🚿'),
    ('Solar Panel Service',     'Electrical',  'Solar panel installation, cleaning and maintenance',                1999.00, 240, N'☀️'),
    ('Home Shifting',           'Moving',      'Safe and reliable home shifting and packing services',              2999.00, 360, N'📦');

    PRINT 'Services seeded successfully.';
END
GO

-- ============================================================
-- VERIFY SETUP
-- ============================================================
SELECT 'Tables Created:' AS Info;
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE';

SELECT 'Services Inserted:' AS Info;
SELECT id, name, category, base_price, icon FROM services ORDER BY id;

PRINT '✅ FixItPro database setup complete!';
GO
