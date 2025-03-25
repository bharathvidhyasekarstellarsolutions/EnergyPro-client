import React from 'react';
import { Collapse } from 'antd';
import { ArrowRight } from 'lucide-react';
import {RightCircleTwoTone} from "@ant-design/icons"

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
  const items = courses.map((course, index) => ({
    key: index.toString(),
    label: course.title,
    children: (
      <div className="text-gray-600">
        {course.topics.map((topic, i) => (
          <p key={i} className="flex items-center mt-2 gap-3">
            <RightCircleTwoTone /> {topic}
          </p>
        ))}
      </div>
    ),
  }));

  return (
    <div className="py-14 bg-gray-100 grid lg:grid-cols-2 md:grid-cols-2 justify-evenly">
    <div className='self-center'>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Our Courses</h1>
      <p className="text-center text-gray-600 mb-6">
        We offer comprehensive training programs designed to equip individuals with the knowledge and skills required to excel in energy and leadership fields.
      </p>
      </div>
      <div className="bg-white p-6 shadow-md rounded-lg ">
        <Collapse accordion items={items} />
      </div>
    </div>
  );
};

export default ExploreCourses;
