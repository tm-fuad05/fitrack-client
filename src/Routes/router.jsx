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
import AppliedTrainerDetails from "../pages/Dashboard/Admin dashboard/AppliedTrainerDetails";
import ActivityLog from "../pages/Dashboard/Member Dashboard/ActivityLog";
import BookedTrainer from "../pages/Dashboard/Member Dashboard/BookedTrainer";
import Profile from "../pages/Dashboard/Member Dashboard/Profile";
import ManageSlot from "../pages/Dashboard/Trainer Dashboard/ManageSlot";
import AddSlot from "../pages/Dashboard/Trainer Dashboard/AddSlot";
import AddForum from "../pages/Dashboard/Trainer Dashboard/AddForum";
import AppliedTrainer from "../pages/Dashboard/Admin dashboard/AppliedTrainer";
import AddClass from "../pages/Dashboard/Admin dashboard/AddClass";
import AdminRoute from "./AdminRoute";
import Community from "../pages/Community";
import TrainerBooking from "../pages/TrainerBooking";
import Payment from "../pages/Payment/Payment";
import TrainerRoute from "./TrainerRoute";
import CombinedRoute from "./CombinedRoute";
import Balance from "../pages/Dashboard/Admin dashboard/Balance/Balance";
import AboutUs from "../pages/AboutUs";
import ScrollToTop from "./ScrollToTop";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Root></Root>
      </>
    ),
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
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },

      {
        path: "/all-trainer/trainer/:trainerName",
        element: <TrainerDetails></TrainerDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/trainers/${params.trainerName}`),
      },
      {
        path: "/trainer-booking/:trainerName/:slot/:skills",
        element: (
          <PrivateRoute>
            <TrainerBooking></TrainerBooking>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:trainerName/:slot/:membershipType/:price",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-classes",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/community",
        element: <Community></Community>,
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
            <ScrollToTop />
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),

        children: [
          // Admin Dashboard Menus

          {
            path: "/dashboard/newsletter",
            element: (
              <AdminRoute>
                <NewsletterSubscribers></NewsletterSubscribers>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/trainers",
            element: (
              <AdminRoute>
                <TrainerHandling></TrainerHandling>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/manage-users",
            element: (
              <AdminRoute>
                <ManageUsers></ManageUsers>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/balance",
            element: (
              <AdminRoute>
                <Balance></Balance>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/applied-trainers",
            element: (
              <AdminRoute>
                <AppliedTrainer></AppliedTrainer>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/add-class",
            element: (
              <AdminRoute>
                <AddClass></AddClass>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/applied-trainers/:id",
            element: (
              <AdminRoute>
                <AppliedTrainerDetails />
              </AdminRoute>
            ),
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
            element: (
              <TrainerRoute>
                <ManageSlot></ManageSlot>
              </TrainerRoute>
            ),
          },
          {
            path: "/dashboard/add-slot",
            element: (
              <TrainerRoute>
                <AddSlot></AddSlot>
              </TrainerRoute>
            ),
          },
          // Admin and Trainer Route
          {
            path: "/dashboard/add-forum",
            element: (
              <CombinedRoute>
                <AddForum></AddForum>
              </CombinedRoute>
            ),
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
