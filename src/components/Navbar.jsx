import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose, MdLogout } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { logoutUserInfo } from "../utils/Redux/userSlice";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-auto  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <img
                src={logo}
                alt="Company Logo"
                className="max-h-10 max-w-[150px] md:max-h-16 md:max-w-[150px] lg:max-h-20 lg:max-w-[150px] xl:max-h-24 xl:max-w-[150px]"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6 cursor-pointer">
            <Tooltip text="notification">
              <FaBell size={26} className="text-gray-700 hover:text-gray-900" />
            </Tooltip>

        
            <Tooltip text={"Logout"}>
              <MdLogout
                size={26}
                className="text-gray-700 hover:text-gray-900"
                onClick={()=>{dispatch(logoutUserInfo()) }}
              />
            </Tooltip>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              {isOpen ? <MdClose size={32} /> : <GiHamburgerMenu size={32} />}
            </button>
          </div>
        </div>
      </div>

   
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 cursor-pointer">
            <Link
              to={"/notification"}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              Notifications
            </Link>
            <Link
              to={"/logout"}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              onClick={()=>{dispatch(logoutUserInfo()) }}
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
const Tooltip = ({ text, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-32 p-1 bg-gray-100 text-dark text-sm  text-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {text}
      </div>
    </div>
  );
};
