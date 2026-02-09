"use client"

import { CarList } from "@/components/car-list"
import { Car } from "lucide-react"

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Hero */}
      <section className="mb-10 rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12 sm:py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
          <Car className="h-12 w-12" />
          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Find Your Perfect Rental Car
          </h1>
          <p className="text-lg leading-relaxed opacity-90">
            Browse our fleet, pick your dates, and book in minutes. Flexible
            cancellation and competitive prices.
          </p>
        </div>
      </section>

      {/* Car listing */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Available Cars
        </h2>
        <CarList />
      </section>
    </div>
  )
}
