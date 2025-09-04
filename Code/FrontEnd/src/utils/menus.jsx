// src/utils/menus.js
import { DashboardOutlined, BellOutlined, SettingOutlined } from "@ant-design/icons";

export const invigilatorMenu = [
  { key: "dashboard", path: "/invigilator/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "attendance", path: "/invigilator/attendance", label: "Attendance" },
  { key: "duties", path: "/invigilator/duties", label: "Duties" },
  { key: "notifications", path: "/invigilator/notifications", icon: <BellOutlined />, label: "Notifications" },
];

export const superintendentMenu = [
  { key: "dashboard", path: "/superintendent/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "requests", path: "/superintendent/requests", label: "Requests" },
  { key: "payment", path: "/superintendent/payment", label: "Payment" },
];

export const adminMenu = [
  { key: "dashboard", path: "/admin/dashboard", label: "Dashboard" },
  { key: "assign", path: "/admin/assign", label: "Assign Duties" },
  { key: "users", path: "/admin/users", label: "Manage Users" },
  { key: "settings", path: "/admin/settings", icon: <SettingOutlined />, label: "Settings"
   },

];
