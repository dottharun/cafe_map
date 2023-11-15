-- for help \?
-- list database \l
-- create database CREATE DATABASE database_name;
-- connect to a database \c mydatabasename
-- list all the tables in a database \d
--practice
CREATE TABLE products(
    id INT,
    name VARCHAR(50),
    price INT,
    on_sale BOOLEAN
);

ALTER TABLE products
    ADD COLUMN featured BOOLEAN;

ALTER TABLE products
    DROP COLUMN featured;

DROP DATABASE practice;

-- cafemap restaurants table
CREATE TABLE restaurants(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL CHECK (price_range >= 1 AND price_range <= 5)
);

INSERT INTO restaurants(name, location, price_range)
    VALUES ('mcdonalds', 'new yorks', 3);

INSERT INTO restaurants(name, location, price_range)
    VALUES ('pizza hut', 'vegas', 2);

-- cafemap reviews table
CREATE TABLE reviews(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5)
);


-- restaurants and each of their average rating
SELECT * FROM restaurants 
LEFT JOIN (
    SELECT restaurant_id, COUNT(*) as rating_count, TRUNC(AVG(rating), 1) as average_rating 
    FROM reviews
    GROUP BY restaurant_id
) reviews on restaurants.id = reviews.restaurant_id;

-- own version of above 
SELECT restaurants.*, reviews.rating_count, reviews.average_rating
FROM restaurants
LEFT JOIN (
    SELECT restaurant_id, COUNT(*) as rating_count, TRUNC(AVG(rating), 1) as average_rating
    FROM reviews
    GROUP BY restaurant_id
) reviews on restaurants.id = reviews.restaurant_id;


-- single restaurant with its review data
SELECT 
    restaurants.*,
    COUNT(*) as rating_count,
    TRUNC(AVG(reviews.rating), 1) as average_rating
FROM restaurants
LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id
WHERE restaurants.id = $1
GROUP BY restaurants.id;


