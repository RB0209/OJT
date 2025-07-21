
import React, { useState } from "react";

const generatePlaceholderData = () => {
  const data = {};
  for (let year = 2011; year <= 2025; year++) {
    data[year] = Array.from({ length: 4 }).map((_, i) => ({
      title: `Initiative ${i + 1}`,
      image: "https://via.placeholder.com/1080",
      shortDescription: `Short description of Initiative ${i + 1} in ${year}`,
      longDescription: `Detailed explanation of Initiative ${i + 1} carried out in the year ${year}, its purpose, execution, and impact.`
    }));
  }
  return data;
};

const timelineData = generatePlaceholderData();

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
  const [selectedYear, setSelectedYear] = useState(years[0]);
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

      <div className="flex overflow-x-auto gap-4 mb-8 py-2 px-1 border-b">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 whitespace-nowrap rounded-full transition-all font-medium ${
              year === selectedYear
                ? "bg-blue-600 text-white shadow"
                : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">{selectedYear}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {timelineData[selectedYear].map((initiative, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(initiative)}
              className="cursor-pointer bg-white rounded-lg shadow hover:shadow-xl transition-transform transform hover:scale-105 duration-200 overflow-hidden"
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

      <Modal isOpen={!!selected} onClose={closeModal} initiative={selected} />
    </div>
  );
};

export default Timeline;
