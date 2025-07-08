import { Navigate, Outlet } from "react-router-dom";
import { useUserProfile } from "../hooks/auth/useAuth";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const { data: user, isLoading } = useUserProfile();

  if (!token) return <Navigate to="/login" />;
  if (isLoading) return <p className="text-center text-gray-300">Loading...</p>;

  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
