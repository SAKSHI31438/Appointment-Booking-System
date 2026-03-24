import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import React from "react";
import { ToastContainer } from "react-toastify";

// Layouts
import CustomerLayout from "./layouts/CustomerLayout";

import AdminLayout from "./layouts/AdminLayout";

// CUSTOMER
import Home from "./pages/customer/components/Home/Home";
import AboutUsPage from "./pages/customer/components/AboutUs/AboutUsPage";
import ContactUsPage from "./pages/customer/components/ContactUs/ContactUsPage";
import ServicePage from "./pages/customer/components/Services/ServicePage";
import Login from "./pages/customer/components/Login/Login";
import SignUp from "./pages/customer/components/Login/SignUp";
import ProviderDetailsPage from "./pages/customer/components/Services/ProviderDetailsPage";
import MyBookingsPage from "./pages/customer/components/MyBookings/MyBookingsPage";
import FaqPage from "./pages/customer/components/FAQ/FaqPage";

// PROVIDER
import LongInPage from "./pages/provider/components/Login/LongInPage";
import Dashboard from "./pages/provider/components/Body/Dashboard";
import Appointments from "./pages/provider/components/Body/Appointments";
import AppointmentDetails from "./pages/provider/components/Body/AppointmentDetails";
import ProfilePage from "./pages/provider/components/Profile/ProfilePage";

// ADMIN
import AdminLogin from "./pages/super-admin/components/Login/Login";
import AdminHome from "./pages/super-admin/components/Home/Home";
import RegistrationPage from "./pages/super-admin/components/ProviderRegistration/RegistrationPage";
import AddAdminPage from "./pages/super-admin/components/AddAdminPage/AddAdminPage";
import AddAdminForm from "./pages/super-admin/components/AddAdminPage/AddAdminForm";
import CategoryPage from "./pages/super-admin/components/Category/CategoryPage";
import AddCategoryForm from "./pages/super-admin/components/Category/AddCategoryForm";
import EditProviderForm from "./pages/super-admin/components/ProviderRegistration/EditProviderForm";
import EditAdminForm from "./pages/super-admin/components/AddAdminPage/EditAdminForm";
import EditCategoryForm from "./pages/super-admin/components/Category/EditCategoryForm";
import ServiceProviderLayout from "./layouts/ServiceProviderLayout";
import ProviderLayout from "./pages/super-admin/components/Sidebar/ProviderLayout";
import SuperAdminLayout from "./pages/provider/components/Sidebar/SuperAdminLayout";
import RequireAuthProvider from "./components/RequireAuthProvider";
import RequireAuthAdmin from "./components/RequireAuthAdmin";

function App() {
  return (
    <BrowserRouter>
      <div className="overflow-x-hidden">
        <Routes>
          {/* ✅ CUSTOMER */}
          <Route path="/" element={<CustomerLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutUsPage />} />
            <Route path="contact" element={<ContactUsPage />} />
            <Route path="services" element={<ServicePage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route
              path="provider-details/:id"
              element={<ProviderDetailsPage />}
            />
            <Route path="myBookings" element={<MyBookingsPage />} />
            <Route path="faq" element={<FaqPage />} />
          </Route>

          {/* ✅ PROVIDER */}
          <Route path="/provider" element={<ServiceProviderLayout />}>
            <Route index element={<LongInPage />} />
            <Route element={<RequireAuthProvider />}>
              <Route element={<SuperAdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="details" element={<AppointmentDetails />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Route>
          </Route>

          {/* ✅ ADMIN */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminLogin />} />
            <Route element={<RequireAuthAdmin />}>
              <Route element={<ProviderLayout />}>
                <Route path="home" element={<AdminHome />} />
                <Route path="register" element={<RegistrationPage />} />
                <Route path="admins" element={<AddAdminPage />} />
                <Route path="add-admin" element={<AddAdminForm />} />
                <Route path="category" element={<CategoryPage />} />
                <Route path="add-category" element={<AddCategoryForm />} />

                <Route
                  path="providers/view/:id"
                  element={<RegistrationPage />}
                />
                <Route
                  path="providers/edit/:id"
                  element={<EditProviderForm />}
                />
                <Route path="admins/view/:id" element={<AddAdminForm />} />
                <Route path="admins/edit/:id" element={<EditAdminForm />} />
                <Route
                  path="categories/view/:id"
                  element={<AddCategoryForm />}
                />
                <Route
                  path="categories/edit/:id"
                  element={<EditCategoryForm />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>

        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
