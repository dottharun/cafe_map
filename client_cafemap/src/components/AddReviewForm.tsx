import { useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useParams } from "react-router-dom";
import ReviewSchema from "../types/ReviewSchema";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddReviewForm = () => {
  //Current restaurant
  const { id } = useParams();

  const { selectedRestaurantData, setSelectedRestaurantData } =
    useContext(RestaurantsContext);

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
      const response = await RestaurantFinder.post(`/${id}/addreview`, {
        name: name,
        rating: rating,
        review: reviewText,
      });
      console.log("response is", response);

      const ParsedNewReview = ReviewSchema.parse(response.data.data.review);

      console.log("Parsed New review is", ParsedNewReview);

      //changing context for SelectedRestaurantData
      //should add the new review in RestaurantDetailPage

      //PROBLEM: that tutor guy says,
      //this will cause problem when updating average review count
      //he says do a hack to make it work but this itself works fine

      //Im thinking we will do another get restaurant call to db to get fresh restaurant
      //To update that too if we need
      setSelectedRestaurantData({
        ...selectedRestaurantData,
        reviews: [...selectedRestaurantData.reviews, ParsedNewReview],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center">
      <form className="flex flex-col justify-center w-1/3" action="">
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
            placeholder="Write your review here..."
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
