import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const location = useLocation();
  let auth = { token: localStorage.getItem("token") ? true : false };
  return auth.token ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
