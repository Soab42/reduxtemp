/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Navigate } from "react-router";
import { useAdmin, useAuth } from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const isLoggedIn = useAuth();
  const isAdmin = useAdmin();
  if (isLoggedIn && isAdmin) {
    return <Navigate to={"/admin"} />;
  }
  if (isLoggedIn && !isAdmin) {
    return children;
  }
  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
}
