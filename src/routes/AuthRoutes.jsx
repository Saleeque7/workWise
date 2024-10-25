import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/Auth/SignIn";
import Signup from "../pages/Auth/Signup";
import RegisterVerify from "../pages/Auth/VerifyRegister";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<SignIn />} />
      <Route path="/auth/register" element={<Signup />} />
      <Route path="/auth/verify" element={<RegisterVerify />} />
    </Routes>
  );
}
