import { createContext, useState } from "react";

import { Restaurant } from "../types/Restaurant";
import Review from "../types/Review";

type RestaurantData = {
  restaurant: Restaurant;
  reviews: Review[];
};

type ContextType = {
  restaurants: Restaurant[];
  setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
  addRestaurant: (newRestaurant: Restaurant) => void;
  selectedRestaurantData: RestaurantData;
  setSelectedRestaurantData: React.Dispatch<
    React.SetStateAction<RestaurantData>
  >;
};

const RestaurantsContext = createContext<ContextType>(null!);

const RestaurantsContextProvider = (props: { children: JSX.Element }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const [selectedRestaurantData, setSelectedRestaurantData] =
    useState<RestaurantData>(null!);

  const addRestaurant = (newRestaurant: Restaurant) => {
    setRestaurants([...restaurants, newRestaurant]);
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants: restaurants,
        setRestaurants: setRestaurants,
        addRestaurant: addRestaurant,
        selectedRestaurantData: selectedRestaurantData,
        setSelectedRestaurantData: setSelectedRestaurantData,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};

export default RestaurantsContextProvider;
export { RestaurantsContext };
