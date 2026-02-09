"use client"

import Link from "next/link"
import type { Car } from "@/lib/api"
import { Users, Fuel, DollarSign } from "lucide-react"

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      href={`/booking/${car._id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={car.image}
          alt={car.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          crossOrigin="anonymous"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-lg font-semibold text-foreground text-balance">
          {car.name}
        </h3>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            {car.capacity} seats
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel className="h-4 w-4" />
            {car.fuelType}
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
          <span className="flex items-center gap-1 text-lg font-bold text-primary">
            <DollarSign className="h-4 w-4" />
            {car.rentPerHour}
            <span className="text-sm font-normal text-muted-foreground">
              /hr
            </span>
          </span>
          <span className="rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Book Now
          </span>
        </div>
      </div>
    </Link>
  )
}
