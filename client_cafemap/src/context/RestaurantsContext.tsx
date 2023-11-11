import { createContext, useState } from "react";

import { Restaurant } from "../types/Restaurant";

type ContextType = {
  restaurants: Restaurant[];
  setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
  addRestaurant: (newRestaurant: Restaurant) => void;
};

const RestaurantsContext = createContext<ContextType>(null!);

const RestaurantsContextProvider = (props: { children: JSX.Element }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const addRestaurant = (newRestaurant: Restaurant) => {
    setRestaurants([...restaurants, newRestaurant]);
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants: restaurants,
        setRestaurants: setRestaurants,
        addRestaurant: addRestaurant,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};

export default RestaurantsContextProvider;
export { RestaurantsContext };
