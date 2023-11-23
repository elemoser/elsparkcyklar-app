PRAGMA foreign_keys = ON;
-- User Table
DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id INTEGER NOT NULL PRIMARY KEY,
    role TEXT NOT NULL DEFAULT "customer",
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    mail TEXT NOT NULL,
    balance FLOAT NOT NULL DEFAULT 0.00, 
    subscriber INTEGER DEFAULT 0
);
-- Generate mock data
INSERT INTO user (id, first_name, last_name, phone, mail, balance, subscriber)
VALUES
    (202311230001, 'John', 'Doe', '555-1234', 'john.doe@example.com', 100.50, 1),
    (202311230002, 'Jane', 'Smith', '555-5678', 'jane.smith@example.com', 50.25, 0),
    (202311240003, 'alice', 'Johnson', '666-9876', 'alice.johnson@example.com', 75.75, 1),
    (202311240004, 'pelle', 'namnsson', '555-9846', 'pelle.johnson@example.com', 75.75, 1)
;

DROP TABLE IF EXISTS city;
CREATE TABLE city (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    min_latitude REAL NOT NULL,
    max_latitude REAL NOT NULL,
    min_longitude REAL NOT NULL,
    max_longitude REAL NOT NULL
);

INSERT INTO city (id, name, min_latitude, max_latitude, min_longitude, max_longitude)
VALUES
    (1, 'Stockholm', 59.3175, 59.8575, 17.8411, 18.3108),
    (2, 'Göteborg', 57.5485, 57.8687, 11.6923, 12.1696),
    (3, 'Malmö', 55.5307, 55.6146, 12.9151, 13.0469)
;

-- Bike Table
DROP TABLE IF EXISTS bike;
CREATE TABLE bike (
    id INTEGER NOT NULL PRIMARY KEY,
    battery INTEGER,
    city_id INTEGER,
    speed REAL,
    position TEXT,
    state TEXT,
    disabled INTEGER,

    FOREIGN KEY (city_id) REFERENCES city(id)
);


-- Booking Table
DROP TABLE IF EXISTS booking;
CREATE TABLE booking (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    bike_id INTEGER,
    user_id INTEGER,
    start_time TEXT,
    start_location TEXT,
    stop_time TEXT,
    stop_location TEXT,
    price FLOAT DEFAULT 0.00,

    FOREIGN KEY (bike_id) REFERENCES bike(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);


-- Invoice Table
DROP TABLE IF EXISTS invoice;
CREATE TABLE invoice (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    log_id INTEGER,
    user_id INTEGER,
    total_price REAL,

    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (log_id) REFERENCES booking(id)
);


-- INSERT INTO invoice (log_id, user_id, total_price)
-- VALUES
--     (1, 101, 50.00),  -- Assuming log_id and user_id correspond to existing entries in their respective tables
--     (2, 102, 75.50);

-- Parked_Bikes Table
DROP TABLE IF EXISTS parked_bikes;
CREATE TABLE parked_bikes (
    bike_id INTEGER NOT NULL,
    park_id INTEGER NOT NULL,

    FOREIGN KEY (bike_id) REFERENCES bike(id),
    FOREIGN KEY (park_id) REFERENCES parking(id)
);

-- Parking Table
DROP TABLE IF EXISTS parking;
CREATE TABLE parking (
    id INTEGER PRIMARY KEY,
    city_id INTEGER,
    name TEXT,
    bounds TEXT,
    number_of_chargers INTEGER,

    FOREIGN KEY (city_id) REFERENCES city(id)
);

-- Charger Table
DROP TABLE IF EXISTS charger;
CREATE TABLE charger (
    id INTEGER PRIMARY KEY,
    parking_id INTEGER,
    bike_id INTEGER,
    status TEXT
);

-- Log Table
DROP TABLE IF EXISTS log;
CREATE TABLE log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_id INTEGER,
    bike_id INTEGER,
    user_id INTEGER,
    start_time TEXT,
    start_location TEXT,
    stop_time TEXT,
    stop_location TEXT,
    price REAL,
    timestamp TEXT,

    FOREIGN KEY (booking_id) REFERENCES booking(id)
);
