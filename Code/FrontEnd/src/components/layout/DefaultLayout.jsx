// src/components/layout/DefaultLayout.jsx
import { Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const DefaultLayout = ({ menuItems }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div className="logo" ><img src="/logo.png" alt="Logo" height={100} width={100} style={{ margin: "16px" }} /></div>
        <Menu theme="dark" mode="inline" items={menuItems} />
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
