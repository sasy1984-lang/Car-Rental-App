"use client";

import Image from "next/image";
import Link from "next/link";

interface Car {
  id: number;
  name: string;
  image: string;
  capacity: number;
  fuel_type: string;
  rent_per_hour: number;
}

export function CarCard({ car }: { car: Car }) {
  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-card-foreground">{car.name}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {car.capacity} posti
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {car.fuel_type}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-accent">{"\u20AC"}{car.rent_per_hour}</span>
            <span className="text-sm text-muted-foreground">/ora</span>
          </div>
          <Link
            href={`/booking/${car.id}`}
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Prenota
          </Link>
        </div>
      </div>
    </div>
  );
}
