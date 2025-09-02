// src/pages/admin/Login.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
  Input, 
  Button, 
  Card, 
  Form, 
  Typography, 
  Layout, 
  Space,
  Alert,
  Divider 
} from "antd";
import { 
  UserOutlined, 
  LockOutlined, 
  LoginOutlined,
  CrownOutlined, 
  MailOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const { Title, Text } = Typography;
const { Content } = Layout;

// Circular Logo Component (consistent with RoleSelection)
const CircularLogo = () => {
  return (
    <div className="circular-logo">
      <CrownOutlined className="logo-icon" />
    </div>
  );
};

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (values) => {

    setIsLoading(true);
    setError("");
    
    try {
      await login(values.email, values.password, "Admin");
      // If login is successful, navigation will be handled by AuthContext
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToRoleSelection = () => {
    navigate("/");
  };

  return (
    <Layout className="admin-login-layout">
      <Content className="admin-login-content">
        <div className="login-container">
          <Card className="login-card" hoverable>
            <div className="login-header">
              <Space direction="vertical" size="middle" align="center">
                <CircularLogo />
                <Title level={2} className="login-title">
                  Admin Login
                </Title>
                <Text type="secondary">
                  Enter your credentials to access the admin dashboard
                </Text>
              </Space>
            </div>

            <Divider />

            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                closable
                style={{ marginBottom: '24px' }}
                onClose={() => setError("")}
              />
            )}

            <Form
              form={form}
              name="admin-login"
              onFinish={handleLogin}
              autoComplete="off"
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { min: 3, message: 'Email must be at least 3 characters!' }
                ]}
              >
                <Input 
                  prefix={<MailOutlined />} 
                  placeholder="Admin email" 
                  allowClear
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                  { min: 6, message: 'Password must be at least 6 characters!' }
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined />} 
                  placeholder="Password" 
                />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  loading={isLoading}
                  icon={<LoginOutlined />}
                  className="login-button"
                >
                  {isLoading ? 'Logging in...' : 'Login as Admin'}
                </Button>
              </Form.Item>
            </Form>

            <Divider />

            <Button 
              type="link" 
              block 
              onClick={handleBackToRoleSelection}
              className="back-button"
            >
              Back to role selection
            </Button>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default AdminLogin;