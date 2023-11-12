import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import RestaurantSchema from "../types/RestaurantSchema";

const UpdateRestaurant = () => {
  //getting params from react-router
  const { id } = useParams();

  //to navigate back to home
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("choose a price range");

  //using db fetch to get current restaurant details
  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      const parsedRestaurant = RestaurantSchema.parse(
        response.data.data.restaurant
      );

      console.log(parsedRestaurant);
      setName(parsedRestaurant.name);
      setLocation(parsedRestaurant.location);
      setPriceRange(parsedRestaurant.price_range.toString());
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //hack for empty string cases
    if (name.trim() === "" || location.trim() === "") return;

    // console.log(`clicked`);

    try {
      const response = await RestaurantFinder.put(`/${id}`, {
        name: name,
        location: location,
        price_range: priceRange,
      });
      const ParsedUpdatedRestaurant = RestaurantSchema.parse(
        response.data.data.restaurant
      );

      console.log(ParsedUpdatedRestaurant);

      console.log(`restaurant updated`);
      navigate(`/`);
    } catch (error) {
      console.log(`error in adding a restaurant`, error);
    }
  };

  return (
    <div className="flex justify-center">
      <form className="flex flex-col w-1/3" action="">
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="text"
        />

        <label htmlFor="location">Location</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          id="location"
          type="text"
        />

        <label htmlFor="price_range">Price Range</label>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          id="price_range"
        >
          {/* TODO make select use number not string(right now) */}
          <option disabled>choose a price range</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
          <option value="5">$$$$$</option>
        </select>

        <div className="flex justify-center p-4">
          <button onClick={handleSubmit} className="w-32">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
