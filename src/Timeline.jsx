
import React, { useState } from "react";
import { timelineData } from "./data";
import Modal from "./Modal";

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
