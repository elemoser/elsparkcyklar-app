
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