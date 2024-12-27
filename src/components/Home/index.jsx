import React from "react";
import { useUser } from "../../modules/users/UserContext";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const { isLoggedIn, userDetails } = useUser();

  if (!isLoggedIn) {
    return <Navigate to="/user/login" replace />;
  }

  return (
    <div className="entry-container">
      <h1>Welcome, {userDetails?.username || "User"}</h1>
    </div>
  );
};