import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyLearning = ({ user }) => {
  const navigate = useNavigate();
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const accessToken = parsedUser?.accessToken;
        setToken(accessToken);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    } else {
      console.error("No user found in localStorage");
    }
  }, []);

  useEffect(() => {
    const fetchSubscribedCourses = async () => {
      if (!user?.user?.id) {
        setError("User not found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/v1/api/subscription/get-course/${user.user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );


        const data = await response.json();
        setSubscribedCourses(data.myCourses || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchSubscribedCourses();
    }
  }, [token, user]);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="p-10 h-screen">
      <h2 className="text-2xl font-bold mb-6">My Learning</h2>

      {loading ? (
        <p className="text-gray-700">Loading courses...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : subscribedCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subscribedCourses.map((course) => (
            <div
              key={course.courseId}
              className="max-w-sm w-[90%] rounded overflow-hidden shadow-2xl transform transition duration-300 hover:scale-105"
            >
              <img
                className="w-full h-48 object-cover rounded-t-lg"
                src={course.imageFile || "https://via.placeholder.com/150"}
                alt={course.title}
                crossOrigin="anonymous"
              />
              <div className="px-6 py-4">
                <div className="overflow-hidden whitespace-nowrap">
                  <div className="inline-block animate-marquee text-lg font-bold">
                    <span className="font-light">Course :</span> {capitalize(course.title)}
                  </div>
                </div>
                <p className="text-gray-700 text-base">
                  <span>Author :</span> {course.authorName}
                </p>
                <p className="text-green-500 font-semibold text-lg">Paid</p>
              </div>
              <div className="px-6 pb-3">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 mx-auto rounded-full hover:bg-blue-700 transition duration-300"
                  onClick={() => navigate(`/coursePlay`, { state: { course } })}
                >
                  Watch Course
                </button>
              </div>
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
