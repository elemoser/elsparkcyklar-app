PRAGMA foreign_keys = ON;
-- User Table
DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id INTEGER NOT NULL PRIMARY KEY,
    username TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT "customer",
    balance FLOAT DEFAULT 0
);

-- City Table
DROP TABLE IF EXISTS city;
CREATE TABLE city (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    bounds TEXT
);

-- Bike Table
DROP TABLE IF EXISTS bike;
CREATE TABLE bike (
    id INTEGER PRIMARY KEY,
    battery INTEGER,
    city_id INTEGER,
    speed REAL DEFAULT 0.00,
    position TEXT,
    state TEXT DEFAULT "available",
    low_battery BOOLEAN,

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
    status TEXT,

    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (log_id) REFERENCES booking(id)
);



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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city_id INTEGER,
    name TEXT,
    bounds TEXT,
    number_of_chargers INTEGER,

    FOREIGN KEY (city_id) REFERENCES city(id)
);

-- Charger Table
DROP TABLE IF EXISTS charger;
CREATE TABLE charger (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parking_id INTEGER,
    bike_id INTEGER,
    status TEXT
);


DROP TABLE IF EXISTS price;
CREATE TABLE price (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_fee FLOAT DEFAULT 20.00,
    cost_per_minute FLOAT DEFAULT 3.00,
    free_parking_fee FLOAT DEFAULT 20.00,
    start_free_park_discount FLOAT DEFAULT 0.5
);

DROP TABLE IF EXISTS simulate;
CREATE TABLE simulate (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city_id,
    bike_route TEXT NOT NULL,

    FOREIGN KEY (city_id) REFERENCES city(id)
);