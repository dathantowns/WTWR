import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn, anonymous = false }) => {
  const location = useLocation();

  if (anonymous && isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
