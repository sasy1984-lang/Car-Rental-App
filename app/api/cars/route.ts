import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Car from "@/lib/models/car";

// GET all cars
export async function GET() {
  try {
    await connectToDatabase();
    const cars = await Car.find().sort({ createdAt: -1 });
    return NextResponse.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}

// POST - Add new car
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const newCar = new Car({
      name: body.name,
      image: body.image,
      capacity: body.capacity,
      fuelType: body.fuelType,
      rentPerHour: body.rentPerHour,
      bookedTimeSlots: [],
    });

    await newCar.save();
    return NextResponse.json(
      { message: "Car added successfully", car: newCar },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding car:", error);
    return NextResponse.json({ error: "Failed to add car" }, { status: 500 });
  }
}

// PUT - Update car
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const car = await Car.findById(body._id);
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    car.name = body.name;
    car.image = body.image;
    car.fuelType = body.fuelType;
    car.rentPerHour = body.rentPerHour;
    car.capacity = body.capacity;

    await car.save();
    return NextResponse.json({ message: "Car updated successfully", car });
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json(
      { error: "Failed to update car" },
      { status: 500 }
    );
  }
}

// DELETE - Delete car
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const carId = searchParams.get("id");

    if (!carId) {
      return NextResponse.json(
        { error: "Car ID is required" },
        { status: 400 }
      );
    }

    await Car.findByIdAndDelete(carId);
    return NextResponse.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    return NextResponse.json(
      { error: "Failed to delete car" },
      { status: 500 }
    );
  }
}
