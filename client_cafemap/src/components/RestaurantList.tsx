import { useContext, useEffect } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useNavigate } from "react-router-dom";
import { RestaurantsArraySchema } from "../types/RestaurantSchema";

const headings = [
  { id: 1, name: "Restaurant" },
  { id: 2, name: "Location" },
  { id: 3, name: "Price range" },
  { id: 4, name: "Ratings" },
  { id: 5, name: "Edit" },
  { id: 6, name: "Delete" },
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
        console.error("use effect error in fetch call", err);
      }
    };

    fetchData();
  }, [setRestaurants]);

  //deleting a restaurant
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation();

    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      console.log(response);

      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();

    navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id: number) => {
    navigate(`/restaurants/${id}`);
  };

  return (
    <div className="flex justify-center">
      <table>
        {/* head of the table */}
        <thead>
          <tr className="bg-red-700">
            {headings.map((heading) => (
              <th key={heading.id} className="h-10 w-32 p-1">
                {heading.name}
              </th>
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
