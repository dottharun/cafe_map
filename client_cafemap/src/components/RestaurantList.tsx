import { useContext, useEffect } from "react";
import { z } from "zod";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useNavigate } from "react-router-dom";
import RestaurantSchema from "../types/RestaurantSchema";

const RestaurantsArraySchema = z.array(RestaurantSchema);

const headings = [
  "Restaurant",
  "Location",
  "Price range",
  "Ratings",
  "Edit",
  "Delete",
];

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  const navigate = useNavigate();

  //inital fetch of all restaurants
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder("/");
        const parsedRestaurants = RestaurantsArraySchema.parse(
          response.data.data.restaurant
        );

        console.log(parsedRestaurants);

        setRestaurants(parsedRestaurants);
      } catch (err) {
        console.log("use effect error in fetch call", err);
      }
    };

    fetchData();
  }, [setRestaurants]);

  //deleting a restaurant
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    restaurantId: number
  ) => {
    e.stopPropagation();

    try {
      const response = await RestaurantFinder.delete(`/${restaurantId}`);
      console.log(response);

      setRestaurants(
        restaurants.filter((restaurant) => restaurant.id !== restaurantId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (
    e: React.MouseEvent<HTMLButtonElement>,
    restaurantId: number
  ) => {
    e.stopPropagation();

    navigate(`/restaurants/${restaurantId}/update`);
  };

  const handleRestaurantSelect = (restaurantId: number) => {
    navigate(`/restaurants/${restaurantId}`);
  };

  return (
    <div className="flex justify-center">
      <table>
        {/* head of the table */}
        <thead>
          <tr className="bg-red-700">
            {headings.map((heading) => (
              <th className="h-10 w-32 p-1">{heading}</th>
            ))}
          </tr>
        </thead>

        {/* body of the table */}
        <tbody className="bg-slate-500">
          {restaurants
            ? restaurants.map((restaurant) => (
                <tr
                  key={restaurant.id}
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>ratings</td>
                  <td>
                    <button onClick={(e) => handleUpdate(e, restaurant.id)}>
                      Update
                    </button>
                  </td>
                  <td>
                    <button onClick={(e) => handleDelete(e, restaurant.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
