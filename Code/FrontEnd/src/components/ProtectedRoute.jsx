// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ role, children }) => {
  const { token, user, logout } = useAuth();

  // 1️⃣ If no token or no user → kick out
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // 2️⃣ Check token expiry
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      logout();
      return <Navigate to="/" replace />;
    }
  } catch {
    logout();
    return <Navigate to="/" replace />;
  }

  // 3️⃣ If wrong role → send them back to their role’s dashboard
  if (user.role !== role) {
    return <Navigate to={`/${user.role.toLowerCase()}/dashboard`} replace />;
  }

  // ✅ All good
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
