import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { username, role, avatar } = user?.user || {};

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    setUser("");
    navigate("/"); // Redirect to home
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
    <header className="bg-white shadow-md p-2 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between relative">
        <Link
          to={role === "instructor" ? "/instructor-dashboard" : "/"}
          className="text-xl font-bold"
        >
          <h2>EnergyProInstitute</h2>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md focus:outline-none focus:ring"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:space-x-6 absolute lg:static top-16 left-0 w-full bg-white lg:w-auto lg:bg-transparent shadow-md lg:shadow-none`}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6 p-4 lg:p-0">
            <li>
              <NavLink
                to={role === "instructor" ? "/instructor-dashboard" : "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-blue-600" : "hover:text-blue-600"
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-blue-600" : "hover:text-blue-600"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/explore-courses"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-blue-600" : "hover:text-blue-600"
                }
              >
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-blue-600" : "hover:text-blue-600"
                }
              >
                Contact
              </NavLink>
            </li>

            {/* Show My Learning (Student) or My Courses (Instructor) */}
            {role === "student" && (
              <li>
                <NavLink
                  to="/my-learning"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "text-blue-600" : "hover:text-blue-600"
                  }
                >
                  My Learning
                </NavLink>
              </li>
            )}

            {/* User Authentication Section */}
            {user ? (
              <div className="relative flex flex-col items-center lg:flex-row lg:space-x-3">
                <button
                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200 transition"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={avatar || "/src/assets/profile/profile.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <span className="font-semibold">
                    {username.charAt(0).toUpperCase() + username.slice(1)}
                  </span>
                  <h3 className="block">
                    ({role.charAt(0).toUpperCase() + role.slice(1)})
                  </h3>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-14 right-0 lg:right-0 w-48 bg-white text-black z-10 shadow-lg rounded-lg border"
                  >
                    <Link
                      to="/profile"
                      onClick={() => {
                        setDropdownOpen(false);
                        setIsOpen(false);
                      }}
                      className="block px-4 py-3 hover:bg-gray-200 rounded-t-lg font-medium"
                    >
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
              </div>
            ) : (
              <button
                className="bg-blue-600 px-5 py-2 text-lg rounded-md text-white hover:bg-blue-700 transition"
                onClick={() => {
                  navigate("/signin");
                  setIsOpen(false);
                }}
              >
                Sign In
              </button>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
