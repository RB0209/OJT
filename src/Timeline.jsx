import React, { useState } from "react";

// Timeline data using actual filenames
const generateData = () => {
  const labels = [
    { name: "Clean Water", file: "clean-water" },
    { name: "Health Camp", file: "health-camp" },
    { name: "Education Outreach", file: "education-outreach" },
    { name: "Tree Plantation", file: "tree-plantation" }
  ];

  const data = {};
  for (let year = 2011; year <= 2025; year++) {
    data[year] = labels.map((label) => ({
      title: label.name,
      image: `/images/${year}-${label.file}.jpg`,
      shortDescription: `${label.name} initiative carried out in ${year}`,
      longDescription: `A comprehensive look at the ${label.name.toLowerCase()} program executed in ${year}, focusing on impact and outreach.`
    }));
  }
  return data;
};

const timelineData = generateData();

const Modal = ({ isOpen, onClose, initiative }) => {
  if (!isOpen || !initiative) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg max-w-xl w-full relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-2">{initiative.title}</h2>
        <img
          src={initiative.image}
          alt={initiative.title}
          className="w-full h-auto max-h-96 object-cover rounded mb-4"
        />
        <p className="text-gray-700">{initiative.longDescription}</p>
      </div>
    </div>
  );
};

const Timeline = () => {
  const years = Object.keys(timelineData);
  const [selected, setSelected] = useState(null);

  const handleClick = (initiative) => {
    setSelected(initiative);
  };

  const closeModal = () => {
    setSelected(null);
  };

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <h1 className="text-4xl font-bold text-center my-8">Our Journey</h1>
      <div className="flex space-x-8 overflow-x-auto pb-4 px-2 snap-x snap-mandatory">
        {years.map((year) => (
          <div
            key={year}
            className="min-w-[300px] snap-start flex-shrink-0 bg-gray-100 rounded-lg p-4 shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-center">{year}</h2>
            <div className="grid grid-cols-1 gap-4">
              {timelineData[year].map((initiative, idx) => (
                <div
                  key={idx}
                  onClick={() => handleClick(initiative)}
                  className="cursor-pointer bg-white rounded-lg shadow hover:shadow-xl transition-transform transform hover:scale-105 duration-200 overflow-hidden"
                >
                  <img
                    src={initiative.image}
                    alt={initiative.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-md font-medium">{initiative.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {initiative.shortDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={!!selected} onClose={closeModal} initiative={selected} />
    </div>
  );
};

export default Timeline;
