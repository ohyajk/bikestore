import React from "react";
import { Navigate } from "react-router-dom";
import useUserState from "../state/userState";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { user } = useUserState();

  const isAuthenticated = user.email !== undefined;

  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
