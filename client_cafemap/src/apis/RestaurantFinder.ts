import axios from "axios";

const RestaurantFinder = axios.create({
  baseURL: "https://cafemap-server.onrender.com/api/v1/restaurants",
});

export default RestaurantFinder;
