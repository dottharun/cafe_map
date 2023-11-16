import axios from "axios";

const RestaurantFinder = axios.create({
  baseURL: "http://3.109.59.154:8080/api/v1/restaurants",
});

export default RestaurantFinder;
