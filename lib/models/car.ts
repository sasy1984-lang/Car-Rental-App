import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITimeSlot {
  from: string;
  to: string;
}

export interface ICar extends Document {
  name: string;
  image: string;
  capacity: number;
  fuelType: string;
  bookedTimeSlots: ITimeSlot[];
  rentPerHour: number;
  createdAt: Date;
  updatedAt: Date;
}

const TimeSlotSchema = new Schema<ITimeSlot>(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
  { _id: false }
);

const CarSchema = new Schema<ICar>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    capacity: { type: Number, required: true },
    fuelType: { type: String, required: true },
    bookedTimeSlots: [TimeSlotSchema],
    rentPerHour: { type: Number, required: true },
  },
  { timestamps: true }
);

const Car: Model<ICar> =
  mongoose.models.Car || mongoose.model<ICar>("Car", CarSchema);

export default Car;
