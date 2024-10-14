import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthAxios } from "../../utils/api/baseUrl";
import { signupApi } from "../../utils/api/api";
import { toast, Slide } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newError = {};
    const phoneRegex = /^[0-9]{10,12}$/;
    const hasAtLeastThreeUniqueDigits = (phone) => {
      const uniqueDigits = new Set(phone.split(""));
      return uniqueDigits.size > 3;
    };
    if (!name.trim()) newError.name = "name is required";
    if (!email.trim()) newError.email = "email is required";
    if (!phone.trim()) newError.phone = "phonenumber is required";
    else if (!phoneRegex.test(phone))
      newError.phone = "Phone number must be exactly 10 digits";
    else if (!hasAtLeastThreeUniqueDigits(phone))
      newError.phone =
        "Phone number must contain at least more than 3 unique digits";
    if (!password.trim()) newError.password = "password is required";
    if (!confirmPassword.trim())
      newError.confirmPassword = "confirmPassword is required";
    if (password !== confirmPassword)
      newError.confirmPassword = "password did not match";

    setErrors(newError);
    setTimeout(() => {
      setErrors({});
    }, 2000);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        setLoading(true);
        const userData = {
          name,
          email,
          phone,
          password,
        };

        const response = await AuthAxios.post(signupApi, userData);
        if (response.data.success) {
          const responseOtp = response.data.otp;
          setEmail("");
          setName("");
          setConfirmPassword("");
          setPassword("");
          setPhone("");
          toast.success(response.data?.message, {
            transition: Slide,
            autoClose: 1000,
          });
          setTimeout(() => {
            navigate("/auth/verify", { state: { userData, responseOtp } });
          }, 2000);
        }
      }
    } catch (error) {
      console.error(error, "error in submitting form");
      if (error.response && error.response.data) {
        toast.error(error.response.data.message, {
          transition: Slide,
          autoClose: 1000,
        });
        console.log("An unexpected error occurred.", error.response.data);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-loginbg">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <div className="text-red-500 text-sm mt-1">{errors.name}</div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              type="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your Phone Number"
            />
            {errors.phone && (
              <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate("/")}
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
