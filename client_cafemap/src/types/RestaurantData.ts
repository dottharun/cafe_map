import { z } from "zod";
import RestaurantSchema from "./RestaurantSchema";
import { ReviewsArraySchema } from "./ReviewSchema";

const RestaurantDataSchema = z.object({
  restaurant: RestaurantSchema,
  reviews: ReviewsArraySchema,
});

export default RestaurantDataSchema;
