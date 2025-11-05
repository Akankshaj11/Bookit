


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import sampleImg from "../assets/pic.png";

const Details: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [details, setDetails] = useState<any>(null);
  const [dates, setDates] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<{ time: string; slots: number }[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);
  const handleIncrease = () => setQuantity(quantity + 1);
  const isFormComplete = selectedDate && selectedTime;

  useEffect(() => {
    fetch(`http://localhost:5000/api/experiences/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
        setDates(data.availableDates || []);
        setTimeSlots(data.timeSlots || []);
      })
      .catch((err) => console.error("Error fetching details:", err));
  }, [id]);

  const basePrice = details?.price || 999;
  const tax = 50;
  const subtotal = basePrice * quantity;
  const total = subtotal + tax;

  const handleConfirm = async () => {
    if (!isFormComplete) return;
    const bookingData = {
      experienceId: id,
      date: selectedDate,
      time: selectedTime,
      quantity,
      total,
    };

    try {
      await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      navigate("/checkout");
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-12 lg:px-24 py-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <ArrowLeft
          className="w-6 h-6 text-gray-800 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 ml-4">Details</h1>
      </div>

      {/* Main Section */}
      <div className="flex gap-8 flex-col lg:flex-row">
        {/* Left: Image & Info */}
        <div className="flex-2 w-full">
          <img
            src={details?.image || sampleImg}
            alt={details?.title || "Experience"}
            className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[420px] object-cover rounded-lg mb-6"
          />

          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
            {details?.title || "Loading..."}
          </h2>
          <p className="text-gray-700 mb-4 text-sm sm:text-base">
            {details?.description || ""}
          </p>

          {/* Choose Date */}
          <h3 className="text-md font-semibold text-gray-800 mb-2">Choose Date</h3>
          <div className="flex flex-wrap gap-3 mb-6">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-2 rounded-md shadow-md transition-all text-sm sm:text-base ${
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
          <h3 className="text-md font-semibold text-gray-800 mb-2">Choose Time</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                disabled={slot.slots === 0}
                onClick={() => setSelectedTime(slot.time)}
                className={`px-4 py-2 rounded-md shadow-md flex items-center justify-between w-40 sm:w-44 transition-all text-sm sm:text-base ${
                  slot.slots === 0
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : selectedTime === slot.time
                    ? "bg-[#FFD643] text-gray-800 font-semibold"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{slot.time}</span>
                <span
                  className={`text-xs sm:text-sm ${
                    slot.slots === 0 ? "text-white" : "text-red-600"
                  }`}
                >
                  {slot.slots === 0 ? "Sold Out" : `${slot.slots} left`}
                </span>
              </button>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-gray-600 mb-4">
            All times are in IST (GMT +5:30)
          </p>

          {/* About Section */}
          <h3 className="text-md font-semibold text-gray-800 mb-2">About</h3>
          <div className="bg-[#EEEEEE] p-4 rounded-md text-gray-700 text-sm sm:text-base">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </div>
        </div>

        {/* Right: Price Section */}
        <div className="flex-1 bg-[#EFEFEF] p-6 rounded-lg shadow-md h-fit w-full max-lg:mt-6">
          <div className="grid grid-cols-2 gap-y-4 text-gray-800 mb-6 text-sm sm:text-base">
            <span>Starts at</span>
            <span className="font-semibold text-right">₹{basePrice}</span>

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

          <button
            disabled={!isFormComplete}
            onClick={handleConfirm}
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
