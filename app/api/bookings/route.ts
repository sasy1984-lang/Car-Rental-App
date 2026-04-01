import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Booking from "@/lib/models/booking";
import Car from "@/lib/models/car";
import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

// GET all bookings
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    let query = {};
    if (userId) {
      query = { user: userId };
    }

    const bookings = await Booking.find(query)
      .populate("car")
      .populate("user", "-password")
      .sort({ createdAt: -1 });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

// POST - Create booking with Stripe payment
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { token, car, user, bookedTimeSlots, totalMins, totalAmount, driverRequired, address } = body;

    // Create Stripe customer and charge
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalAmount * 100, // Convert to cents
        currency: "eur",
        customer: customer.id,
        receipt_email: token.email,
        description: `Car rental booking - ${car}`,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      // Create booking
      const newBooking = new Booking({
        car,
        user,
        bookedTimeSlots,
        totalMins,
        totalAmount,
        transactionId: payment.id,
        driverRequired,
        address,
      });

      await newBooking.save();

      // Update car with booked time slots
      const carDoc = await Car.findById(car);
      if (carDoc) {
        carDoc.bookedTimeSlots.push(bookedTimeSlots);
        await carDoc.save();
      }

      return NextResponse.json(
        { message: "Booking successful", booking: newBooking },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: "Payment failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
