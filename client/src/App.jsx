import { Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProviderDashboard from "./pages/dashboard/ProviderDashboard";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import BookProvider from "./pages/customer/BookProvider";
import MyBookings from "./pages/customer/MyBookings";
import MainLayout from "./Layout/MainLayout";
import HomeRedirect from "./pages/HomeRedirect";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchPage from "./pages/provideSearch/SearchPage";
import Home from "./Layout/Home";
import ForgetPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ProviderBookings from "./pages/provider/ProviderBookings";
import ProfilePage from "./pages/auth/ProfilePage";
import ChangePassword from "./pages/auth/ChangePassword";
import MyReviews from "./pages/customer/reviews/MyReviews";

export default function App() {
  return (
    <Routes>
      {/* ✅ Public Homepage */}
      <Route path="/" element={<Home />} />

      {/* ✅ Redirect route for role-based logic */}
      <Route path="/redirect" element={<HomeRedirect />} />

      {/* ✅ Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* ✅ Protected routes inside layout */}
      <Route element={<MainLayout />}>
        {/* Customer Routes */}
        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/search" element={<SearchPage />} />
          <Route path="/book/:providerId" element={<BookProvider />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/my-reviews" element={<MyReviews />} />
        </Route>

        {/* Provider Routes */}
        <Route element={<ProtectedRoute allowedRoles={["provider"]} />}>
          <Route path="/provider/dashboard" element={<ProviderDashboard />} />
          <Route path="/provider/bookings" element={<ProviderBookings />} />
        </Route>

        {/* ✅ Shared routes for both roles */}
        <Route
          element={<ProtectedRoute allowedRoles={["customer", "provider"]} />}
        >
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
      </Route>
    </Routes>
  );
}
