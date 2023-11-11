import { useContext, useEffect } from "react";
import { z } from "zod";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";

const RestaurantsArraySchema = z.array(
  z.object({
    id: z.number(),
    location: z.string(),
    name: z.string(),
    price_range: z.union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5),
    ]),
  })
);

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

  //inital fetch of restaurant
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
  const handleDelete = async (restaurantId: number) => {
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
                <tr key={restaurant.id}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>ratings</td>
                  <td>
                    <button>Update</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(restaurant.id)}>
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
