import { Outlet } from "react-router-dom";
import Navbar from "../pages/customer/components/Navbar/Navbar";

const CustomerLayout = () => {
  return (
    <div>
      {/* Navbar (agar hai) */}
      {/* <Navbar /> */}
      <Outlet />
    </div>
  );
};

export default CustomerLayout;
