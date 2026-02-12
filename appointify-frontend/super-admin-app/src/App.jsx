import { Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import RegistrationPage from "./components/ProviderRegistration/RegistrationPage";
import AddAdminPage from "./components/AddAdminPage/AddAdminPage";
import AddAdminForm from "./components/AddAdminPage/AddAdminForm";
import CategoryPage from "./components/Category/CategoryPage";
import AddCategoryForm from "./components/Category/AddCategoryForm";
import EditProviderForm from "./components/ProviderRegistration/EditProviderForm";
import EditAdminForm from "./components/AddAdminPage/EditAdminForm";
import EditCategoryForm from "./components/Category/EditCategoryForm";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div className="overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/register" element={<RegistrationPage />}></Route>
          <Route path="/admin" element={<AddAdminPage />}></Route>
          <Route path="/category" element={<CategoryPage />}></Route>
          <Route path="/add-admin" element={<AddAdminForm />}></Route>
          <Route path="/add-category" element={<AddCategoryForm />}></Route>
          <Route path="/providers/view/:id" element={<RegistrationPage />} />
          <Route path="/admin/view/:id" element={<AddAdminForm />} />
          <Route path="/providers/edit/:id" element={<EditProviderForm />} />
          <Route path="/admin/edit/:id" element={<EditAdminForm />} />
          <Route path="/categories/view/:id" element={<AddCategoryForm />} />
          <Route path="/categories/edit/:id" element={<EditCategoryForm />} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
