import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Home from "../pages/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Error from "../pages/Error";
import AllTrainers from "../pages/AllTrainers";
import TrainerDetails from "../components/All Trainers/TrainerDetails/TrainerDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-trainer",
        element: <AllTrainers></AllTrainers>,
      },
      {
        path: "/all-trainer/:trainerName",
        element: <TrainerDetails></TrainerDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/trainers/${params.trainerName}`),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);

export default router;
