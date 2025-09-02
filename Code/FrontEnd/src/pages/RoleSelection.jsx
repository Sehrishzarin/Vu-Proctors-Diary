// src/pages/RoleSelection.jsx
import React from "react";
import { Card, Button, Row, Col, Typography, Layout, Space, Flex } from "antd";
import { 
  UserOutlined, 
  TeamOutlined, 
  SafetyCertificateOutlined,
  CrownOutlined 
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./RoleSelection.css";
import logo from '../assets/logo1.png';
const { Title, Text } = Typography;
const { Header, Content } = Layout;

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      key: "admin",
      title: "Admin",
      description: "Full system access and management capabilities",
      icon: <UserOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      route: "/admin/login",
      registerRoute: "/admin/register" // Added register route for consistency
    },
    {
      key: "invigilator",
      title: "Invigilator",
      description: "Monitor exams and manage test sessions",
      icon: <TeamOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
      route: "/invigilator/login",
      registerRoute: "/invigilator/register"
    },
    {
      key: "superintendent",
      title: "Superintendent",
      description: "Oversee exam centers and coordinate activities",
      icon: <SafetyCertificateOutlined style={{ fontSize: '32px', color: '#faad14' }} />,
      route: "/superintendent/login",
      registerRoute: "/superintendent/register"
    }
  ];

  return (
    <Layout className="role-selection-layout">
      <Header className="role-selection-header">
        <div className="header-content">
            <div> <img src={logo} alt="Logo" className="circular-logo" style={{ width: '50px', height: '50px' }} /> </div>
          <Title level={2} style={{ color: 'white', margin: '0 0 0 16px' }}>
            VUPD
          </Title>
          <div className="nav" style={{ marginLeft: 'auto' }}>
            <Button type="link" style={{ color: 'white', marginLeft: '16px'}} onClick={() => navigate("/")}>
              <div>Home</div>
            </Button>
             <Button type="link" style={{ color: 'white', marginLeft: '16px'}} onClick={() => navigate("/")}>
              <div>About</div>
            </Button>
             <Button type="link" style={{ color: 'white', marginLeft: '16px'}} onClick={() => navigate("/")}>
              <div>Contact</div>
            </Button>
          </div>
        </div>
      </Header>
      
      <Content className="role-selection-content">
        <div className="container">
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div className="welcome-section">
              <img src={logo} alt="Logo" width={150} />
              <Title level={1}>Welcome to Proctors Diary</Title>
              <Text type="secondary" className="subtitle">
                Select your role to continue to the platform
              </Text>
            </div>
            
            <Row gutter={[32, 32]} justify="center">
              {roles.map((role) => (
                <Col key={role.key} xs={24} sm={12} md={8} lg={7}>
                  <Card 
                    className="role-card"
                    hoverable
                    cover={
                      <div className="card-icon-container" justify="center" align="middle">
                        {role.icon}
                      </div>
                    }
                  >
                    <Card.Meta
                      title={role.title}
                      description={role.description}
                      className="card-meta"
                    />
                    {/* Conditionally render Register button only for non-admin roles */}
                    {role.key !== "admin" && (
                      <Button 
                        type="primary" 
                        block 
                        onClick={() => navigate(role.registerRoute || role.route)}
                        className="role-button" 
                        style={{ marginTop: 16 }}
                      >
                        Register as {role.title}
                      </Button>
                    )}
                    <Button 
                      type="primary" 
                      block 
                      onClick={() => navigate(role.route)}
                      className="role-button" 
                      style={{ 
                        marginTop: 16,
                        // Use different style for admin to make it stand out when it's the only button
                        backgroundColor: role.key === "admin" ? '#1890ff' : undefined 
                      }}
                    >
                      Login as {role.title}
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </Space>
        </div>
      </Content>
    </Layout>
  );
};

export default RoleSelection;