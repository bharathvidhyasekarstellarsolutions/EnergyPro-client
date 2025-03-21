import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// Import pages and components
import Home from "./Components/Pages/Home";
import CoursePlay from "./Components/Pages/CoursePlay";
import SignIn from "./Components/AuthPage/Signin";
import Profile from "./Components/Pages/Profile";
import CheckoutForm from "./Components/Payment/Checkoutform";
import InstructorDashboard from "./Components/Instructor/InstructorDashboard";
import MyLearning from "./Components/Course/MyLearning";
import SignUp from "./Components/AuthPage/SignUp";
import VerifyOtp from "./Components/AuthPage/VerifyOtp";
import Password from "./Components/AuthPage/Password";
import Navbar from "./Components/Pages/newHeader";
import NewFooter from "./Components/Pages/newFooter";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import Dashboard from "./Components/AdminControl/Dashboard/dashboard";
import InstructorList from "./Components/AdminControl/instructorControl/instructorList";
import InstructorRegister from "./Components/AdminControl/instructorControl/instructorRegister";
import StudentList from "./Components/AdminControl/studentControl/studentList";
import StudentRegister from "./Components/AdminControl/studentControl/studentRegister";
import { AuthProvider } from "./authProvider";
import InstructorCourse from "./Components/Instructor/instructorCourse";
import InstructorPlayer from "./Components/Instructor/instructorPlayer";
const stripePromise = loadStripe(""); // Replace with your actual public key

function App() {
  // Load user from localStorage properly
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
      console.error("Invalid user data in localStorage", error);
      return null;
    }
  });

  const userRole = user?.user?.role;

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const location = useLocation();
  const hideHeaderFooter = location.pathname.includes("/admin");

  // Redirect to home if userRole is null, but only after user is loaded
  useEffect(() => {
    if (user !== null && !userRole) {
      window.location.replace("/");
    }
  }, [user, userRole]);

  return (
    <>
      {/* Show Navbar unless it's an admin page */}
      {!hideHeaderFooter && <Navbar user={user} setUser={setUser} />}
<AuthProvider user={user} setUser={setUser}>
      <Routes>
        {/* Authentication Pages */}
        <Route
          path="/signin"
          element={user ? <Navigate to={userRole === "student" ? "/" : "/instructor-dashboard"} /> : <SignIn setUser={setUser} />}
        />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/verify-otp" element={user ? <Navigate to={userRole === "student" ? "/" : "/instructor-dashboard"} /> : <VerifyOtp />} />
        <Route path="/create-password" element={<Password />} />

        {/* Student & Public Routes */}
        <Route path="/" element={user ? (user.user.role === "student" ? <Home user={user} /> : <Navigate to="/instructor-dashboard" />) 
        : (<Home user={user} />  )}/>


        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/coursePlay" element={user ? <CoursePlay user={user} /> : <Navigate to="/signin" />} />
        <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/signin" />} />
        <Route path="/payment/:id" element={user ? <Elements stripe={stripePromise}><CheckoutForm /></Elements> : <Navigate to="/signin" />} />
        <Route path="/my-learning" element={user ? <MyLearning user={user} /> : <Navigate to="/signin" />} />

        {/* Instructor Dashboard - Only Accessible to Instructors */}
        {userRole === "instructor" && <Route path="/instructor-dashboard" element={<InstructorDashboard user={user} />} />}
        {userRole === "instructor" && <Route path="/instructor-course" element={<InstructorCourse user={user} />} />}
        {userRole === "instructor" && <Route path="/instructor-player" element={<InstructorPlayer user={user} />} />}



        {/* Admin Routes - Only Accessible to Admins */}
        {userRole === "admin" && (
          <>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/instructor" element={<InstructorList />} />
            <Route path="/admin/instructor-register" element={<InstructorRegister />} />
            <Route path="/admin/student" element={<StudentList />} />
            <Route path="/admin/student-register" element={<StudentRegister />} />
          </>
        )}


        {/* Redirect unknown routes based on user role */}
        <Route path="*" element={<Navigate to={userRole === "instructor" ? "/instructor-dashboard" : "/"} />} />
      </Routes>
      </AuthProvider>

      {/* Show Footer unless it's an admin page */}
      {!hideHeaderFooter && <NewFooter />}
    </>
  );
}

export default App;
