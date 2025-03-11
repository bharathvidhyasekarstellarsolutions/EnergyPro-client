import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import Filters from "../Course/Filters";
import book from "/src/assets/book.jpg";
import axios from "axios";

const Home = ({ user }) => {
    const [courses, setCourses] = useState([]);
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:3000/courses");
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setError("Failed to load courses. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const filteredCourses = category === "All" 
        ? courses 
        : courses.filter(course => course.category === category);

    return (
        <>
            <div className="relative">
                <img src={book} className="h-[40rem] w-full object-cover" alt="" />
                <p className="italic font-medium absolute rounded-2xl p-5 text-white bg-amber-400 text-center right-2 top-15 text-3xl 
                    sm:text-2xl sm:w-2/5 sm:right-10 sm:top-20 
                    md:text-3xl md:w-2/4 md:right-2 md:top-50 
                    lg:text-4xl lg:w-2/5 lg:right-16 lg:top-35 
                    xl:text-5xl xl:w-1/2 xl:right-10 xl:top-35">
                    Welcome to Energy Pro Academy Empowering the Future with Knowledge in Sustainability and Energy Solutions
                </p>
                <p className="italic font-medium absolute text-center text-white right-2 top-120 text-l 
                    sm:text-l sm:w-2/5 sm:right-10 sm:top-100
                    md:text-l md:w-2/4 md:right-2 md:top-110
                    lg:text-l lg:w-2/5 lg:right-15 lg:top-110
                    xl:text-xl xl:w-1/2 xl:right-10 xl:top-110">
                    Learn Renewable Energy, Smart Metering, and Electrical Power Quality from Industry Experts.
                </p>
            </div>

            <div className="p-10">
                {/* Loading and Error Messages */}
                {loading && <p className="text-center text-lg">Loading courses...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {/* Header with Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold mb-3 md:mb-0">All Courses</h2>
                    <Filters categories={["All", ...new Set(courses.map(course => course.category))]} setCategory={setCategory} />
                </div>

                {/* Responsive Course Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredCourses.map((course) => (
                        <CourseCard key={course.id} course={course} user={user} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
