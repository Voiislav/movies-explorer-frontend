import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuth, element }) => {
  return isAuth ? element : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;