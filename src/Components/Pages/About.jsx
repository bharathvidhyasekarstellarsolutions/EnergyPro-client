import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-scree ">
      {/* Hero Section */}
      <div className="relative top-0 md:h-[500px] h-[300px] p-4 flex items-center opacity- bg-[url('image/about/about5.jpg')]  justify-center text-white bg-cover  md:bg-cover bg-[-20px_30px]  md:bg-[0px_-10px] lg:bg-[0px_-140px] bg-no-repeat">
  
  {/* Background Overlay for better readability */}
  <div className="absolute inset-0"></div>

  {/* Content Box */}
  <div className="absolute top-5 text-blue-900 bg-violet-200 md:p-6 p-1 opacity-95 rounded-lg text-center">
    <h1 className="md:text-4xl text-2xl font-bold">EnergyProInstitute</h1>
    <p className="mt-2 md:text-2xl text-xl ">Promote sustainable energy education and practical solutions.</p>
  </div>
</div>

      {/* Introduction Section */}
      <div className="container mx-auto px-6 bg-gray-100 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-500">About Us</h2>
            <p className="mt-4 text-gray-700 leading-relaxed text-xl">
            EnergyProInstitute is dedicated to providing high-quality educational courses tailored for professionals in the energy sector and business leaders looking to enhance their sustainability expertise. Founded by Hussein Salloum, an expert in electrical and renewable energies with extensive experience in business administration and transformational leadership, our institute bridges the gap between technical knowledge and practical business applications.            </p>
            {/* <p className="mt-4 text-blue-900">
              Join thousands who have taken their first steps toward a sustainable future with us!
            </p> */}
            <Link to="/courses" className="mt-6 inline-block bg-gray-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition">
              Explore Courses
            </Link>
          </div>
          <div>
            <img src="image/about/solar3.jpg" alt="Solar Panel" className="w-full rounded-lg shadow-xl" />
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-12">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-bold text-center text-gray-700">
      Why Choose EnergyProInstitute?
    </h2>
    <div className="grid md:grid-cols-3 gap-8 mt-8">
      <div className="p-6 bg-gray-100 rounded-lg text-center shadow-md">
        <img
          src="image/about/expert-led.jpg"
          alt="Expert Training"
          className="w-80 h-50 rounded mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold">Expert-Led Courses</h3>
        <p className="mt-2 text-gray-700">
          Learn from industry professionals with real-world experience.
        </p>
      </div>
      <div className="p-6 bg-gray-100 rounded-lg text-center shadow-md">
        <img
          src="image/about/learning.jpg"
          alt="Hands-On Learning"
          className="w-80 h-50 rounded mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold">Hands-On Learning</h3>
        <p className="mt-2 text-gray-700">
          Gain practical skills with real-world renewable energy projects.
        </p>
      </div>
      <div className="p-6 bg-gray-100 rounded-lg text-center shadow-md">
        <img
          src="image/about/future.jpg"
          alt="Sustainable Future"
          className="rounded w-80 h-50 mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold">Sustainable Future</h3>
        <p className="mt-2 text-gray-700">
          Be part of the green energy revolution and make a difference.
        </p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      <div className="p-6 bg-gray-100 rounded-lg text-center shadow-md">
        <img
          src="image/about/fb-learn.jpg"
          alt="Flexible Learning"
          className="w-80 h-50 rounded mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold">Flexible Learning</h3>
        <p className="mt-2 text-gray-700">
          Choose from online and in-person courses to fit your schedule.
        </p>
      </div>
      <div className="p-6 bg-gray-100 rounded-lg text-center shadow-md">
        <img
          src="image/about/certificate.jpg"
          alt="Certification"
          className="w-80 h-50 rounded mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold">Certification</h3>
        <p className="mt-2 text-gray-700">
          Earn a recognized certification upon course completion.
        </p>
      </div>
      <div className="p-6 bg-gray-100 rounded-lg text-center shadow-md">
        <img
          src="image/about/networking.jpg"
          alt="Networking"
          className="w-80 h-50 rounded mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold">Networking Opportunities</h3>
        <p className="mt-2 text-gray-700">
          Connect with industry peers and expand your professional network.
        </p>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default About;
