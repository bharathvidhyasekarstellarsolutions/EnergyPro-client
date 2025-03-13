import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, user }) => {
  const navigate = useNavigate();

  const handleStartCourse = () => {
    if (user) {
      const userSubscription = subscribedCourses.find(
        (subscription) => subscription.email === user.user.email
      );
      const isSubscribed = userSubscription
        ? userSubscription.subscribedCourseIds.includes(course.id)
        : false;

      if (isSubscribed) {
        navigate(`/course/${course.id}`, { state: { course } });
      } else {
        navigate(`/payment/${course.id}`, { state: { course } });
      }
    } else {
      localStorage.setItem("redirectAfterLogin", `/course/${course.id}`);
      navigate("/signin");
    }
  };

  return (
    <div className="max-w-sm w-[90%]  rounded overflow-hidden  shadow-2xl transform transition duration-300 hover:scale-105">
      <img
        className="w-full h-48 object-fill "
        src={course.image}
        alt={course.title}
      />
      <div className="px-6 py-4">
      <div className="overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-marquee">
       {course.title}
      </div>
    </div>      
      <p className="text-gray-700 text-base">{course.instructor}</p>
        <p className="text-green-500 font-semibold text-lg">₹{course.price}</p>
      </div>
      <div className="px-6  pb-3">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 mx-auto rounded-full hover:bg-blue-700 transition duration-300"
          onClick={handleStartCourse}
        >
          Start Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
