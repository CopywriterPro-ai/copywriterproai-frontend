import React from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = ({ classOption }) => {
  return (
    <ul className={`list-unstyled rating-list list-inline mb-0 ${classOption}`}>
      <li className="list-inline-item">
        <FaStar className="text-warning" />
      </li>
      <li className="list-inline-item">
        <FaStar className="text-warning" />
      </li>
      <li className="list-inline-item">
        <FaStar className="text-warning" />
      </li>
      <li className="list-inline-item">
        <FaStar className="text-warning" />
      </li>
      <li className="list-inline-item">
        <FaStar className="text-warning" />
      </li>
    </ul>
  );
};

export default Rating;
