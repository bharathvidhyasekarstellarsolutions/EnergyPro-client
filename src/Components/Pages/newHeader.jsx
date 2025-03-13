import { useState, useRef, useEffect } from "react";
import { Link, useNavigate ,NavLink} from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userData = localStorage.getItem("user"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
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
    <header className="bg-white shadow-md p-2 sticky top-0 z-2">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          <h2>EnergyPro</h2>
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
    to="/"
    onClick={() => setIsOpen(false)}
    className={({ isActive }) =>
      isActive ? 'text-blue-600' : 'hover:text-blue-600'
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
      isActive ? 'text-blue-600' : 'hover:text-blue-600'
    }
  >
    About
  </NavLink>
</li>
{user && (
  <li>
    <NavLink
      to="#course"
      onClick={() => setIsOpen(false)}
      className={({ isActive }) =>
        isActive ? 'text-blue-600' : 'hover:text-blue-600'
      }
    >
      My Learning
    </NavLink>
  </li>
)}
<li>
  <NavLink
    to="/contact"
    onClick={() => setIsOpen(false)}
    className={({ isActive }) =>
      isActive ? 'text-blue-600' : 'hover:text-blue-600'
    }
  >
    Contact
  </NavLink>
</li>


            {/* User Authentication Section */}
            {user ? (
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Menu
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black z-50 shadow-lg rounded-lg">
                    <Link
                      to="/profile"
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
              </li>
            ) : (
              <button
                className="bg-blue-600 px-5 py-2 text-lg rounded-md text-white hover:bg-blue-700 transition"
                onClick={() => {
                  setIsOpen(false)
                  navigate("/signin")}
                }
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
