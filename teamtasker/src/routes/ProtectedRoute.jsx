import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout } from "../Store/authSlice";

const ProtectedRoute = ({ children }) => {

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {

    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {

      localStorage.removeItem("token");
      dispatch(logout());

      return <Navigate to="/" replace />;
    }

  } catch (error) {

    localStorage.removeItem("token");
    dispatch(logout());

    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
