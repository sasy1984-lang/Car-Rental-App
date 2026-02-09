"use client"

import useSWR from "swr"
import { bookingsApi, type Booking } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { FullPageSpinner } from "@/components/spinner"
import {
  CalendarDays,
  Clock,
  DollarSign,
  Car,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function BookingsPage() {
  const { user, isLoading: authLoading } = useAuth()
  const {
    data: allBookings,
    error,
    isLoading,
  } = useSWR<Booking[]>(user ? "bookings" : null, bookingsApi.getAll)

  if (authLoading || isLoading) return <FullPageSpinner />

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h2 className="text-xl font-semibold text-foreground">
          Sign in to view your bookings
        </h2>
        <Link
          href="/login"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Sign In
        </Link>
      </div>
    )
  }

  const bookings = allBookings?.filter((b) => b.user?._id === user._id) || []

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">My Bookings</h1>

      {error ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <p className="text-muted-foreground">Could not load bookings.</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <CalendarDays className="h-12 w-12 text-muted-foreground" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              No bookings yet
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse our cars and make your first booking.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Browse Cars
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                {booking.car?.image && (
                  <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={booking.car.image}
                      alt={booking.car?.name || "Car"}
                      className="h-full w-full object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Car className="h-4 w-4 text-primary" />
                    {booking.car?.name || "Unknown Car"}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {booking.bookedTimeSlots?.from} - {booking.bookedTimeSlots?.to}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {booking.totalMins ? Math.round(booking.totalMins / 60) : 0}h
                </span>
                <span className="flex items-center gap-1 font-semibold text-primary">
                  <DollarSign className="h-4 w-4" />
                  {booking.totalAmount}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
