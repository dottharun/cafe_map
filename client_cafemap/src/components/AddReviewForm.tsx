import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

import ReviewSchema from "../types/ReviewSchema";
import RestaurantDataSchema from "../types/RestaurantData";

const AddReviewForm = () => {
  //Current restaurant
  const { id } = useParams();

  const { setSelectedRestaurantData } = useContext(RestaurantsContext);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0); //zero => dummy
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (name.trim() === "" || rating === 0 || reviewText.trim() === "") {
      return;
    }

    console.log(`clicked submit review on restaurant id:`, id);

    try {
      const reviewResponse = await RestaurantFinder.post(`/${id}/addreview`, {
        name: name,
        rating: rating,
        review: reviewText,
      });
      console.log("reviewResponse is", reviewResponse);

      const ParsedNewReview = ReviewSchema.parse(
        reviewResponse.data.data.review
      );

      console.log("Parsed New review is", ParsedNewReview);

      //since review is updated the current restaurant is updated too
      //we can get the review data with current restaurant
      const ResaturantResponse = await RestaurantFinder.get(`/${id}`);
      console.log(ResaturantResponse);

      const ParsedRestaurantData = RestaurantDataSchema.parse(
        ResaturantResponse.data.data
      );

      setSelectedRestaurantData(ParsedRestaurantData);

      setName("");
      setRating(0);
      setReviewText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col justify-center w-1/3 border border-pink-300"
        action=""
      >
        <h2 className="flex p-1 text-zinc-500">Write a review</h2>
        <div className="flex flex-row justify-between p-2">
          <div className="flex flex-col">
            <label htmlFor="name">Your Name</label>
            <input
              className="flex w-fit"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Your name"
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              id="rating"
            >
              <option value={0} disabled>
                rate here
              </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor="Review">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            id="review"
            placeholder="here..."
          />
        </div>
        <div className="flex justify-center">
          <button className="flex justify-center w-fit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
