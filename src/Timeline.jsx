import React, { useState } from "react";
import Modal from "./Modal";

const generateTimelineData = () => {
  const data = {};
  const titles = [
    "Clean Water Drive",
    "Health Camp",
    "Education Outreach",
    "Tree Plantation"
  ];

  const descriptions = [
    "Short summary of clean water project.",
    "Short summary of health camp.",
    "Short summary of education outreach.",
    "Short summary of tree plantation."
  ];

  const longDescriptions = [
    "Full details of clean water project—its goals, execution, and impact.",
    "Detailed explanation of the health camp and how it helped the community.",
    "In-depth summary of the education outreach program's success.",
    "Comprehensive description of the tree plantation and its benefits."
  ];

  for (let year = 2011; year <= 2025; year++) {
    data[year] = Array.from({ length: 4 }).map((_, i) => ({
      title: titles[i],
      image: `/images/${year}-${titles[i].toLowerCase().replace(/\s+/g, "-")}.jpg`,
      shortDescription: descriptions[i],
      longDescription: longDescriptions[i]
    }));
  }

  return data;
};

const timelineData = generateTimelineData();

const Timeline = () => {
  const [selected, setSelected] = useState(null);

  const handleClick = (initiative) => {
    setSelected(initiative);
  };

  const closeModal = () => {
    setSelected(null);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center my-8">Our Journey</h1>
      {Object.entries(timelineData).map(([year, initiatives]) => (
        <div key={year} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{year}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {initiatives.map((initiative, idx) => (
              <div
                key={idx}
                onClick={() => handleClick(initiative)}
                className="cursor-pointer bg-white rounded-lg shadow hover:shadow-xl transition-shadow transform hover:scale-105 duration-200 overflow-hidden"
              >
                <img
                  src={initiative.image}
                  alt={initiative.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium">{initiative.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {initiative.shortDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Modal isOpen={!!selected} onClose={closeModal} initiative={selected} />
    </div>
  );
};

export default Timeline;
