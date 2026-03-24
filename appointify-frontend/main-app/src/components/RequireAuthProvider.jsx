import { Navigate, Outlet } from "react-router-dom";

const RequireAuthProvider = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/provider" replace />;
  }

  return <Outlet />;
};

export default RequireAuthProvider;
