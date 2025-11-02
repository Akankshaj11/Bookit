// import express, { Request, Response } from "express";
// import Booking from "../models/Booking";
// import Experience from "../models/experienceModel";

// const router = express.Router();

// interface BookingRequestBody {
//   userName: string;
//   userEmail: string;
//   experience: string;
//   date: string;
//   time: string;
//   total: number;
// }

// router.post("/", async (req: Request<{}, {}, BookingRequestBody>, res: Response) => {
//   try {
//     const { userName, userEmail, experience, date, time, total } = req.body;

//     if (!userName || !userEmail || !experience || !date || !time || !total) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // ✅ Optional: Verify if the experience exists
//     const exp = await Experience.findOne({ title: experience });
//     if (!exp) {
//       return res.status(404).json({ message: "Experience not found" });
//     }

//     // ✅ Create a new booking
//     const newBooking = new Booking({
//       userName,
//       userEmail,
//       experienceTitle: experience,
//       date,
//       timeSlot: time,
//       price: total,
//       paymentStatus: "Paid",
//     });

//     await newBooking.save();

//     res.status(201).json({
//       message: "Booking successful",
//       booking: newBooking,
//     });
//   } catch (error: any) {
//     console.error("Booking Error:", error);
//     res.status(500).json({ message: error.message || "Server error" });
//   }
// });

// export default router;




import express, { Request, Response } from "express";
import Booking from "../models/Booking";
import Experience from "../models/experienceModel";

const router = express.Router();

// ✅ Create new booking
router.post("/", async (req: Request, res: Response) => {
  try {
    const { experienceId, userName, email, date, time, totalAmount } = req.body;

    if (!experienceId || !userName || !email || !date || !time || !totalAmount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🧠 Check if the experience exists in MongoDB
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    const newBooking = new Booking({
      experienceId,
      userName,
      email,
      date,
      time,
      totalAmount,
    });

    await newBooking.save();

    return res.status(201).json({
      message: "Booking successful",
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating booking" });
  }
});

// ✅ Optional: get all bookings
router.get("/", async (_req: Request, res: Response) => {
  const bookings = await Booking.find().populate("experienceId");
  res.json(bookings);
});

export default router;
