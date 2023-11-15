import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import Reviews from "../components/Reviews";
import AddReviewForm from "../components/AddReviewForm";
import RestaurantDataSchema from "../types/RestaurantData";
import StarRating from "../components/StarRating";

const RestaurantDetailPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { selectedRestaurantData, setSelectedRestaurantData } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        console.log(response);

        const ParsedRestaurantData = RestaurantDataSchema.parse(
          response.data.data
        );

        setSelectedRestaurantData(ParsedRestaurantData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, setSelectedRestaurantData]);

  console.log(selectedRestaurantData);

  const handleHome = () => {
    navigate(`/`);
  };

  return (
    <>
      <div className="flex justify-center">
        <button onClick={handleHome}>Home</button>
      </div>

      {selectedRestaurantData ? (
        <>
          <h1 className="flex justify-center">
            {selectedRestaurantData.restaurant.name}
          </h1>
          <div className="flex justify-center">
            {selectedRestaurantData.restaurant.average_rating ? (
              <>
                <StarRating
                  rating={selectedRestaurantData.restaurant.average_rating}
                />
                <p className="pl-1">
                  {"(" + selectedRestaurantData.restaurant.rating_count + ")"}
                </p>
              </>
            ) : (
              <p>No ratings🌱</p>
            )}
          </div>
          <Reviews reviews={selectedRestaurantData.reviews} />
        </>
      ) : null}

      <AddReviewForm />
    </>
  );
};

export default RestaurantDetailPage;
