import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
  const storedUser = localStorage.getItem("loggedInUser");

  const loggedInUser = JSON.parse(storedUser || '""');

  return <>{loggedInUser.apiKey ? <Outlet /> : <Navigate to="/login" />}</>;
}
