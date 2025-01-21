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
import ActivityLog from "../pages/Dashboard/Member Dashboard/ActivityLog";
import BookedTrainer from "../pages/Dashboard/Member Dashboard/BookedTrainer";
import Profile from "../pages/Dashboard/Member Dashboard/Profile";
import ManageSlot from "../pages/Dashboard/Trainer Dashboard/ManageSlot";
import AddSlot from "../pages/Dashboard/Trainer Dashboard/AddSlot";
import AddForum from "../pages/Dashboard/Trainer Dashboard/AddForum";
import AppliedTrainer from "../pages/Dashboard/Admin dashboard/AppliedTrainer";
import AppliedTrainerDetails from "../pages/Dashboard/Admin dashboard/AppliedTrainerDetails";

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
          // Admin Dashboard Menus

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
          {
            path: "/dashboard/applied-trainers",
            element: <AppliedTrainer></AppliedTrainer>,
          },
          {
            path: "/dashboard/applied-trainers/:id",
            element: <AppliedTrainerDetails></AppliedTrainerDetails>,
            loader: ({ params }) =>
              fetch(`http://localhost:5000/applied-as-trainer/${params.id}`),
          },

          // Member Dashboard Menus
          {
            path: "/dashboard/activity-log",
            element: <ActivityLog></ActivityLog>,
          },
          {
            path: "/dashboard/booked-trainers",
            element: <BookedTrainer></BookedTrainer>,
          },
          {
            path: "/dashboard/my-profile",
            element: <Profile></Profile>,
          },
          // Trainer Dashboard Menus
          {
            path: "/dashboard/manage-slot",
            element: <ManageSlot></ManageSlot>,
          },
          {
            path: "/dashboard/add-slot",
            element: <AddSlot></AddSlot>,
          },
          {
            path: "/dashboard/add-forum",
            element: <AddForum></AddForum>,
          },
        ],
      },

      // Auth
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
