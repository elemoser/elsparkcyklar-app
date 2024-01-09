PRAGMA foreign_keys = ON;

-- Inserting data into the User Table
INSERT INTO user (id, username, role, balance)
VALUES
    (2101010001, 'horselover1337', 'customer', 0),
    (2101020002, 'gurkOlle', 'customer', 100),
    (2101030003, 'githubForever', 'customer', 200),
    (2101040004, 'flowerpower', 'customer', 0),
    (2101050005, 'smart_guy', 'admin', 0);


-- Inserting data into the Bike Table
INSERT INTO bike (id, battery, city_id, speed, position, state, low_battery)
VALUES
    (1, 80, 1, 25.0, '59.3293, 18.0686', 'available', false),
    (2, 60, 1, 100.00, '59.3099, 18.0752', 'available', false),
    (3, 90, 1, 28.0, '59.3091, 18.0766', 'available', false),
    (4, 70, 4, 20.0, '59.8586, 17.6389', 'occupied', false),
    (5, 75, 5, 0.00, '58.4108, 15.6214', 'available', false);

-- Inserting data into the Booking Table
INSERT INTO booking (id, bike_id, user_id, start_time, start_location, stop_time, stop_location, price)
VALUES
    (1, 1, 2101010001, '2023-11-20 08:00:00', '59.3293, 18.0686', '2023-11-20 09:30:00', '59.3293, 18.0686', 10.00),
    (2, 3, 2101030003, '2023-11-20 10:45:00', '55.6044, 13.0038', '2023-11-20 12:15:00', '55.6044, 13.0038', 15.50),
    (3, 5, 2101050005, '2023-11-20 14:30:00', '58.4108, 15.6214', '', '', 20.00),
    (4, 2, 2101020002, '2023-11-20 17:15:00', '57.7089, 11.9746', '2023-11-20 18:45:00', '57.7089, 11.9746', 25.25),
    (5, 4, 2101040004, '2023-11-20 20:00:00', '59.8586, 17.6389', '2023-11-20 21:30:00', '59.8586, 17.6389', 18.75);

-- Inserting data into the Invoice Table
INSERT INTO invoice (id, log_id, user_id, total_price, status)
VALUES
    (1, 1, 2101010001, 10.00, "pending"),
    (2, 2, 2101030003, 15.50, "payed"),
    (3, 3, 2101050005, 20.00, "payed"),
    (4, 4, 2101020002, 25.25, "pending"),
    (5, 5, 2101040004, 18.75, "pending");

-- Inserting data into the Parking Table
INSERT INTO parking (city_id, name, center, radius, number_of_chargers)
VALUES
    (1, 'Centralstationen', '59.3293, 18.0686', 500, 10),
    (1, 'Gamla Stan', '59.3346, 18.0632', 500, 8),
    (1, 'Djurgården', '59.3472, 18.0823', 500, 12),
    (1, 'Södermalm', '59.3389, 18.0312', 500, 15),
    (1, 'Kungsträdgården', '59.3290, 18.0402', 500, 5),

    (2, 'Avenyn', '57.7011, 11.9739', 400, 10),
    (2, 'Liseberg', '57.6954, 11.9839', 400, 15),
    (2, 'Haga', '57.6963, 11.9787', 400, 12),
    (2, 'Slottsskogen', '57.6847, 11.9510', 400, 15),
    (2, 'Linné', '57.6968, 11.9534', 400, 6),

    (3, 'Triangeln', '55.5945, 13.0025', 300, 8),
    (3, 'Emporia', '55.5420, 12.9727', 300, 15),
    (3, 'Västra Hamnen', '55.6095, 12.9780', 300, 8),
    (3, 'Folkets Park', '55.5854, 13.0156', 300, 10),
    (3, 'Möllevången', '55.5937, 13.0004', 300, 5);


-- Inserting data into the Charger Table
INSERT INTO charger (parking_id, bike_id, status)
VALUES

(1, 0, 'available'), (1, 0, 'available'), (1, 0, 'available'),
(1, 0, 'available'), (1, 0, 'available'), (1, 0, 'available'),
(1, 0, 'available'), (1, 0, 'available'), (1, 0, 'available'),
(1, 0, 'available'),

