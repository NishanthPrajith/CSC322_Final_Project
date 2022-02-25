import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext";

const requireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth;
  const location = useLocation;

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/signIn" />
  );
};

export default requireAuth;
