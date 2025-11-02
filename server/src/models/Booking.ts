// import mongoose, { Document, Schema } from "mongoose";

// export interface IBooking extends Document {
//   userName: string;
//   userEmail: string;
//   experienceTitle: string;
//   date: string;
//   timeSlot: string;
//   price: number;
//   paymentStatus: string;
// }

// const bookingSchema = new Schema<IBooking>({
//   userName: { type: String, required: true },
//   userEmail: { type: String, required: true },
//   experienceTitle: { type: String, required: true },
//   date: { type: String, required: true },
//   timeSlot: { type: String, required: true },
//   price: { type: Number, required: true },
//   paymentStatus: { type: String, default: "Pending" },
// });

// export default mongoose.model<IBooking>("Booking", bookingSchema);



import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  experienceId: mongoose.Types.ObjectId;
  userName: string;
  email: string;
  date: string;
  time: string;
  totalAmount: number;
}

const bookingSchema = new Schema<IBooking>({
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  totalAmount: { type: Number, required: true },
});

export default mongoose.model<IBooking>("Booking", bookingSchema);
