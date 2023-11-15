import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";

type ratingProp = {
  rating: number;
};

const StarRating = ({ rating }: ratingProp) => {

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<TiStarFullOutline key={i} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<TiStarHalfOutline key={i} />);
    } else {
      stars.push(<TiStarOutline key={i} />);
    }
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="border flex h-fit w-fit ">{stars}</div>
    </div>
  );
};

export default StarRating;
