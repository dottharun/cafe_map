import { useState } from "react";

const AddReviewForm = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");

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
              onChange={(e) => setRating(e.target.value)}
              id="rating"
            >
              <option disabled>rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
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
          <button className="flex justify-center w-fit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
