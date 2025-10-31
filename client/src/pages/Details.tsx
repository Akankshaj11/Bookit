

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import sampleImg from "../assets/pic.png";

const Details: React.FC = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const isFormComplete = selectedDate && selectedTime;

  const basePrice = 999;
  const tax = 50;
  const subtotal = basePrice * quantity;
  const total = subtotal + tax;

  const dates = ["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"];
  const timeSlots = [
    { time: "07:00 AM", slots: 4 },
    { time: "09:00 AM", slots: 0 },
    { time: "11:00 AM", slots: 2 },
    { time: "01:00 PM", slots: 0 },
  ];

  return (
    <div className="min-h-screen px-[124px] py-10 max-lg:px-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <ArrowLeft
          className="w-6 h-6 text-gray-800 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-lg font-semibold text-gray-800 ml-4">Details</h1>
      </div>

      {/* Main Section */}
      <div className="flex gap-8 max-lg:flex-col">
        {/* Left: Image & Info */}
        <div className="w-[765px] max-lg:w-full">
          <img
            src={sampleImg}
            alt="Place"
            className="w-[765px] h-[381px] object-cover rounded-lg mb-6 max-lg:w-full"
          />

          {/* Title & Description */}
          <h2 className="text-xl font-bold text-gray-800 mb-2">Malpe Beach</h2>
          <p className="text-gray-700 mb-4">
            A serene beach with golden sands and calm waters. Perfect for family
            outings and relaxation.
          </p>

          {/* Choose Date */}
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            Choose Date
          </h3>
          <div className="flex gap-3 mb-6 flex-wrap">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-2 rounded-md shadow-md transition-all ${
                  selectedDate === date
                    ? "bg-[#FFD643] text-gray-800 font-semibold"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {date}
              </button>
            ))}
          </div>

          {/* Choose Time */}
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            Choose Time
          </h3>
          <div className="flex gap-3 mb-4 flex-wrap">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                disabled={slot.slots === 0}
                onClick={() => setSelectedTime(slot.time)}
                className={`px-4 py-2 rounded-md shadow-md flex items-center justify-between w-44 transition-all ${
                  slot.slots === 0
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : selectedTime === slot.time
                    ? "bg-[#FFD643] text-gray-800 font-semibold"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{slot.time}</span>
                <span
                  className={`text-sm ${
                    slot.slots === 0 ? "text-white" : "text-red-600"
                  }`}
                >
                  {slot.slots === 0 ? "Sold Out" : `${slot.slots} left`}
                </span>
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-600 mb-4">
            All times are in IST (GMT +5:30)
          </p>

          {/* About Section */}
          <h3 className="text-md font-semibold text-gray-800 mb-2">About</h3>
          <div className="bg-[#EEEEEE] p-4 rounded-md text-gray-700">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </div>
        </div>

        {/* Right: Price Section */}
        <div className="flex-1 bg-[#EFEFEF] p-6 rounded-lg shadow-md h-fit">
          <div className="grid grid-cols-2 gap-y-4 text-gray-800 mb-6">
            <span>Starts at</span>
            <span className="font-semibold text-right">₹999</span>

            <span>Quantity</span>
            <div className="flex justify-end items-center">
              <button
                onClick={handleDecrease}
                className="px-3 py-1 border border-gray-400 rounded-l hover:bg-gray-200"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b border-gray-400">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="px-3 py-1 border border-gray-400 rounded-r hover:bg-gray-200"
              >
                +
              </button>
            </div>

            <span>Subtotal</span>
            <span className="text-right">₹{subtotal}</span>

            <span>Taxes</span>
            <span className="text-right">₹{tax}</span>

            <div className="col-span-2">
  <hr className="border-t border-gray-400 my-2" />
</div>
            

            <span className="font-semibold">Total</span>
            <span className="font-semibold text-lg text-right">₹{total}</span>
          </div>

          {/* Confirm Button */}
          <button
            disabled={!isFormComplete}
            onClick={() => {
              if (isFormComplete) navigate("/checkout");
            }}
            className={`w-full py-3 rounded-md font-semibold transition-all ${
              isFormComplete
                ? "bg-[#FFD643] text-gray-800 hover:bg-yellow-400"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
