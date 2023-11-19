import "dotenv/config";
import express from "express";
import morgan from "morgan";
import * as db from "./db";
import cors from "cors";
import { isClean } from "./sanitization/sanitize";
import path from "path";

const app = express();

//Middleware

//serving frontend
const FrontendPath = path.join("..", "client_cafemap", "dist");
app.use(express.static(FrontendPath));
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

//Routes

//Get all Restaurants with each of their review data
app.get("/api/v1/restaurants", async (req, res) => {
  console.log(`giving all restaurants`);
  console.log(`unused var`, typeof req);

  //db query
  try {
    //this is the tutor's method
    //I'm thinking to add a new field with average rating, total review count
    //in the restaurants table with some function to update it while adding reviews
    const results = await db.query(`--sql
      SELECT restaurants.*, reviews.rating_count, reviews.average_rating
      FROM restaurants
      LEFT JOIN (
          SELECT restaurant_id, COUNT(*) as rating_count, TRUNC(AVG(rating), 1) as average_rating
          FROM reviews
          GROUP BY restaurant_id
      ) reviews on restaurants.id = reviews.restaurant_id;
    `);

    // console.log(`Success got all restaurants`);
    // console.log(results);
    // console.log(typeof results.rows[0].id);

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows,
      },
    });
  } catch (err) {
    console.error(`get all restaurants db query failed with error:`, err);
  }
});

//get an individual Restaurant with its reviewData and all of its reviews
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(`giving only one restaurant`);
  console.log(`requested id is:`, req.params.id);

  //db query
  try {
    const restaurantResult = await db.query(
      `--sql
    SELECT
        restaurants.*,
        COUNT(*) AS rating_count,
        TRUNC(AVG(reviews.rating), 1) AS average_rating
    FROM restaurants
    LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id
    WHERE restaurants.id = $1
    GROUP BY restaurants.id;
    `,
      [req.params.id]
    );

    // console.log(restaurantResult);
    // console.log(restaurantResult.rows[0]);

    const reviewsResult = await db.query(
      `SELECT * FROM reviews WHERE restaurant_id = $1`,
      [req.params.id]
    );
    // console.log(reviewsResult.rows);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurantResult.rows[0],
        reviews: reviewsResult.rows,
      },
    });
  } catch (error) {
    console.error(`get a restaurant db query err:`, error);
  }
});

//create a new Restaurant in db
app.post("/api/v1/restaurants", async (req, res) => {
  console.log(`creating a restaurant in our db`);
  console.log(`requested body:`, req.body); //body will only exist if there is a express.json() middleware

  if (!isClean(req.body.name) || !isClean(req.body.location)) {
    console.log(`sanitized`, req.body);
    return;
  }

  //db query
  try {
    const result = await db.query(
      `INSERT INTO restaurants (name, location, price_range) 
           VALUES ($1, $2, $3) RETURNING *`,
      [req.body.name, req.body.location, req.body.price_range]
    );
    //only one restaurant is returned above no need to worry (as an array)

    // console.log(result.rows[0]);

    res.status(201).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.error(`create a restaurant db query failed with error:`, error);
  }
});

//Update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  console.log(`updating the given restaurant`, typeof res);
  console.log(req.params.id);
  console.log(req.body);

  if (!isClean(req.body.name) || !isClean(req.body.location)) {
    console.log(`sanitized`, req.body);
    return;
  }

  //db query
  try {
    const results = await db.query(
      `UPDATE restaurants SET name = $1, location = $2, price_range = $3 
           WHERE id = $4 RETURNING *`,
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    // console.log(results.rows[0]);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.error(`update restaurant failed with:`, error);
  }
});

//Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  console.log(`deleting our dear restaurant with id:`, req.params.id);

  //db query
  try {
    //remove all reviews
    const revResults = await db.query(
      `DELETE FROM reviews WHERE restaurant_id = $1 RETURNING *`,
      [req.params.id]
    );

    console.log(typeof revResults);

    //remove the restaurant
    const results = await db.query(
      `DELETE FROM restaurants WHERE id = $1 RETURNING *`,
      [req.params.id]
    );

    // console.log(results.rows[0]);

    res.status(204).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.error(`deleting an restaurant failed`, error);
  }
});

//create a new review
app.post("/api/v1/restaurants/:id/addreview", async (req, res) => {
  console.log("adding a review", typeof req, typeof res);

  if (!isClean(req.body.name) || !isClean(req.body.review)) {
    console.log(`sanitized`, req.body);
    return;
  }

  //db query
  try {
    const results = await db.query(
      `INSERT INTO reviews (restaurant_id, name, review, rating) 
           VALUES ($1, $2, $3, $4) RETURNING *`,
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );

    // console.log(results.rows[0]);

    res.status(201).json({
      status: "success",
      data: {
        review: results.rows[0],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/", (req, res) => {
  console.log(`frontend serve`, typeof req);

  res.sendFile("index.html", { root: FrontendPath });
});

//test api
app.get("/test", (req, res) => {
  console.log(`test request`, typeof req);

  res.status(200).json({});
});

//starting server to listen
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
