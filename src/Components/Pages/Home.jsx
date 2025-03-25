import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import Filters from "../Course/Filters";
import book from "/src/assets/book.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import { Flex,Spin } from "antd";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const Home = ({ user }) => {
    const [courses, setCourses] = useState([]);
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchCourses = async () => {
          try {
              const response = await axios.get(`${SERVER_URL}/v1/api/courses/getCourses`,{
                headers: {
                  "Content-Type": "application/json",
                  "Ngrok-Skip-Browser-Warning": "true"  // ✅ Bypass Ngrok warning page
                },
              }
                
              );              
              // ✅ Ensure we extract `data` array
              const courseArray = Array.isArray(response.data.data) ? response.data.data : [];               
              // ✅ Format URLs correctly
  
              setCourses(courseArray);
          } catch (error) {
              console.error("Error fetching courses:", error);
              setError(error.response.data.message);
          } finally {
              setLoading(false);
          }
      };
  
      fetchCourses();
  },[]);


  
  console.log(courses)
  

    const filteredCourses = category === "All" 
        ? courses 
        : courses.filter(course => course.category === category);

    return (
        <>
           
<section className="bg-gray-100 py-16  flex flex-col items-center justify-center bg-[url('/image/home/home1.jpg')] bg-[auto_400px] bg-no-repeat lg:bg-right  ]"      >
        <div className="container mx-auto px-4 mt-[380px] lg:mt-0">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="space-y-6 text-center lg:text-left">
                {/* <h5 className="text-black-800  font-mono font-semibold text-lg tracking-wide">Everyone Yearns to Learn</h5> */}
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
                  Welcome to <span className="text-blue-500">EnergyProInstitute</span>
                </h1>
                <h2 className="text-2xl font-semibold text-gray-700">
                Your trusted source for professional education in sustainability, renewable energy, and transformational leadership. Our mission is to empower professionals, entrepreneurs, and students with cutting-edge knowledge and practical skills to thrive in an evolving energy landscape.
                </h2>
                {/* <p className="text-xl text-gray-600 leading-relaxed">
                  Learn <span className="font-medium text-gray-800">Renewable Energy, Smart Metering,</span> and <span className="font-medium text-gray-800">Electrical Power Quality</span> from Industry Experts.
                </p> */}
                <div className="space-x-4">
                  {/* <Link to="#" className="bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">View Course</Link> */}
                  {/* <Link to="#" className="bg-gray-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 transition">Get Started</Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <div className="p-10">
            {/* ✅ Loading and Error Messages */}
      
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* ✅ Header with Filters */}
            <div id="course" className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold mb-3 md:mb-0">All Courses</h2>
                <Filters categories={["All", ...new Set(courses.map(course => course.category))]} setCategory={setCategory} />
            </div>
      {loading &&  <Flex justify="center" align="center" className="h-90 ">
        <Spin tip="" size="large">
        </Spin>
      </Flex>}
            {/* ✅ Responsive Course Grid */}
            <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                {filteredCourses.map((course,index) => (
                    <CourseCard key={course.courseId} index={index} course={course} user={user} />
                ))}
            </div>
        </div>


        </>
    );
};

export default Home;
