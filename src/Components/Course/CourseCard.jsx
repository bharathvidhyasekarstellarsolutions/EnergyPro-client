import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleStartCourse = async () => {
    if (!user) {
      localStorage.setItem("redirectAfterLogin", `/course/${course.courseId}`);
      navigate("/signin");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/v1/api/subscription/get-course/${user.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

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
    <div className="max-w-sm w-[90%] rounded overflow-hidden shadow-2xl transform transition duration-300 hover:scale-105">
      <img
        className="w-full h-48 object-cover"
        src={course.imageFile || "https://via.placeholder.com/150"} // Fallback image
        alt={course.title}
        crossOrigin="anonymous"
      />
      <div className="px-6 py-4">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee">
            <span>Course :</span> {course.title.charAt(0).toUpperCase() + course.title.slice(1)}
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
