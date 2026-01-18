import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  IoCloseCircle,
  IoCloseCircleSharp,
  IoLockClosed,
  IoReorderThreeOutline,
} from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [navBg, setNavBg] = useState(!isHome);
  const [nav, setNav] = useState(false);
  const navOpen = nav ? "translate-y-0" : "translate-y-[-100%]";

  const handleNav = () => {
    setNav(!nav);
    console.log(nav);
  };

  useEffect(() => {
    if (!isHome) return;
    const handler = () => {
      if (window.scrollY >= 90) setNavBg(true);
      if (window.scrollY < 90) setNavBg(false);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [isHome]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-300 z-1000 ${
          navBg ? "bg-[#92487A]" : "bg-transparent"
        } shadow-sm`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-5 h-20 flex items-center justify-between">
          <NavLink
            to="/"
            className="text-2xl font-bold text-[#540863] tracking-wide"
          >
            Appointify
          </NavLink>

          <div className="hidden md:flex items-center gap-8 text-md font-medium text-white">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Services", path: "/services" },
              { name: "Contact Us", path: "/contact" },
              { name: "FAQ", path: "/faq" },
            ].map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `pb-1  px-2 transition ${
                    isActive
                      ? "border-b-2 border-[#540863] text-white"
                      : "hover:text-[#540863]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <NavLink
            to={"/login"}
            className={`hidden md:inline-flex px-6 py-2 border border-white text-white font-semibold rounded-lg hover:border-[#540863]  hover:text-[#540863] transition
         `}
          >
            Login / Signup
          </NavLink>

          <div className="flex   lg:hidden">
            {nav == false ? (
              <IoReorderThreeOutline
                onClick={handleNav}
                className="w-7 h-7 cursor-pointer absolute right-7 top-6 text-white "
              />
            ) : (
              <RxCross2
                onClick={handleNav}
                className="w-7 h-7 cursor-pointer absolute right-7 top-6 text-white"
              />
            )}
          </div>
        </nav>
      </header>
      {nav && (
        <div
          className={`lg:hidden flex ${navOpen} text-white absolute  bg-[#92487A] max-w-full h-73 left-0 right-0 top-18 transform transition-all duration-500 delay-300  z-1000 ease-in `}
        >
          {" "}
          <div className="flex flex-col w-full items-center cursor-pointer">
            <Link
              to={"/"}
              className="p-1 mx-auto w-full   py-3 flex text-center items-center justify-center"
            >
              Home
            </Link>
            <Link
              to={"/about"}
              className="p-1 mx-auto w-full  py-3 flex text-center items-center justify-center"
            >
              AboutUs
            </Link>
            <Link
              to={"/services"}
              className="p-1 mx-auto w-full  py-3 flex text-center items-center justify-center"
            >
              Services
            </Link>
            <Link
              to={"/contact"}
              className="p-1 mx-auto w-full  py-3 flex text-center items-center justify-center"
            >
              ContactUs
            </Link>
            <Link
              to={"/"}
              className="p-1 mx-auto w-full  py-3 flex text-center items-center justify-center"
            >
              FAQ
            </Link>
            <Link
              to={"/login"}
              className="p-1 mx-auto w-full   py-3 flex text-center items-center justify-center"
            >
              Login/SignUp
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
