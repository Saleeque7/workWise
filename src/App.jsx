import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/userRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import {
  UserProtectedRoute,
  PublicRoute,
} from "./utils/middleware/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute/>}>
      <Route path="/*" element={<AuthRoutes />} />
      </Route>
      <Route element={<UserProtectedRoute/>}>
        <Route path="/home/*" element={<UserRoutes />} />
      </Route>
    </Routes>
  );
}

export default App;
