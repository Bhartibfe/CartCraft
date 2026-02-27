import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth";

const ProtectedRoutes = () => {
  const { isLoggedIn, authLoading } = useAuth();

  if (authLoading) return null;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
