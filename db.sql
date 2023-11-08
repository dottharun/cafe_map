-- for help \?

-- list database \l

-- create database CREATE DATABASE database_name;

-- connect to a database \c mydatabasename

-- list all the tables in a database \d

--practice
CREATE TABLE products (
    id INT,
    name VARCHAR(50),
    price INT,
    on_sale BOOLEAN
);

ALTER TABLE products ADD COLUMN featured BOOLEAN;

ALTER TABLE products DROP COLUMN featured;

DROP DATABASE practice;

-- cafemap
CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL CHECK(price_range >= 1 AND price_range <= 5)
);

INSERT INTO restaurants (
    name,
    location,
    price_range
) VALUES (
    'mcdonalds',
    'new yorks',
    3
);

INSERT INTO restaurants (
    name,
    location,
    price_range
) VALUES (
    'pizza hut',
    'vegas',
    2
);