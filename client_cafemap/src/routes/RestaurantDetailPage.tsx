import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import RestaurantSchema from "../types/RestaurantSchema";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        const ParsedRestaurant = RestaurantSchema.parse(
          response.data.data.restaurant
        );

        console.log(ParsedRestaurant);
        setSelectedRestaurant(ParsedRestaurant);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id, setSelectedRestaurant]);

  return <div>{selectedRestaurant && selectedRestaurant.name}</div>;
};

export default RestaurantDetailPage;
