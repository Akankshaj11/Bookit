


import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [agreed, setAgreed] = useState(false);

  // Price details
  const subtotal = 999;
  const tax = 59;
  const totalBeforeDiscount = subtotal + tax;
  const discountedTotal = totalBeforeDiscount - discount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "DISCOUNT10") {
      const discountAmount = totalBeforeDiscount * 0.1;
      setDiscount(discountAmount);
      setApplied(true);
    } else {
      alert("Invalid Promo Code");
    }
  };

  const handleConfirm = async () => {
    if (!agreed) return alert("Please agree to terms and safety policy");

    try {
      const userNameInput = document.querySelector<HTMLInputElement>(
        'input[placeholder="Enter your first name"]'
      );
      const userEmailInput = document.querySelector<HTMLInputElement>(
        'input[placeholder="Enter your email"]'
      );

      const bookingData = {
        userName: userNameInput?.value || "",
        userEmail: userEmailInput?.value || "",
        experience: "Kayaking",
        date: "2025-10-22",
        time: "09:00 AM",
        total: discountedTotal,
      };

      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("✅ Booking Success:", result);
        navigate("/result");
      } else {
        alert(result.message || "Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong while confirming booking");
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-12 lg:px-24 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <ArrowLeft
          className="w-6 h-6 text-gray-800 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 ml-4">
          Checkout
        </h1>
      </div>

      {/* Content Area */}
      {/* <div className="flex flex-col lg:flex-row gap-8 justify-between"> */}
      <div className="flex flex-col lg:flex-row justify-center lg:gap-2 xl:gap-8">

        {/* Left Section */}
        <div
          className={`bg-[#EFEFEF] rounded-lg w-full lg:w-[850px] overflow-y-auto p-6 sm:p-8 flex flex-col gap-6 transition-all duration-200 ${
            applied ? "h-75" : "h-65"
          }`}
        >
          {/* First Name & Email */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-gray-700 mb-2 text-sm sm:text-base">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded-md px-4 py-2 shadow-md bg-[#DDDDDD] text-sm sm:text-base"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-2 text-sm sm:text-base">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full shadow-md bg-[#DDDDDD] rounded-md px-4 py-2 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Promo Code */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 shadow-md bg-[#DDDDDD] rounded-md px-4 py-2 text-sm sm:text-base"
            />
            <button
              onClick={handleApplyPromo}
              disabled={applied}
              className={`mt-3 sm:mt-0 sm:ml-3 px-5 py-2 rounded-md font-semibold text-sm sm:text-base ${
                applied
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {applied ? "Applied" : "Apply"}
            </button>
          </div>

          {/* Promo Message */}
          {applied && (
            <p className="text-green-600 text-sm -mt-2">
              ✅ Promo Applied! 10% discount applied.
            </p>
          )}

          {/* Checkbox */}
          <div className="flex items-start sm:items-center mt-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mr-3 w-5 h-5 mt-1 sm:mt-0"
            />
            <p className="text-gray-700 text-sm sm:text-base">
              I agree to the{" "}
              <span className="underline cursor-pointer">
                terms and safety policy
              </span>
              .
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-[#EFEFEF] rounded-lg w-full lg:w-[380px] p-6 text-gray-800 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-y-3 text-sm sm:text-base">
            <span>Experience</span>
            <span className="font-semibold text-right">Kayaking</span>

            <span>Date</span>
            <span className="font-semibold text-right">2025-10-22</span>

            <span>Time</span>
            <span className="font-semibold text-right">09:00 AM</span>

            <span>Subtotal</span>
            <span className="text-right">₹{subtotal}</span>

            <span>Taxes</span>
            <span className="text-right">₹{tax}</span>


            {applied && (
              <>
                <span>Discount</span>
                <span className="text-green-600 text-right">
                  -₹{discount.toFixed(0)}
                </span>
              </>
            )}
            <div className="col-span-2">
              <hr className="border-t border-gray-400 my-2" />
            </div>

            <span className="font-semibold">Total</span>
            <span className="font-semibold text-lg text-right">
              ₹{discountedTotal.toFixed(0)}
            </span>
          </div>

          <button
            onClick={handleConfirm}
            disabled={!agreed}
            className={`mt-6 w-full py-3 rounded-md font-semibold text-sm sm:text-base ${
              agreed
                ? "bg-[#FFD643] text-gray-800 hover:bg-yellow-400"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            Pay and Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
