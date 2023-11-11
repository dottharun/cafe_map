import { useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { z } from "zod";
import { RestaurantsContext } from "../context/RestaurantsContext";

const RestaurantSchema = z.object({
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
});

const AddRestaurant = () => {
  const { addRestaurant } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("price range");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //hack for empty string cases
    if (name.trim() === "" || location.trim() === "") return;

    // console.log(`clicked`);

    try {
      const response = await RestaurantFinder.post("/", {
        name: name,
        location: location,
        price_range: priceRange,
      });

      // console.log(`got the response`, response);

      const ParsedRestaurant = RestaurantSchema.parse(
        response.data.data.restaurant
      );

      // console.log(ParsedRestaurant);

      addRestaurant(ParsedRestaurant);

      console.log(`added restaurant to db and ui`);
    } catch (error) {
      console.log(`error in adding a restaurant`, error);
    }
  };

  return (
    <form className="mb-5 flex justify-center flex-row">
      <input
        className="m-1 p-1"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="name"
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
        onChange={(e) => setPriceRange(e.target.value)}
      >
        <option disabled>price range</option>
        <option value="1">$</option>
        <option value="2">$$</option>
        <option value="3">$$$</option>
        <option value="4">$$$$</option>
        <option value="5">$$$$$</option>
      </select>
      <button onClick={handleSubmit} className="m-1 p-1">
        Add
      </button>
    </form>
  );
};

export default AddRestaurant;
