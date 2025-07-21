import React, { useState } from "react";
import "./App.css"; // Assuming Tailwind is set up

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

co
