import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaHome, FaEnvelope, FaPhone, FaPrint, FaLinkedin } from "react-icons/fa";

const NewFooter = () => {
  return (
    <footer className="bg-gray-800 text-white text-center w-full text-lg-start py-6">
      <div className="container  px-6">
        {/* Grid Section */}
        <div className="grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Company Info */}
          <div>
            <h6 className="text-xl font-bold mb-3">EnergyProInstitute</h6>
            <p className="text-gray-300">Learn Renewable Energy, Smart Metering, and Electrical Power Quality from Industry Experts.
            .</p>
          </div>

          {/* Products */}
          <div>
            <h6 className="text-xl font-bold mb-3">Courses</h6>
            <p><a href="#" className="text-gray-300 hover:text-white transition">Sustainability Essentials</a></p>
            <p><a href="#" className="text-gray-300 hover:text-white transition">Hybrid Solar Systems Design</a></p>
            <p><a href="#" className="text-gray-300 hover:text-white transition">Smart Metering & Power Quality</a></p>
            <p><a href="#" className="text-gray-300 hover:text-white transition">IoT for Energy Management</a></p>
          </div>

          {/* Useful Links */}

          {/* Contact Info */}
          <div className="">
            <h6 className="text-xl font-bold mb-3">Contact</h6>
            <p><FaHome className="inline mr-2 text-gray-400" /> New York, NY 10012, US</p>
            <p><FaEnvelope className="inline mr-2 text-gray-400" />hussein@energyproelec.com	</p>
            <p><FaPhone className="inline mr-2 text-gray-400" /> +97 1502 753 820</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-600" />

        {/* Footer Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Copyright: 
            <a href="#" className="text-white font-semibold hover:underline ml-1"><span>EnergyProInstitute</span>.com</a>
          </p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end space-x-4 mt-4 md:mt-0">
            <a href="#" className="p-2 rounded-full border border-white hover:bg-white hover:text-blue-800 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full border border-white hover:bg-white hover:text-blue-400 transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 rounded-full border border-white hover:bg-white hover:text-blue-600 transition">
              <FaGoogle />
            </a>
            <a href="#" className="p-2 rounded-full border border-white hover:bg-white hover:text-pink-800 transition">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;
