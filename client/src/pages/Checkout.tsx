

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
    const navigate = useNavigate();

    // State variables
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
            const discountAmount = totalBeforeDiscount * 0.1; // 10% off
            setDiscount(discountAmount);
            setApplied(true);
        } else {
            alert("Invalid Promo Code");
        }
    };

    const handleConfirm = async () => {
  try {
    console.log("Processing payment...");

    // Simulate delay (optional)
    await new Promise((res) => setTimeout(res, 1000));

    // ✅ Create booking data (no undefined variables now)
    const bookingData = {
      refId: "REF-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      experience: "Kayaking",
      date: "2025-10-22",
      time: "09:00 AM",
      total: discountedTotal.toFixed(0),
    };

    // Store booking data
    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    // Navigate to result page
    navigate("/result");
  } catch (error) {
    console.error("Payment failed:", error);
  }
};



    return (
        <div className="min-h-screen px-[124px] py-10">
            {/* Header */}
            <div className="flex items-center mb-8">
                <ArrowLeft
                    className="w-6 h-6 text-gray-800 cursor-pointer"
                    onClick={() => navigate(-1)}
                />
                <h1 className="text-lg font-semibold text-gray-800 ml-4">Checkout</h1>
            </div>

            {/* Content Area */}
            <div className="flex justify-between">
                {/* Left Section */}

                <div
                    className={`bg-[#EFEFEF] rounded-lg w-[850px] overflow-y-auto p-8 flex flex-col gap-6 transition-all duration-200 ${applied ? "h-[300px]" : "h-[270px]"
                        }`}
                >


                    {/* First Name & Email */}
                    <div className="flex gap-6">
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-2">First Name</label>
                            <input
                                type="text"
                                placeholder="Enter your first name"
                                className="w-full rounded-md px-4 py-2 shadow-md bg-[#DDDDDD]"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full shadow-md bg-[#DDDDDD] rounded-md px-4 py-2"
                            />
                        </div>
                    </div>

                    {/* Promo Code */}
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-1 shadow-md bg-[#DDDDDD] rounded-md px-4 py-2"
                        />
                        <button
                            onClick={handleApplyPromo}
                            disabled={applied}
                            className={`ml-3 px-5 py-2 rounded-md font-semibold ${applied
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
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="mr-3 w-5 h-5"
                        />
                        <p className="text-gray-700">
                            I agree to the{" "}
                            <span className="underline cursor-pointer">
                                terms and safety policy
                            </span>
                            .
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="bg-[#EFEFEF] rounded-lg w-[387px] p-6 text-gray-800 flex flex-col justify-between transition-all duration-300">
                    <div className="grid grid-cols-2 gap-y-3">
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
                        <div className="col-span-2">
  <hr className="border-t border-gray-400 my-2" />
</div>

                        {applied && (
                            <>
                                <span>Discount</span>
                                <span className="text-green-600">-₹{discount.toFixed(0)}</span>
                            </>
                        )}

                        <span className="font-semibold">Total</span>
                        <span className="font-semibold text-lg text-right">
                            ₹{discountedTotal.toFixed(0)}
                        </span>
                    </div>

                    <button
                    onClick={handleConfirm}
                        disabled={!agreed}
                        className={`mt-6 w-full py-3 rounded-md font-semibold ${agreed
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
