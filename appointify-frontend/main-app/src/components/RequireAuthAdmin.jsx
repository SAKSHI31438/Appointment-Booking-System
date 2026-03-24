import { Navigate, Outlet } from "react-router-dom";

const RequireAuthAdmin = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default RequireAuthAdmin;
