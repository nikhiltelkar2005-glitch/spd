import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Always redirect to home after login, not back to a specific episode
    return <Navigate to="/login" state={{ from: { pathname: "/" } }} replace />;
  }

  return <Outlet />;
}
