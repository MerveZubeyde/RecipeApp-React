import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return <Navigate to="/user/login" replace />;
  }

  return children;
};