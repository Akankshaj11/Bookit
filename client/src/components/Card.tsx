import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  id: string; // 👈 add id so we can link to details page
  title: string;
  location: string;
  price: string;
  description: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ id, title, location, price, description, image }) => {
  return (
    <div className="w-[290px] h-[312px] bg-white rounded-[12px] shadow-md overflow-hidden mb-4">
      {/* Upper Image Section */}
      <div className="h-[170px] w-full">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Lower Section */}
      <div className="bg-[#F0F0F0] px-3 pt-3 pb-5 flex flex-col justify-between rounded-b-[12px] h-[142px]">
        {/* Title and Location */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <span className="text-sm bg-[#D6D6D6] text-gray-800 px-2 py-[2px] rounded-[4px]">
            {location}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mt-1 leading-tight">{description}</p>

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-[#6C6C6C]">
            <span className="text-xs">From </span>
            <span className="text-gray-900 font-semibold">Rs {price}</span>
          </p>
          {/* Link to Details Page */}
          <Link to={`/details/${id}`}>
            <button className="bg-[#FFD643] text-gray-800 font-medium text-sm px-3 py-1 rounded-[4px] hover:bg-yellow-400 transition-all">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
