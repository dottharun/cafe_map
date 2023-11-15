import AddRestaurant from "../components/AddRestaurant";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";

import ritvik from "../assets/ritvik2.jpg";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${ritvik})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div className="flex flex-col">
        <Header />
        <AddRestaurant />
        <RestaurantList />
      </div>
    </div>
  );
};

export default Home;
