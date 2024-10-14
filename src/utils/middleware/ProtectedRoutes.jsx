import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const UserProtectedRoute = () => {
  const isUserAuth = useSelector(
    (state) => state.persisted.user.isAuthenticated
  );
  console.log(isUserAuth ,"in protect");
  
  return isUserAuth ? <Outlet /> : <Navigate to="/" />;
};

export const PublicRoute = () => {
  const isUserAuth = useSelector(
    (state) => state.persisted.user.isAuthenticated
  );

  console.log(isUserAuth ,"in public");

  if (isUserAuth) {
    return <Navigate to="/home" />;
  } else {
    return <Outlet />;
  }
};
