import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Pages/Header";
import Home from "./Components/Pages/Home";
import CoursePlay from "./Components/Pages/CoursePlay";
import SignIn from "./Components/AuthPage/Signin";
import Profile from "./Components/Pages/Profile";
import CheckoutForm from "./Components/Payment/Checkoutform";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Footer from "./Components/Pages/Footer";
import InstructorDashboard from "./Components/Instructor/InstructorDashboard";
import MyLearning from "./Components/Course/MyLearning";
import SignUp from "./Components/AuthPage/SignUp";
import VerifyOtp from "./Components/AuthPage/VerifyOtp";
import Password from "./Components/AuthPage/Password";

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); // Replace with your actual public key

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });


  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Routes>
        {/* authpage start */}
        <Route path="/student" element={<Home user={user} />} />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUp></SignUp>}/>
        <Route path="/verify-otp" element={<VerifyOtp ></VerifyOtp>}/>
        <Route path="/create-password" element={<Password />}/>

        



        {/* authpage end */}



        <Route path="/course/:id" element={user ? <CoursePlay user={user} /> : <Navigate to="/signin" />} />
        <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/signin" />} />
        <Route 
          path="/instructor-dashboard" 
          element={user && user.user.role === "instructor" ? <InstructorDashboard user={user} /> : <Navigate to="/signin" />} 
        />        <Route path="/payment/:id" element={user ? <Elements stripe={stripePromise}><CheckoutForm /></Elements> : <Navigate to="/signin" />} />
        <Route path="/my-learning" element={user ? <MyLearning user={user} /> : <Navigate to="/signin" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
