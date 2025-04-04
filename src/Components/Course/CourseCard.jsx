import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const CourseCard = ({ course, index }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user =  JSON.parse(localStorage.getItem("user"));   
  const image =[
    'courseImage/course1.jpg',
    'courseImage/course2.jpg',
    'courseImage/course3.jpg',
    'courseImage/course4.jpg',
    'courseImage/course5.jpg',
  
  ]

  const handleStartCourse = async () => {
    
    setLoading(true);
    try {
     console.log(user.accessToken);
     
      const response = await fetch(
        `${SERVER_URL}/v1/api/subscription/get-course/${user?.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
            "Ngrok-Skip-Browser-Warning": "true" 
          },
        }
      );
    console.log((response));
    
      if (!response.ok) {
        throw new Error("Failed to check subscription status");
      }

      const data = await response.json();
    
      

   // Ensure courses is an array, default to empty array if undefined or null
// Ensure courses is parsed correctly
const rawCourses = data?.subscriptionData?.courses; 

// Check if it's a string and parse it
const courses = typeof rawCourses === "string" ? JSON.parse(rawCourses) : rawCourses;

// Ensure it's an array
const courseList = Array.isArray(courses) ? courses : [];

console.log("Parsed Courses:", courseList);

// Now safely use .filter() or .some()
const isSubscribed = courseList.some(
  (item) => item.courseId === course.courseId && item.subscribed
);

console.log("isSubscribed:", isSubscribed);

      if (isSubscribed) {
        navigate(`/coursePlay`, { state: { course } }); // Redirect to play page
      } else {
        navigate(`/payment/${course.courseId}`, { state: { course } }); // Redirect to payment
      }
    } catch (error) {
      console.error("Error checking purchase status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm w-[90%] mx-auto rounded overflow-hidden shadow-2xl transform transition duration-300 hover:scale-105">
      <img
        className="w-full h-48 object-cover"
        src={image[index]} // Fallback image
        alt={course.title}
        crossOrigin="anonymous"
      />
      <div className="px-6 py-4">
        <div className="overflow-hidden ">
          <div className="inline-block animate-marquee">
            <span>Course :
              </span> <span className="text-sm"> {course.title.charAt(0).toUpperCase() + course.title.slice(1)} </span> 
          </div>
        </div>
        <p className="text-gray-700 text-base">
          <span>Author :</span> {course.authorName.charAt(0).toUpperCase() + course.authorName.slice(1)}
        </p>
        <p className="text-green-500 font-semibold text-lg">₹{course.price}</p>
      </div>
      <div className="px-6 pb-3">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 mx-auto rounded-full hover:bg-blue-700 transition duration-300"
          onClick={handleStartCourse}
          disabled={loading}
        >
          {loading ? "Checking..." : "Start Course"}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
