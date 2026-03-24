import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import MyBookings from "./MyBookings";

const MyBookingsPage = () => {
  return (
    <div>
      <Navbar />
      <MyBookings />
      <Footer />
    </div>
  );
};

export default MyBookingsPage;
