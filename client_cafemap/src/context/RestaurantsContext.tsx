import { createContext, useState } from "react";

import { Restaurant } from "../types/Restaurant";

type ContextType = {
  restaurants: Restaurant[];
  setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
  addRestaurant: (newRestaurant: Restaurant) => void;
  selectedRestaurant: Restaurant;
  setSelectedRestaurant: React.Dispatch<React.SetStateAction<Restaurant>>;
};

const RestaurantsContext = createContext<ContextType>(null!);

const RestaurantsContextProvider = (props: { children: JSX.Element }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>(
    null!
  );

  const addRestaurant = (newRestaurant: Restaurant) => {
    setRestaurants([...restaurants, newRestaurant]);
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants: restaurants,
        setRestaurants: setRestaurants,
        addRestaurant: addRestaurant,
        selectedRestaurant: selectedRestaurant,
        setSelectedRestaurant: setSelectedRestaurant,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};

export default RestaurantsContextProvider;
export { RestaurantsContext };
