import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CheckoutForm = () => {
  const { state } = useLocation();
  console.log(state.course);

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag', // Razorpay Test Key
      amount: parseInt(state.course.price) * 100, // Amount in paise (100 paise = 1 INR)
      currency: 'INR',
      name: 'EnergyPro',
      description: 'Course Purchase',
      handler: function (response) {
        console.log(response);
        alert('Payment Successful');
      },
      prefill: {
        name: 'Card Holder',
        email: 'test@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <img src={state.course.image} alt={state.course.title} className="mb-4 rounded-lg w-full h-48 object-cover" />
        <h2 className="text-2xl font-bold mb-2">Course: {state.course.title}</h2>
        <h3 className="text-lg font-semibold mb-2">Instructor: {state.course.instructor}</h3>
        <h4 className="text-md text-gray-600 mb-4">Category: {state.course.category}</h4>
        <p className="text-lg text-gray-700 mb-4">Price: ₹{state.course.price}</p>
        <button 
          onClick={handlePayment} 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
