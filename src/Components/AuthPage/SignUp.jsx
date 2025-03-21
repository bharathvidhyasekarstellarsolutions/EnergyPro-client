import React, { useState } from "react";
import { Tabs, Input, Button, Form, message } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { TabPane } = Tabs;

const SignUp = ( ) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegistration = async (values, role) => {
    setLoading(true);
    const user = {
      email: values.email,
      username: values.username,
      role: role
    };

    try {
      console.log("Sending registration request:", user);
      const response = await axios.post("http://localhost:3000/v1/api/auth/send-otp", user);

      console.log("API Response:", response);

      // Ensure backend sends a success flag
      if (response.data.status === "success") {
        message.success(response.data.message);
        navigate('/verify-otp', { state: { role, email: values.email } });
      }
    } catch (error) {
      console.error("Registration error:", error);
      message.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-96">
        <Tabs defaultActiveKey="1">
          {/* Student Registration */}
          <TabPane tab="Student" key="1">
            <h2 className="text-xl font-bold mb-4 text-center">Student Register</h2>
            <Form
              onFinish={(values) => handleRegistration(values, "student")}
              className="bg-white shadow-xl rounded-lg p-6"
            >
              <Form.Item
                name="username"
                className="!px-2"
                rules={[{ required: true, message: 'Please input your Username!' }]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="email"
                className="!px-2"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: "email", message: "Please enter a valid email!" }
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item className="!px-2">
                <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
                  Register
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          {/* Instructor Registration */}
          <TabPane tab="Instructor" key="2">
            <h2 className="text-xl font-bold mb-4 text-center">Instructor Register</h2>
            <Form
              onFinish={(values) => handleRegistration(values, "instructor")}
              className="bg-white shadow-xl rounded-lg p-6"
            >
              <Form.Item
                name="username"
                className="!px-2"
                rules={[{ required: true, message: 'Please input your Username!' }]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="email"
                className="!px-2"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: "email", message: "Please enter a valid email!" }
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item className="!px-2">
                <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
                  Register
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default SignUp;
