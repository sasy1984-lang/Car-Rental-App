import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IBooking extends Document {
  car: Types.ObjectId;
  user: Types.ObjectId;
  bookedTimeSlots: {
    from: string;
    to: string;
  };
  totalMins: number;
  totalAmount: number;
  transactionId?: string;
  driverRequired: boolean;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookedTimeSlots: {
      from: { type: String, required: true },
      to: { type: String, required: true },
    },
    totalMins: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    transactionId: { type: String },
    driverRequired: { type: Boolean, default: false },
    address: { type: String },
  },
  { timestamps: true }
);

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
