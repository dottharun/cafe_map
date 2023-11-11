import axios from "axios";

const RestaurantFinder = axios.create({
  baseURL: "http://localhost:3006/api/v1/restaurants",
});

export default RestaurantFinder;
