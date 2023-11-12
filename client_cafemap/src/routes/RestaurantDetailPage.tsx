import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import Reviews from "../components/Reviews";
import AddReviewForm from "../components/AddReviewForm";
import RestaurantDataSchema from "../types/RestaurantData";

const RestaurantDetailPage = () => {
  const { id } = useParams();
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
        console.log(error);
      }
    };

    fetchData();
  }, [id, setSelectedRestaurantData]);

  return (
    <>
      {selectedRestaurantData && (
        <div className="p-4">
          <h1 className="flex justify-center pb-4">
            {selectedRestaurantData.restaurant.name}
          </h1>
          <Reviews reviews={selectedRestaurantData.reviews} />
          <AddReviewForm />
        </div>
      )}
    </>
  );
};

export default RestaurantDetailPage;
