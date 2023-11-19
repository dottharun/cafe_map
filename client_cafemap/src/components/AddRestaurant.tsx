import { useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantSchema from "../types/RestaurantSchema";

const AddRestaurant = () => {
  const { addRestaurant } = useContext(RestaurantsContext);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState(0);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //hack for empty string cases
    if (name.trim() === "" || location.trim() === "" || priceRange === 0) {
      return;
    }

    try {
      const response = await RestaurantFinder.post("/", {
        name: name,
        location: location,
        price_range: priceRange,
      });

      const ParsedRestaurant = RestaurantSchema.parse(
        response.data.data.restaurant
      );

      addRestaurant(ParsedRestaurant);

      setName("");
      setLocation("");
      setPriceRange(0);
    } catch (error) {
      console.error(`error in adding a restaurant`, error);
    }
  };

  return (
    <div className="p-2 my-10 bg-blue-500 rounded-xl shadow-xl m-auto w-fit">
      <p className="text-gray-300">Add a new Restaurant</p>
      <form className="flex flex-row justify-center">
        <input
          className="m-1 p-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Restaurant Name"
        />
        <input
          className="m-1 p-1"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          placeholder="location"
        />
        <select
          className="m-1 p-1"
          value={priceRange}
          onChange={(e) => setPriceRange(parseInt(e.target.value))}
        >
          <option value={0} disabled>
            price range
          </option>
          <option value={1}>$</option>
          <option value={2}>$$</option>
          <option value={3}>$$$</option>
          <option value={4}>$$$$</option>
          <option value={5}>$$$$$</option>
        </select>
        <button onClick={handleSubmit} className="m-1 p-1">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
