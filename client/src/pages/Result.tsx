import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Result: React.FC = () => {
  const [bookingData, setBookingData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("bookingData");
    if (data) {
      setBookingData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      {/* Green Circle with Tick */}
      <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center mb-6">
        <Check className="w-10 h-10 text-white" />
      </div>

      {/* Success Text */}
      <h1 className="text-2xl font-semibold mb-2">Booking Confirmed</h1>

      {/* Ref ID */}
      {bookingData && (
        <p className="text-gray-600 mb-8">
          Ref ID: <span className="font-semibold">{bookingData.refId}</span>
        </p>
      )}

      {/* Back Home Button */}
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-[#FFD643] rounded-md font-semibold text-gray-800 hover:bg-yellow-400"
      >
        Back Home
      </button>
    </div>
  );
};

export default Result;
