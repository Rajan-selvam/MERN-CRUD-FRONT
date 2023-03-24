import * as React from "react";
import { useRoutes } from "react-router-dom";
import ListCard from "./pages/ListCard";
import Cart from "./pages/Cart";
import HeaderBar from "./pages/HeaderBar.jsx";

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <HeaderBar />,
      children: [
        {
          path: "",
          element: <ListCard />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
  ]);

  return element;
};

export default App;
