import "dotenv/config";
import express from "express";

const app = express();

//Middleware

app.use((req, res, next) => {
  console.log(`yay our middleware`);
  console.log(`unused vars`, typeof req, typeof res, typeof next);
  res.status(404).json({
    status: "fail",
  });
  // next();
});

//Routes

//Get all Restaurants
app.get("/api/v1/restaurants", (req, res) => {
  console.log(`giving all restaurants`);
  console.log(`unused var`, typeof req);

  res.status(200).json({
    status: "success",
    data: {
      restaurant: ["dhanyawaad", "limbdi corner"],
    },
  });
});

//create a Restaurant in db
app.post("/api/v1/restaurants", (req, res) => {
  console.log(`creating a restaurant in our db`);
  console.log("unused var", typeof req, typeof res);
});

//get a Restaurant
app.get("/api/v1/restaurants/:id", (req, res) => {
  console.log(`giving only one restaurant`);
  console.log(`unused var`, req.params);

  res.status(200).json({
    status: "success",
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
