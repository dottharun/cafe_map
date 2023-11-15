import { z } from "zod";

const RestaurantSchema = z.object({
  id: z.number(),
  location: z.string(),
  name: z.string(),
  price_range: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  rating_count: z.optional(z.union([z.number().min(0).max(5), z.null()])),
  average_rating: z.optional(z.union([z.number().min(0).max(5), z.null()])),
});

const RestaurantsArraySchema = z.array(RestaurantSchema);

export default RestaurantSchema;
export { RestaurantsArraySchema };