(2, 0, 'available'), (2, 0, 'available'), (2, 0, 'available'),
(2, 0, 'available'), (2, 0, 'available'), (2, 0, 'available'),
(2, 0, 'available'), (2, 0, 'available'),

(3, 0, 'available'), (3, 0, 'available'), (3, 0, 'available'),
(3, 0, 'available'), (3, 0, 'available'), (3, 0, 'available'),
(3, 0, 'available'), (3, 0, 'available'), (3, 0, 'available'),
(3, 0, 'available'), (3, 0, 'available'), (3, 0, 'available'),

(4, 0, 'available'), (4, 0, 'available'), (4, 0, 'available'),
(4, 0, 'available'), (4, 0, 'available'), (4, 0, 'available'),
(4, 0, 'available'), (4, 0, 'available'), (4, 0, 'available'),
(4, 0, 'available'), (4, 0, 'available'), (4, 0, 'available'),
(4, 0, 'available'), (4, 0, 'available'), (4, 0, 'available'),

(5, 0, 'available'), (5, 0, 'available'), (5, 0, 'available'),
(5, 0, 'available'), (5, 0, 'available'),

(6, 0, 'available'), (6, 0, 'available'), (6, 0, 'available'),
(6, 0, 'available'), (6, 0, 'available'), (6, 0, 'available'),
(6, 0, 'available'), (6, 0, 'available'), (6, 0, 'available'),
(6, 0, 'available'),

(7, 0, 'available'), (7, 0, 'available'), (7, 0, 'available'),
(7, 0, 'available'), (7, 0, 'available'), (7, 0, 'available'),
(7, 0, 'available'), (7, 0, 'available'), (7, 0, 'available'),
(7, 0, 'available'), (7, 0, 'available'), (7, 0, 'available'),
(7, 0, 'available'), (7, 0, 'available'), (7, 0, 'available'),

(8, 0, 'available'), (8, 0, 'available'), (8, 0, 'available'),
(8, 0, 'available'), (8, 0, 'available'), (8, 0, 'available'),
(8, 0, 'available'), (8, 0, 'available'), (8, 0, 'available'),
(8, 0, 'available'), (8, 0, 'available'), (8, 0, 'available'),

(9, 0, 'available'), (9, 0, 'available'), (9, 0, 'available'),
(9, 0, 'available'), (9, 0, 'available'), (9, 0, 'available'),
(9, 0, 'available'), (9, 0, 'available'), (9, 0, 'available'),
(9, 0, 'available'), (9, 0, 'available'), (9, 0, 'available'),
(9, 0, 'available'), (9, 0, 'available'), (9, 0, 'available'),

(10, 0, 'available'), (10, 0, 'available'), (10, 0, 'available'),
(10, 0, 'available'), (10, 0, 'available'), (10, 0, 'available'),

(11, 0, 'available'), (11, 0, 'available'), (11, 0, 'available'),
(11, 0, 'available'), (11, 0, 'available'), (11, 0, 'available'),
(11, 0, 'available'), (11, 0, 'available'),

(12, 0, 'available'), (12, 0, 'available'), (12, 0, 'available'),
(12, 0, 'available'), (12, 0, 'available'), (12, 0, 'available'),
(12, 0, 'available'), (12, 0, 'available'), (12, 0, 'available'),
(12, 0, 'available'), (12, 0, 'available'), (12, 0, 'available'),
(12, 0, 'available'), (12, 0, 'available'), (12, 0, 'available'),

(13, 0, 'available'), (13, 0, 'available'), (13, 0, 'available'),
(13, 0, 'available'), (13, 0, 'available'), (13, 0, 'available'),
(13, 0, 'available'), (13, 0, 'available'),

(14, 0, 'available'), (14, 0, 'available'), (14, 0, 'available'),
(14, 0, 'available'), (14, 0, 'available'), (14, 0, 'available'),
(14, 0, 'available'), (14, 0, 'available'), (14, 0, 'available'),
(14, 0, 'available'),

(15, 0, 'available'), (15, 0, 'available'), (15, 0, 'available'),
(15, 0, 'available'), (15, 0, 'available');


-- Inserting data into the Price Table
INSERT INTO price (id)
VALUES
    (1);