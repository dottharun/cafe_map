import StarRating from "./StarRating";
import Review from "../types/Review";

type ReviewsProp = { reviews: Review[] };

const Reviews = ({ reviews }: ReviewsProp) => {
  return (
    // ratings grid
    <div className="grid grid-cols-3 gap-3 p-4">
      {/* RatingCards */}
      {reviews.map((review) => (
        <div key={review.id} className="border bg-pink-700 p-3">
          <div className="flex flex-row justify-between">
            <span className="font-extrabold">{review.name}</span>
            <span>
              <StarRating rating={review.rating} />
            </span>
          </div>
          <p>{review.review}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;