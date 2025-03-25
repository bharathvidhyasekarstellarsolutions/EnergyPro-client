import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const MyLearning = () => {
  const navigate = useNavigate();
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  // ✅ Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(parsedUser?.accessToken || "");
        setUserId(parsedUser?.user?.id || "");
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    } else {
      console.error("No user found in localStorage");
    }
  }, []);


  // ✅ Fetch subscribed courses once `userId` & `token` are set
  useEffect(() => {
    if (!userId || !token) return; // 🛑 Wait until both are available

    const fetchSubscribedCourses = async () => {
   try {
        const response = await axios.get(
          `${SERVER_URL}/v1/api/subscription/get-course/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "Ngrok-Skip-Browser-Warning": "true" 
            },
          }
        );

        setSubscribedCourses(response.data.myCourses || []);
      } catch (err) {
        console.error("❌ API Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribedCourses();
  }, [userId, token]); // ✅ Now waits for both `userId` & `token`

  // 🔹 Capitalize Helper Function
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="p-10 h-screen">
      <h2 className="text-2xl font-bold mb-6">My Learning</h2>

      {loading ? (
        <p className="text-gray-700">Loading courses...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : subscribedCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
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
                <div className="overflow-hidden">
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
