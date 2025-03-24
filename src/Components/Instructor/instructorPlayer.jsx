import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";

export default function InstructorPlayer() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [watched, setWatched] = useState(false);

  // Redirect if not logged in or no course
  useEffect(() => {
    if (!user) navigate("/signin");
    if (!state?.course) navigate("/");
  }, [user, state, navigate]);

  if (!state?.course) return <p className="text-center text-gray-500">No course found.</p>;

  const { course } = state;
  const videoUrl = course.videoFile?.startsWith("http")
    ? course.videoFile
    : `http://localhost:3000${course.videoFile}`;


  console.log("Video URL:", videoUrl);

  // Test if the video URL is accessible
  useEffect(() => {
    fetch(videoUrl)
      .then((res) => console.log("Fetch Response:", res))
      .catch((err) => console.error("Fetch Error:", err));
  }, [videoUrl]);

  const handleProgress = (progress) => {
    if (progress.played >= 0.99) setWatched(true);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto">
      {/* Video Player Section */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <div className="w-full max-w-4xl">
          {videoUrl ? (
            <ReactPlayer
              url={videoUrl}
              controls
              width="100%"
              height="480px"
              className="rounded-lg shadow-lg"
              onProgress={handleProgress}
              onEnded={() => setWatched(true)}
              config={{
                file: {
                  attributes: {
                    crossOrigin: "anonymous", // ✅ Fix CORS issues
                    playsInline: true, // ✅ Optimize for mobile
                  },
                },
              }}
            />
          ) : (
            <p className="text-red-500">Video URL is missing or invalid.</p>
          )}

          {watched && (
            <p className="text-green-500 mt-4 text-lg font-semibold">
              ✅ Course completed!
            </p>
          )}
        </div>
      </div>

      {/* Downloadable Resources Section */}
      <div className="w-full lg:w-1/4 bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Resources</h2>
        {course.resourceFile ? (
          <a
            href={course.resourceFile}
            className="block w-full bg-blue-500 text-white p-3 rounded text-center hover:bg-blue-600 transition"
            download
          >
            📥 Download Resource
          </a>
        ) : (
          <p className="text-gray-500">No downloadable resources available.</p>
        )}
      </div>
    </div>
  );
}

