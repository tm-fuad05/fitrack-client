import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Home from "../pages/Home";
import Register from "../pages/Auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
