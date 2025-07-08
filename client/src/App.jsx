import { Navigate } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import { useRoutes } from "react-router-dom";

import Home from "./Layout/Home";
import HomeRedirect from "./pages/HomeRedirect";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgetPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import ProviderDashboard from "./pages/dashboard/ProviderDashboard";
import BookProvider from "./pages/customer/BookProvider";
import MyBookings from "./pages/customer/MyBookings";
import MyReviews from "./pages/customer/reviews/MyReviews";
import SearchPage from "./pages/provideSearch/SearchPage";
import ProviderBookings from "./pages/provider/ProviderBookings";
import ProfilePage from "./pages/auth/ProfilePage";
import ChangePassword from "./pages/auth/ChangePassword";
import ProtectedRoute from "./components/ProtectedRoute";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/redirect",
    element: <HomeRedirect />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // ✅ Customer routes
      {
        element: <ProtectedRoute allowedRoles={["customer"]} />,
        children: [
          { path: "customer/dashboard", element: <CustomerDashboard /> },
          { path: "customer/search", element: <SearchPage /> },
          { path: "book/:providerId", element: <BookProvider /> },
          { path: "my-bookings", element: <MyBookings /> },
          { path: "my-reviews", element: <MyReviews /> },
        ],
      },
      // ✅ Provider routes
      {
        element: <ProtectedRoute allowedRoles={["provider"]} />,
        children: [
          { path: "provider/dashboard", element: <ProviderDashboard /> },
          { path: "provider/bookings", element: <ProviderBookings /> },
        ],
      },
      // ✅ Shared routes
      {
        element: <ProtectedRoute allowedRoles={["customer", "provider"]} />,
        children: [
          { path: "profile", element: <ProfilePage /> },
          { path: "change-password", element: <ChangePassword /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default function App() {
  const element = useRoutes(routes);
  return element;
}
