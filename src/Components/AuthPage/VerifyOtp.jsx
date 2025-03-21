import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Typography, Form, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Get email & role from previous page
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!state?.email || !state?.role) {
      navigate('/signup');
    }
    inputRefs.current[0]?.focus(); // Auto-focus first input
  }, [state, navigate]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    const pastedOtp = event.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedOtp)) {
      setOtp(pastedOtp.split(''));
      inputRefs.current[5]?.focus(); // Move focus to last input
    }
  };

  const onFinish = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      message.error('Please enter a 6-digit OTP.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/v1/api/auth/verify-otp', {
        email: state.email,
        role: state.role,
        otp: enteredOtp,
      });

      if (response.status === 201) {
        message.success('OTP verified successfully!');
        navigate('/create-password', { state: { email: state.email } }); // Pass email for password creation
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'OTP verification failed.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <Title level={5} className="text-center mb-4">
          Enter the OTP sent to {state?.email}
        </Title>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item>
            <div className="flex justify-between" onPaste={handlePaste}>
              {otp.map((value, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  className="w-14 text-center"
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Verify OTP
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default VerifyOtp;
