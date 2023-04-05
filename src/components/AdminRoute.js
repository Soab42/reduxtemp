/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Navigate } from "react-router-dom";
import { useAdmin, useAuth } from "../hooks/useAuth";

export default function AdminRoute({ children }) {
  const isLoggedIn = useAuth();
  const isAdmin = useAdmin();

  return isLoggedIn && isAdmin ? children : <Navigate to="login" />;
}
