import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Form, message } from "antd";
import axios from "axios";

const SignIn = ({ setUser }) => {
  const navigate = useNavigate();
  const [studentForm] = Form.useForm();

  const handleLogin = async (values) => {
    try {
      const { email, password } = values;
      const response = await axios.post("http://localhost:3000/v1/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { accessToken, user } = response.data;
        const userData = { accessToken, user };

        // Wait for state update before navigating
        await new Promise((resolve) => {
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          resolve();
        });

        console.log("User role:", user.role);

        // Navigate based on role
        if (user.role === "student") {
          navigate("/student");
        } else if (user.role === "instructor") {
          navigate("/instructor-dashboard");
        } else {
          localStorage.removeItem("user");
          message.error("Invalid role detected. Please contact support.");
          navigate("/signin");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error(error.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>
        <Form
          form={studentForm}
          onFinish={handleLogin} 
          className="bg-white shadow-xl rounded-lg p-6"
        >
          <Form.Item name="email" rules={[{ required: true, message: "Please enter your email!" }]}>
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">Sign In</Button>
          </Form.Item>
          <div className="text-center pb-3">
            <p>Click here to <Link to="/signup">create an account</Link></p>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
