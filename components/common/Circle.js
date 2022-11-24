import React from 'react';
import { FaCircle } from 'react-icons/fa';

const Circle = ({ textColor }) => {
  return (
    <i className={`fas fa-2xs ${textColor} me-2 `}>
      <FaCircle />
    </i>
  );
};

export default Circle;
