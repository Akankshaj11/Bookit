

import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  description: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ id, title, location, price, description, image }) => {
  // Limit description length
  const maxChars = 75;
  const isLong = description.length > maxChars;
  const shortDesc = isLong ? description.slice(0, maxChars) + "..." : description;

  // Smart location trimming — only keep first part (city name)
  const formattedLocation = location.includes(",")
    ? location.split(",")[0].trim()
    : location.includes(" ")
    ? location.split(" ")[0].trim()
    : location;

  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full transition-transform transform hover:scale-[1.02]">
      {/* Image */}
      <div className="h-44 w-full">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="bg-[#F0F0F0] p-4 flex flex-col justify-between flex-1 rounded-b-xl">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-sm md:text-base font-semibold text-gray-800 truncate">
              {title}
            </h2>
            <span className="text-xs md:text-sm bg-[#D6D6D6] text-gray-800 px-2 py-0.5 rounded-md whitespace-nowrap overflow-hidden text-ellipsis">
              {formattedLocation}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 mt-2">
            {shortDesc}{" "}
            {isLong && (
              <Link to={`/details/${id}`} className="text-blue-600 hover:underline text-xs font-medium">
                More
              </Link>
            )}
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between mt-3">
          <p className="text-sm text-[#6C6C6C]">
            <span className="text-xs">From </span>
            <span className="text-gray-900 font-semibold">Rs {price}</span>
          </p>
          <Link to={`/details/${id}`}>
            <button className="bg-[#FFD643] text-gray-800 cursor-pointer font-medium text-xs md:text-sm px-3 py-1 rounded-md hover:bg-yellow-400 transition-all">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
