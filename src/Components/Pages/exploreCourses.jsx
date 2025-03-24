import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import { ArrowRight } from 'lucide-react';

const courses = [
  {
    title: "Sustainability Essentials",
    topics: [
      "Fundamentals of sustainability principles",
      "Environmental responsibility and climate action",
      "Sustainable business models and circular economy",
      "Regulatory policies and compliance frameworks",
      "Corporate sustainability strategies and ESG reporting",
    ],
  },
  {
    title: "Renewable Energy for Professionals",
    topics: [
      "Solar, wind, and hybrid energy systems",
      "Renewable energy policies and market trends",
      "Energy storage and grid integration",
      "Feasibility analysis and financial modeling",
      "Case studies of successful renewable projects",
    ],
  },
  {
    title: "Transformational Leadership for SMEs",
    topics: [
      "Leadership principles and change management",
      "Resilience and crisis management for SMEs",
      "Strategic decision-making in dynamic markets",
      "Employee engagement and organizational culture",
      "Innovation and digital transformation for SMEs",
    ],
  },
  {
    title: "Mastering Hybrid Solar Systems Design",
    topics: [
      "Introduction to hybrid solar solutions",
      "Grid-tied, off-grid, and hybrid solar systems",
      "System sizing, load assessment, and feasibility studies",
      "Hybrid PV-Diesel-Battery integration strategies",
      "Technical challenges and financial viability analysis",
    ],
  },
  {
    title: "Smart Electrical Metering and Power Quality",
    topics: [
      "Fundamentals of smart metering technology",
      "Advanced metering infrastructure (AMI) solutions",
      "Power factor correction (PFC) techniques",
      "Harmonics suppression and energy efficiency practices",
      "Case studies on smart metering implementation",
    ],
  },
  {
    title: "IoT Solutions for Energy Management",
    topics: [
      "IoT-based real-time energy monitoring and control",
      "Smart automation for industrial and commercial applications",
      "Data analytics and predictive maintenance",
      "Integration with energy management systems (EMS)",
      "Implementation case studies and best practices",
    ],
  },
  {
    title: "Manufacturing Leadership Program",
    topics: [
      "Leadership foundations in the manufacturing sector",
      "Effective communication and stakeholder management",
      "Strategic thinking and decision-making",
      "Leading change and fostering innovation",
      "Crisis management and resilience in manufacturing",
    ],
  },
];

const ExploreCourses = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  
  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);
  
  const items = courses.map((course) => ({
    key: course.title,
    title: course.title,
  }));
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Our Courses</h1>
      <p className="text-center text-gray-600 mb-6">
        We offer comprehensive training programs designed to equip individuals with the knowledge and skills required to excel in energy and leadership fields. Our flagship courses include:
      </p>
      <div className="flex flex-grow justify-evenly">
        <div className="w-1/3 pr-6">
          <Steps progressDot current={current} direction="vertical" items={items} />
        </div>
        <div className="w-2/4 bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800">{courses[current].title}</h2>
          <ul className="list-none text-gray-600 mt-4">
            {courses[current].topics.map((topic, i) => (
              <li key={i} className="flex items-center gap-2">
                <ArrowRight size={16} /> {topic}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-start">
            {current > 0 && (
              <Button className="mr-2" onClick={prev}>
                Previous
              </Button>
            )}
            {current < courses.length - 1 ? (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            ) : (
              <Button type="primary" onClick={() => message.success('You have reviewed all courses!')}>
                Done
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;