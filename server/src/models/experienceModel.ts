import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
  title: string;
  description: string;
  price: number;
  image: string;
  location: string;
  availableDates: string[];
  timeSlots: { time: string; slots: number }[];
}

const experienceSchema = new Schema<IExperience>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  availableDates: { type: [String], default: [] },
  timeSlots: [
    {
      time: { type: String },
      slots: { type: Number },
    },
  ],
});

export default mongoose.model<IExperience>("Experience", experienceSchema);
