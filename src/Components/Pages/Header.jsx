import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Correctly destructure user data (avoiding undefined errors)
  const { username, role, email, avatar } = user?.user || {};


  // Logout function
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Optional: Clear local storage
    navigate("/");
  };

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">
        <Link to="/signin">EnergyPro</Link>
      </h1>
      <div className="relative flex items-center" ref={dropdownRef}>
        {user ? (
          <>
            {role === "student" && (
              <Link to="/my-learning" className="mr-4">My Learning</Link>
            )}
            <button
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition"
              onClick={toggleDropdown}
            >
              <img
                src={"/src/assets/profile/profile.png" || "https://via.placeholder.com/150"} // ✅ Correct avatar access
                alt="Profile"
                className="w-12 h-12 rounded-full border border-white"
              />
              <span className="font-semibold">{username.charAt(0).toUpperCase() + username.slice(1)}</span>
              <h3 className="block">({role.charAt(0).toUpperCase() + role.slice(1)})</h3>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black z-50 shadow-lg rounded-lg">
                <Link to="/profile" className="block px-4 py-3 hover:bg-gray-200 rounded-t-lg font-medium">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-200 rounded-b-lg font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            className="bg-blue-600  px-5 py-2 text-lg rounded-md text-white hover:bg-blue-700 transition"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
