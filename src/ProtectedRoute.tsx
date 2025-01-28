import { Navigate } from "react-router-dom";
import { useUser } from "./modules/users/UserContext";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }): JSX.Element =>  {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return <Navigate to="/user/login" replace />;
  }

  return <>{children}</>;
};