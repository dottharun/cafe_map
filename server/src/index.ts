import "dotenv/config";
import express from "express";
import * as db from "./db";
import cors from "cors";

// import morgan from "morgan";

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes

//Get all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  console.log(`giving all restaurants`);
  console.log(`unused var`, typeof req);

  //db query
  try {
    const results = await db.query(`SELECT * FROM restaurants`);
    console.log(`Success got all restaurants`);
    // console.log(results);
    console.log(typeof results.rows[0].id);

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows,
      },
    });
  } catch (err) {
    console.log(`get all restaurants db query failed with error:`, err);
  }
});

//get an individual Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(`giving only one restaurant`);
  console.log(`requested id is:`, req.params.id);

  //db query
  try {
    const result = await db.query(`SELECT * FROM restaurants WHERE id = $1`, [
      req.params.id,
    ]);
    console.log(result);
    console.log(result.rows[0]);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(`get a restaurant db query err:`, error);
  }
});

//create a new Restaurant in db
app.post("/api/v1/restaurants", async (req, res) => {
  console.log(`creating a restaurant in our db`);
  console.log(`requested body:`, req.body); //body will only exist if there is a express.json() middleware

  //db query
  try {
    const result = await db.query(
      `INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *`,
      [req.body.name, req.body.location, req.body.price_range]
    );
    //only one restaurant is returned above no need to worry (as an array)

    console.log(result);

    res.status(201).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(`create a restaurant db query failed with error:`, error);
  }
});

//Update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  console.log(`updating the given restaurant`, typeof res);
  console.log(req.params.id);
  console.log(req.body);

  //db query
  try {
    const results = await db.query(
      `UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *`,
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    console.log(results);
    console.log(results.rows[0]);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(`update restaurant failed with:`, error);
  }
});

//Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  console.log(`deleting our dear restaurant with id:`, req.params.id);

  //db query
  try {
    const results = await db.query(
      `DELETE FROM restaurants WHERE id = $1 RETURNING *`,
      [req.params.id]
    );

    console.log(results);
    console.log(results.rows[0]);

    res.status(204).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(`deleting an restaurant failed`, error);
  }
});

//starting server to listen
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
