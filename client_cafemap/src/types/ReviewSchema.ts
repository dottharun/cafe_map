import { z } from "zod";

const ReviewSchema = z.object({
  id: z.number(),
  restaurant_id: z.number(),
  name: z.string(),
  review: z.string(),
  rating: z.number(),
});

const ReviewsArraySchema = z.array(ReviewSchema);

export default ReviewSchema;
export { ReviewsArraySchema };
