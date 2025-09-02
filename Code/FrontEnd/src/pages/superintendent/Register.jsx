// src/pages/superintendent/Login.jsx
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
  Divider, 
  message
} from "antd";
import { 
  UserOutlined, 
  LockOutlined, 
  LoginOutlined,
  TeamOutlined, 
  MailOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import "./SupRegister.css";

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

const SuperintendentRegister = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // New state for tracking registration success

  const handleRegister = async (values) => {
    setIsLoading(true);
    setError("");
    
    try {
      await register(values.name, values.email, values.password, "Superintendent");
      // Registration successful - show success message
      setRegistrationSuccess(true);
      message.success("Registration complete. Please wait for the admin to approve your account.");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      form.resetFields();
      setIsLoading(false);
    }
  };

  const handleBackToRoleSelection = () => {
    navigate("/");
  };

  // If registration was successful, show a success message instead of the form
  if (registrationSuccess) {
    return (
      <Layout className="invigilator-login-layout">
        <Content className="invigilator-login-content">
          <div className="login-container">
            <Card className="login-card" hoverable>
              <div className="login-header">
                <Space direction="vertical" size="middle" align="center">
                  <CircularLogo />
                  <Title level={2} className="login-title">
                    Registration Submitted
                  </Title>
                </Space>
              </div>

              <Divider />

              <Alert
                message="Registration Complete"
                description="Please wait for the admin to approve your account. You will be notified once your account is activated."
                type="success"
                showIcon
                icon={<CheckCircleOutlined />}
                style={{ marginBottom: '24px' }}
              />

              <div className="additional-options">
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <Button 
                    type="primary" 
                    block 
                    onClick={handleBackToRoleSelection}
                    className="back-button"
                  >
                    Back to Home
                  </Button>
                </Space>
              </div>
            </Card>
          </div>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="invigilator-login-layout">
      <Content className="invigilator-login-content">
        <div className="login-container">
          <Card className="login-card" hoverable>
            <div className="login-header">
              <Space direction="vertical" size="middle" align="center">
                <CircularLogo />
                <Title level={2} className="login-title">
                  Register as Superintendent
                </Title>
                <Text type="secondary">
                  Enter your credentials to register as a superintendent
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
              onFinish={handleRegister}
              autoComplete="off"
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: 'Please input your name!' }
                ]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="Superintendent name" 
                  allowClear
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input 
                  prefix={<MailOutlined />} 
                  placeholder="Superintendent email" 
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
                  {isLoading ? 'Registering...' : 'Register as Superintendent'}
                </Button>
              </Form.Item>
            </Form>

            <Divider />

            <div className="additional-options">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <Link to="/superintendent/login" className="register-link">
                 Already a user? Login here
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

export default SuperintendentRegister;