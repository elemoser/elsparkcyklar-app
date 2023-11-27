PRAGMA foreign_keys = ON;

-- Inserting data into the User Table
INSERT INTO user (id, role, first_name, last_name, phone, mail, balance, subscriber)
VALUES
    (2101010001, 'customer', 'John', 'Doe', '123456789', 'john.doe@example.com', 50.00, 1),
    (2101020002, 'customer', 'Jane', 'Smith', '987654321', 'jane.smith@example.com', 30.00, 0),
    (2101030003, 'customer', 'Alice', 'Johnson', '555111222', 'alice.johnson@example.com', 20.00, 1),
    (2101040004, 'customer', 'Bob', 'Williams', '777888999', 'bob.williams@example.com', 10.00, 0),
    (2101050005, 'admin', 'Admin', 'User', '999000111', 'admin@example.com', 100.00, 1);

-- Inserting data into the City Table
INSERT INTO city (id, name, bounds)
VALUES
    (1, 'Stockholm', '59.3293, 18.0686'),
    (2, 'Gothenburg', '57.7089, 11.9746'),
    (3, 'Malmö', '55.6044, 13.0038'),
    (4, 'Uppsala', '59.8586, 17.6389'),
    (5, 'Linköping', '58.4108, 15.6214');

-- Inserting data into the Bike Table
INSERT INTO bike (id, battery, city_id, speed, position, state, disabled)
VALUES
    (1, 80, 1, 25.0, '59.3293, 18.0686', 'active', 0),
    (2, 60, 1, 22.5, '59.3099, 18.0752', 'inactive', 1),
    (3, 90, 3, 28.0, '55.6044, 13.0038', 'active', 0),
    (4, 70, 4, 20.0, '59.8586, 17.6389', 'active', 0),
    (5, 75, 5, 18.5, '58.4108, 15.6214', 'inactive', 1);

-- Inserting data into the Booking Table
INSERT INTO booking (id, bike_id, user_id, start_time, start_location, stop_time, stop_location, price)
VALUES
    (1, 1, 2101010001, '2023-11-20 08:00:00', '59.3293, 18.0686', '2023-11-20 09:30:00', '59.3293, 18.0686', 10.00),
    (2, 3, 2101030003, '2023-11-20 10:45:00', '55.6044, 13.0038', '2023-11-20 12:15:00', '55.6044, 13.0038', 15.50),
    (3, 5, 2101050005, '2023-11-20 14:30:00', '58.4108, 15.6214', '2023-11-20 16:00:00', '58.4108, 15.6214', 20.00),
    (4, 2, 2101020002, '2023-11-20 17:15:00', '57.7089, 11.9746', '2023-11-20 18:45:00', '57.7089, 11.9746', 25.25),
    (5, 4, 2101040004, '2023-11-20 20:00:00', '59.8586, 17.6389', '2023-11-20 21:30:00', '59.8586, 17.6389', 18.75);

-- Inserting data into the Invoice Table
INSERT INTO invoice (id, log_id, user_id, total_price)
VALUES
    (1, 1, 2101010001, 10.00),
    (2, 2, 2101030003, 15.50),
    (3, 3, 2101050005, 20.00),
    (4, 4, 2101020002, 25.25),
    (5, 5, 2101040004, 18.75);

-- Inserting data into the Parking Table
INSERT INTO parking (id, city_id, name, bounds, number_of_chargers)
VALUES
    (1, 1, 'Central Parking', '59.3293, 18.0686', 10),
    (2, 2, 'Harbor Parking', '57.7089, 11.9746', 8),
    (3, 3, 'Downtown Parking', '55.6044, 13.0038', 12),
    (4, 4, 'City Center Parking', '59.8586, 17.6389', 15),
    (5, 5, 'Green Park', '58.4108, 15.6214', 5);

-- Inserting data into the Charger Table
INSERT INTO charger (id, parking_id, bike_id, status)
VALUES
    (1, 1, 1, 'available'),
    (2, 2, 2, 'occupied'),
    (3, 3, 3, 'available'),
    (4, 4, 4, 'occupied'),
    (5, 5, 5, 'available');

-- Inserting data into the Log Table
INSERT INTO log (id, booking_id, bike_id, user_id, start_time, start_location, stop_time, stop_location, price, timestamp)
VALUES
    (1, 1, 1, 2101010001, '2023-11-20 08:00:00', '59.3293, 18.0686', '2023-11-20 09:30:00', '59.3293, 18.0686', 10.00, '2023-11-20 09:30:00'),
    (2, 2, 3, 2101030003, '2023-11-20 10:45:00', '55.6044, 13.0038', '2023-11-20 12:15:00', '55.6044, 13.0038', 15.50, '2023-11-20 12:15:00');

-- Inserting data into the Price Table
INSERT INTO price (id)
VALUES
    (1);