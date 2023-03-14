import * as React from "react";
import { useRoutes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import AuthenticatedRoute from "./pages/AuthenticatedRoute";


const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <AuthenticatedRoute />,
      children: [
        {
          path: "",
          element: <DashBoard />,
        },
      ],
    },
    { 
      path: "/sign-in", 
      element: <SignIn /> 
    },
    { 
      path: "sign-up", 
      element: <SignUp /> 
    },
  ]);

  return element;
}

export default App;