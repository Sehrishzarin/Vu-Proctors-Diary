import { Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "./components/layout/DefaultLayout";
import { adminMenu, invigilatorMenu, superintendentMenu } from "./utils/menus.jsx";
import RoleSelection from "./pages/RoleSelection";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

import InvDashboard from "./pages/invigilator/Dashboard";
import SupDashboard from "./pages/superintendent/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import InvigilatorLogin from "./pages/invigilator/Login";
import SuperintendentLogin from "./pages/superintendent/Login";
import AdminLogin from "./pages/admin/Login";
import InvigilatorReg from "./pages/invigilator/Register.jsx";
import SuperintendentReg from "./pages/superintendent/Register.jsx";
import AssignDuties from "./pages/admin/AssignDuties.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Role Selection OR Redirect if logged in */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate to={`/${user.role.toLowerCase()}/dashboard`} replace />
          ) : (
            <RoleSelection />
          )
        }
      />

      {/* Role-specific logins */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/invigilator/login" element={<InvigilatorLogin />} />
      <Route path="/superintendent/login" element={<SuperintendentLogin />} />

      {/* Registrations */}
      <Route path="/superintendent/register" element={<SuperintendentReg />} />
      <Route path="/invigilator/register" element={<InvigilatorReg />} />

      {/* Dashboards */}
      <Route
        element={
          <ProtectedRoute role="invigilator">
            <DefaultLayout menuItems={invigilatorMenu} />
          </ProtectedRoute>
        }
      >
        <Route path="/invigilator/dashboard" element={<InvDashboard />} />
      </Route>

      <Route
        element={
          <ProtectedRoute role="Admin">
            <DefaultLayout menuItems={adminMenu} />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/assign" element={<AssignDuties />} />
        <Route path="/admin/users" element={<ManageUsers />} />
      </Route>

      <Route
        element={
          <ProtectedRoute role="Superintendent">
            <DefaultLayout menuItems={superintendentMenu} />
          </ProtectedRoute>
        }
      >
        <Route path="/superintendent/dashboard" element={<SupDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
