import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { AuthAxios } from "../../utils/api/baseUrl";
import { LogininApi } from "../../utils/api/api";
import { setUserInfo, setUserAuthInfo } from "../../utils/Redux/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error ,setErrors ] = useState({})

  const validate =()=>{
    const newError = {}
    if(!email) newError.email = "email is required"
    if(!Password) newError.Password = "password is required"

    setErrors(newError);
    setTimeout(() => {
      setErrors({});
    }, 2000);
    return Object.keys(newError).length === 0;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if(validate()){
        const userData = { email, Password };
        const res = await AuthAxios.post(LogininApi, userData);
        const accessToken = res.data.accessToken;
  
        if (res.data.success && accessToken) {
          localStorage.setItem("accessTokenuserKey", accessToken);
  
          dispatch(setUserInfo(res.data.user));
          dispatch(setUserAuthInfo(res.data.user));
  
          toast.success(res.data.message, {
            autoClose: 500,
            closeButton: true,
          });
  
          setEmail("");
          setPassword("");
  
          setTimeout(() => {
            navigate("/home", { replace: true });
          }, 2000);
        }
      }
      
    } catch (error) {
      console.error("Error in user login:", error);

      toast.error(error.response?.data?.message || "An error occurred", {
        autoClose: 2000,
        closeButton: true,
      });
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-loginbg">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-700">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
              {error.email && (
              <div className="text-red-500 text-sm mt-1">{error.email}</div>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
              {error.Password && (
              <div className="text-red-500 text-sm mt-1">{error.Password}</div>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex text-center justify-end">
          <Link
            to="/auth/register"
            className="text-xs text-blue-500 hover:underline"
          >
            Sign up
          </Link>

          {/* <Link
            to="/auth/forgot-password"
            className="text-xs text-blue-500 hover:underline"
          >
            Forgot your password?
          </Link> */}
        </div>
      </div>
    </div>
  );
}
