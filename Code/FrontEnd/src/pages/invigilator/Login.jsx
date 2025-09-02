// src/pages/invigilator/Login.jsx
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
  TeamOutlined 
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import "./InvigilatorLogin.css";

const { Title, Text } = Typography;
const { Content } = Layout;

// Circular Logo Component
const CircularLogo = () => {
  return (
    <div className="circular-logo invigilator-logo">
      <TeamOutlined className="logo-icon" />
    </div>
  );
};

const InvigilatorLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (values) => {
    setIsLoading(true);
    setError("");
    
    try {
      await login(values.username, values.password, "invigilator");
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
    <Layout className="invigilator-login-layout">
      <Content className="invigilator-login-content">
        <div className="login-container">
          <Card className="login-card" hoverable>
            <div className="login-header">
              <Space direction="vertical" size="middle" align="center">
                <CircularLogo />
                <Title level={2} className="login-title">
                  Invigilator Login
                </Title>
                <Text type="secondary">
                  Enter your credentials to access the invigilator dashboard
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
              name="invigilator-login"
              onFinish={handleLogin}
              autoComplete="off"
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' },
                  { min: 3, message: 'Username must be at least 3 characters!' }
                ]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="Invigilator username" 
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
                  {isLoading ? 'Logging in...' : 'Login as Invigilator'}
                </Button>
              </Form.Item>
            </Form>

            <Divider />

            <div className="additional-options">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <Link to="/invigilator/register" className="register-link">
                  Don't have an account? Register here
                </Link>
                <Button 
                  type="link" 
                  block 
                  onClick={handleBackToRoleSelection}
                  className="back-button"
                >
                  Back to role selection
                </Button>
              </Space>
            </div>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default InvigilatorLogin;