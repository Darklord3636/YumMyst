import { createBrowserRouter } from "react-router";
import { Onboarding } from "./components/screens/Onboarding";
import { Home } from "./components/screens/Home";
import { RestaurantDetail } from "./components/screens/RestaurantDetail";
import { OrderPickup } from "./components/screens/OrderPickup";
import { MapView } from "./components/screens/MapView";
import { Profile } from "./components/screens/Profile";
import { Success } from "./components/screens/Success";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Onboarding },
      { path: "home", Component: Home },
      { path: "restaurant/:id", Component: RestaurantDetail },
      { path: "order", Component: OrderPickup },
      { path: "map", Component: MapView },
      { path: "profile", Component: Profile },
      { path: "success", Component: Success },
    ],
  },
]);
