// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // 🔑 Attach token to axios
  const authAxios = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");

    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [token, user]);

  // ✅ Fixed Login function
const login = async (email, password, intendedRole) => {
  try {
    const { data } = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    if (data.message !== "Login successful") {
      throw new Error(data.message || "Login failed");
    }

    if (data.role.toLowerCase() !== intendedRole.toLowerCase()) {
      throw new Error(`Access denied. This is not a ${intendedRole} account.`);
    }

    setToken(data.token);
    setUser({ email, role: data.role, isApproved: data.isApproved });

    // ✅ redirect after login
    if (data.role === "Admin") navigate("/admin/dashboard");
    else if (data.role === "Invigilator") navigate("/invigilator/dashboard");
    else if (data.role === "Superintendent") navigate("/superintendent/dashboard");
    else navigate("/");

  } catch (err) {
    throw new Error(err.response?.data?.message || err.message || "Login failed");
  }
};
  // ✅ Get user profile (to fetch complete user data including isApproved)
  const fetchUserProfile = async () => {
    try {
      const { data } = await authAxios.get("/auth/profile");
      setUser(data.user); // Update user with complete data
      return data.user;
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      throw new Error(err.response?.data?.error || "Failed to fetch user data");
    }
  };

  // ✅ Check if current user is approved
  const isUserApproved = () => {
    return user && user.isApproved;
  };

  // ✅ Register (unchanged)
  const register = async (name, email, password, role) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password, role }
      );
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.error || "Registration failed");
    }
  };

  // ✅ Admin: Get pending users
  const getPendingUsers = async () => {
    try {
      const { data } = await authAxios.get("/admin/pending");
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.error || "Failed to fetch pending users");
    }
  };

  // ✅ Admin: Approve user
  const approveUser = async (userId) => {
    try {
      const { data } = await authAxios.patch(`/admin/approve/${userId}`);
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.error || "Failed to approve user");
    }
  };

  // ✅ Logout
  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        register,
        logout,
        getPendingUsers,
        approveUser,
        fetchUserProfile,
        isUserApproved,
        authAxios // Export authAxios for other components to use
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);