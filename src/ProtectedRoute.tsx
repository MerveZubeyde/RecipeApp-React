import { useUser } from "./modules/users/UserContext";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return <Navigate to="/user/login" replace={true} />;
  }

  return <>{children}</>;
};
