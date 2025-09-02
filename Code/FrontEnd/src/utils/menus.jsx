// src/utils/menus.js
import { DashboardOutlined, BellOutlined, SettingOutlined } from "@ant-design/icons";

export const invigilatorMenu = [
  { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "attendance", label: "Attendance" },
  { key: "duties", label: "Duties" },
  { key: "notifications", icon: <BellOutlined />, label: "Notifications" },
];

export const superintendentMenu = [
  { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "requests", label: "Requests" },
  { key: "payment", label: "Payment" },
];

export const adminMenu = [
  { key: "dashboard", label: "Dashboard" },
  { key: "assign", label: "Assign Duties" },
  { key: "users", label: "Manage Users" },
  { key: "settings", icon: <SettingOutlined />, label: "Settings" },
];
