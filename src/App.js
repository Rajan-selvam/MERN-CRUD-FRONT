import * as React from "react";
import { useRoutes } from "react-router-dom";
import ListCard from "./pages/ListCard";

const App = () => {
  let element = useRoutes([
    { 
      path: "/", 
      element: <ListCard /> 
    },
  ]);

  return element;
}

export default App;
