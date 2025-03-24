import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import Certificate from "../Course/Certificate";

const CoursePlay = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [watched, setWatched] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) navigate("/signin");
    if (!state?.course) navigate("/");
    const videoUrl= course?.videoFile
    console.log(videoUrl);
  }, [state, user, navigate]);

  // Prevent rendering if data is missing
  if (!user || !state?.course) return null;

  const { course } = state;
  const videoUrl= course?.videoFile
  console.log(videoUrl);
  fetch(videoUrl)
  .then((res) => console.log("Fetch Response:", res))
  .catch((err) => console.error("Fetch Error:", err));
  

  const handleProgress = (progress) => {
    if (progress.played >= 0.99) setWatched(true);
  };

  const handleEnd = () => setWatched(true);

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-6">
      {/* Video Player Section */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <div className="w-full max-w-4xl">
        {videoUrl ? (
            <ReactPlayer
              url={videoUrl}
              playing
              controls
              width="100%"
              height="480px"
              config={{
                file: {
                  attributes: {
                    crossOrigin: "anonymous", // ✅ Allow CORS
                    playsInline: true, // ✅ iOS Support
                  },
                },
              }}
              onProgress={handleProgress}
              onEnded={() => setWatched(true)}
            />
          ) : (
            <p className="text-red-500">Video URL is missing or invalid.</p>
          )}

  
          {watched ? (
            <Certificate name={user?.user?.username} />
          ) : (
            <h1 className="font-medium">Complete the course for a certificate</h1>
          )}
        </div>
      </div>

      {/* Downloadable Resources Section */}
      <div className="w-full lg:w-1/4 bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Resources</h2>
        {course.resourceUrl ? (
          <a
            href={course.resourceUrl}
            className="block w-full bg-green-500 text-white p-3 rounded text-center hover:bg-green-600 transition"
            download
          >
            Download Resource
          </a>
        ) : (
          <p className="text-gray-500">No downloadable resources available.</p>
        )}
      </div>
    </div>
  );
};

export default CoursePlay;
