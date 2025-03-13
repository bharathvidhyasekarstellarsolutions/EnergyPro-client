import React, { useState } from "react";
import { Tabs, Input, Button, Form, message } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { TabPane } = Tabs;

const SignUp = ({ userAuth, setUserAuth }) => {
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentName, setStudentName] = useState("");
  const [instructorEmail, setInstructorEmail] = useState("");
  const [instructorPassword, setInstructorPassword] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const navigate = useNavigate();

  const handleRegistration = (role, email, name) => {
    const userAuth = {
      email: email,
      username: name,
      role: role
    };

    axios.post("http://localhost:3000/v1/api/auth/send-otp", userAuth)
    .then((response) => {
      if (response.status === 200) {
        message.success("OTP sent successfully! Please check your email.");
        navigate('/verify-otp', { state: { role,email } });
      }
    })
    .catch(err => {
      message.error(err.response?.data?.message || "Registration failed");
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-96">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Student" key="1">
            <h2 className="text-xl font-bold mb-4 text-center">Student Register</h2>
            <Form onFinish={() => handleRegistration("student", studentEmail, studentName)} className="bg-white shadow-xl rounded-lg p-6">
              <Form.Item name="username" className="!px-2" rules={[{ required: true, message: 'Please input your Username!' }]}>
                <Input
                  type="text"
                  placeholder="Username"
                  className="w-full"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="email"  className="!px-2" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input
                  type="email"
                  placeholder="Email"
                  className="w-full"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                />
              </Form.Item>
              {/* Uncomment to include password field */}
              {/* <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password
                  placeholder="Password"
                  className="w-full"
                  value={studentPassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
                />
              </Form.Item> */}
              <Form.Item className="!px-2">
                <Button type="primary"  htmlType="submit" className="w-full">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Instructor" key="2">
            <h2 className="text-xl font-bold mb-4 text-center">Instructor Register</h2>
            <Form onFinish={() => handleRegistration("instructor", instructorEmail, instructorName)} className="bg-white shadow-xl rounded-lg p-6">
              <Form.Item name="username" className="!px-2" rules={[{ required: true, message: 'Please input your Username!' }]}>
                <Input
                  type="text"
                  placeholder="Username"
                  className="w-full"
                  value={instructorName}
                  onChange={(e) => setInstructorName(e.target.value)}
                />
              </Form.Item>
              <Form.Item className="!px-2" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input
                  type="email"
                  placeholder="Email"
                  className="w-full"
                  value={instructorEmail}
                  onChange={(e) => setInstructorEmail(e.target.value)}
                />
              </Form.Item>
              {/* Uncomment to include password field */}
              {/* <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password
                  placeholder="Password"
                  className="w-full"
                  value={instructorPassword}
                  onChange={(e) => setInstructorPassword(e.target.value)}
                />
              </Form.Item> */}
              <Form.Item className="!px-2">
                <Button  type="primary" htmlType="submit" className="w-full">
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
