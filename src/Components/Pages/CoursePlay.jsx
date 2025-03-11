import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import Certificate from "../Course/Certificate";
import video from '../video/vi.mp4'

const CoursePlay = ({ user }) => {
  const [watched , setWatched] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(user || JSON.parse(localStorage.getItem("user")));

  // Redirect if no user exists (not signed in)
  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  // Redirect to home if no course data exists
  useEffect(() => {
    if (!state?.course) {
      navigate("/");
    }
  }, [state, navigate]);

  // Prevent rendering if user or course is missing
  if (!currentUser || !state?.course) return null;

  const { course } = state;



  const handleProgress = (progress) => {
    // Check if video is 95% completed (to avoid missing small gaps)
    if (progress.played >= 0.95) {
      setWatched(true);
    }
  };

  const handleEnd = () => {
    setWatched(true); // Ensure it's marked watched when it ends
  };
  return (
    <div className="p-6 flex flex-col lg:flex-row gap-6">
      {/* Left: Video Player */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <div className="w-full max-w-4xl">
          <ReactPlayer
            url={course.videoUrl || video}
            controls
            width="100%"
            height="480px"
            className="rounded-lg shadow-lg"
            onProgress={handleProgress}
            onEnded={handleEnd}
            onContextMenu={(e) => e.preventDefault()} // Disable right-click
      config={{
        file: {
          attributes: {
            controlsList: 'nodownload', // Prevent download option
          },
        },
      }}
          />
       {watched ? (<Certificate name={user}></Certificate>) : (<h1 className="font-medium">Complete the course for certificate</h1>)}

        </div>
        
      </div>

      {/* Right: Downloadable Resource */}
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
