import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
