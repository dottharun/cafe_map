import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
// import App from "./App.tsx";
import Home from "./routes/Home.tsx";
import UpdatePage from "./routes/UpdatePage.tsx";
import RestaurantDetailPage from "./routes/RestaurantDetailPage.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";
import RestaurantsContextProvider from "./context/RestaurantsContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/restaurants/:id/update",
    element: <UpdatePage />,
  },
  {
    path: "/restaurants/:id",
    element: <RestaurantDetailPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RestaurantsContextProvider>
      <RouterProvider router={router} />
    </RestaurantsContextProvider>
  </React.StrictMode>
);
