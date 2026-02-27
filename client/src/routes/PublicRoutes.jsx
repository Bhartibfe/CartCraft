import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth";

const PublicRoutes = () => {
  const { isLoggedIn, authLoading } = useAuth();

  if (authLoading) return null;

  // if already logged in, redirect away from auth pages
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
