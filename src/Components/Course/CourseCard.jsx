import React from "react";
import { useNavigate } from "react-router-dom";
import subscribedCourses from '../Services/Subscription'; // Adjust the import based on your file structure

const CourseCard = ({ course, user }) => {
  const navigate = useNavigate();

  const handleStartCourse = () => {
    if (user) {
      // Find the user's subscription based on the latest user info
      const userSubscription = subscribedCourses.find(subscription => subscription.email === user.email);
      const isSubscribed = userSubscription ? userSubscription.subscribedCourseIds.includes(course.id) : false;
       console.log(isSubscribed)
      if (isSubscribed) {
        // If subscribed, navigate to course
        navigate(`/course/${course.id}`, { state: { course } });
      } else {
        // If not subscribed, navigate to payment
        navigate(`/payment/${course.id}`, { state: { course } });
      }
    } else {
      // If not logged in, redirect to sign-in page
      localStorage.setItem("redirectAfterLogin", `/course/${course.id}`);
      navigate("/signin");
    }
  };

  return (
    <div className="border p-4 rounded-lg border-gray-300 shadow-lg bg-white hover:shadow-xl transition-transform transform hover:scale-105">
      <img src={course.image} alt={course.title} className="w-full h-40 object-fill rounded-md" />
      <h3 className="text-lg font-bold mt-2">{course.title}</h3>
      <p className="text-gray-500">{course.instructor}</p>
      <p className="text-green-600 font-semibold text-lg">₹{course.price}</p>
      <button
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        onClick={handleStartCourse}
      >
        Start Course
      </button>
    </div>
  );
};

export default CourseCard;
