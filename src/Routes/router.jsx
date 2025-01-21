import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "../pages/Root";
import Home from "../pages/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Error from "../pages/Error";
import AllTrainers from "../pages/AllTrainers";
import TrainerDetails from "../components/All Trainers/TrainerDetails/TrainerDetails";
import ApplicationForTrainer from "../pages/ApplicationForTrainer";
import PrivateRoute from "./PrivateRoute";
import AllClasses from "../pages/AllClasses";
import Dashboard from "../pages/Dashboard/Dashboard";
import NewsletterSubscribers from "../pages/Dashboard/Admin dashboard/NewsletterSubscribers";
import TrainerHandling from "../pages/Dashboard/Admin dashboard/TrainerHandling";
import ManageUsers from "../pages/Dashboard/Admin dashboard/ManageUsers";

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
        path: "/all-classes",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/become-a-trainer",
        element: (
          <PrivateRoute>
            <ApplicationForTrainer />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <Navigate to={"/dashboard/newsletter"}></Navigate>,
          },
          {
            path: "/dashboard/newsletter",
            element: <NewsletterSubscribers></NewsletterSubscribers>,
          },
          {
            path: "/dashboard/trainers",
            element: <TrainerHandling></TrainerHandling>,
          },
          {
            path: "/dashboard/manage-users",
            element: <ManageUsers></ManageUsers>,
          },
        ],
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
