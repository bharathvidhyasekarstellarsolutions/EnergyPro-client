import React from "react";
import { useNavigate } from "react-router-dom";
import courses from "../Services/courses"; // Adjust the import based on your file structure
import subscribedCourses from "../Services/Subscription"; // Adjust the import based on your file structure

const MyLearning = ({ user }) => {
  const navigate = useNavigate();
console.log(user.user)
  // Find the user's subscriptions
  const userSubscriptions = subscribedCourses.find(
    (subscription) => subscription.email === user.user.email
  );

  // If user has subscriptions, get the course details
  const subscribedCourseIds = userSubscriptions
    ? userSubscriptions.subscribedCourseIds
    : [];

  // Filter courses based on subscribed IDs
  const subscribedCoursesDetails = courses.filter((course) =>
    subscribedCourseIds.includes(course.id)
  );

  return (
    <div className="p-10 h-screen">
      <h2 className="text-2xl font-bold mb-6">My Learning</h2>
      {subscribedCoursesDetails.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subscribedCoursesDetails.map((course) => (
            <div key={course.id} className="border p-4 rounded-lg shadow-md">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-bold">{course.title}</h3>
              <p className="text-gray-500">{course.instructor}</p>
              <p className="text-green-600 font-semibold">Paid</p>
              <button
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                onClick={() => navigate(`/course/${course.id}`, { state: { course } })}
              >
                Watch Course
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">You have not subscribed to any courses yet.</p>
      )}
    </div>
  );
};

export default MyLearning;
