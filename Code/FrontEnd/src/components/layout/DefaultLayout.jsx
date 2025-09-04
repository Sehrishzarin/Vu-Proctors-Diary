// src/components/layout/DefaultLayout.jsx
import { Button, Layout, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const { Header, Content, Sider } = Layout;

const DefaultLayout = ({ menuItems }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleLogout = () => {
 
    console.log("User logged out");
    logout();
    navigate("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <div className="logo">
            <img
              src="/logo.png"
              alt="Logo"
              height={100}
              width={100}
              style={{ margin: "16px" }}
            />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            items={menuItems}
            onClick={({ key }) => {
              const item = menuItems.find((i) => i.key === key);
              if (item?.path) navigate(item.path);
            }}
          />
        </div>
        
        <div style={{ padding: "16px", marginTop: "auto" }}>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ width: "100%" }}
          >
            Logout
          </Button>
        </div>
      </Sider>
      
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;