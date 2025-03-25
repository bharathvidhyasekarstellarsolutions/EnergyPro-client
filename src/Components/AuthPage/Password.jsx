import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space, Form, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Password = () => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate=useNavigate()
  const {state}=useLocation()

  const onFinish = async() => {
    if (password !== confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }
    await axios.post(`${SERVER_URL}/v1/api/auth/create-password`, 
      {email:state.email,
        password 
      
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Ngrok-Skip-Browser-Warning": "true",  // ✅ Bypass Ngrok warning page
        },
      }
    
    
    ).then(response=>{
            if (response.status===200){
                message.success('Password successfully set!');
                navigate('/signin')
            }
        }).catch(err=>{
            message.error('Error setting password');
        })
    
   

    // Add API call or further logic here
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-4 text-center">Set Your Password</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Enter Password"
            name="password"
            rules={[{ required: true, message: 'Please enter a password!' }]}
          >
            <Input.Password 
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm your password!' }]}
          >
            <Input.Password 
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Password;
