"use client"

import useSWR from "swr"
import { carsApi, type Car } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { FullPageSpinner } from "@/components/spinner"
import {
  Users,
  Fuel,
  DollarSign,
  Calendar,
  Clock,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function BookingForm({ carId }: { carId: string }) {
  const { user } = useAuth()
  const router = useRouter()
  const {
    data: cars,
    error,
    isLoading,
  } = useSWR<Car[]>("cars", carsApi.getAll)

  const car = useMemo(() => cars?.find((c) => c._id === carId), [cars, carId])

  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [driverRequired, setDriverRequired] = useState(false)
  const [bookingStatus, setBookingStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const totalHours = useMemo(() => {
    if (!from || !to) return 0
    const diff =
      (new Date(to).getTime() - new Date(from).getTime()) / (1000 * 60 * 60)
    return Math.max(0, Math.ceil(diff))
  }, [from, to])

  const totalAmount = useMemo(() => {
    if (!car) return 0
    let amount = totalHours * car.rentPerHour
    if (driverRequired) amount += totalHours * 30
    return amount
  }, [totalHours, car, driverRequired])

  const handleBook = async () => {
    if (!user) {
      router.push("/login")
      return
    }
    if (!from || !to || totalHours <= 0) {
      setErrorMsg("Please select valid dates.")
      return
    }
    setBookingStatus("loading")
    setErrorMsg("")

    try {
      // Since Stripe test key may not work, we simulate booking for demo
      const res = await fetch("/api/bookings/bookcar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          car: carId,
          user: user._id,
          bookedTimeSlots: { from, to },
          totalMins: totalHours * 60,
          totalAmount,
          driverRequired,
          token: { id: "demo_token", email: user.email },
        }),
      })
      if (res.ok) {
        setBookingStatus("success")
      } else {
        setBookingStatus("error")
        setErrorMsg(
          "Booking failed. The payment gateway may not be configured."
        )
      }
    } catch {
      setBookingStatus("error")
      setErrorMsg("Could not connect to the server.")
    }
  }

  if (isLoading) return <FullPageSpinner />

  if (error || !car) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Car not found
        </h2>
        <p className="mt-2 text-muted-foreground">
          This car may have been removed or the server is unavailable.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cars
        </Link>
      </div>
    )
  }

  if (bookingStatus === "success") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />
        <h2 className="mt-4 text-2xl font-bold text-foreground">
          Booking Confirmed
        </h2>
        <p className="mt-2 text-muted-foreground">
          Your rental of {car.name} has been booked successfully.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            href="/bookings"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            View My Bookings
          </Link>
          <Link
            href="/"
            className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground"
          >
            Browse Cars
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Cars
      </Link>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Car details */}
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="aspect-[16/10] bg-muted">
              <img
                src={car.image}
                alt={car.name}
                className="h-full w-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
            <div className="flex flex-col gap-4 p-6">
              <h1 className="text-2xl font-bold text-foreground">{car.name}</h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {car.capacity} seats
                </span>
                <span className="flex items-center gap-1.5">
                  <Fuel className="h-4 w-4" />
                  {car.fuelType}
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-primary">
                  <DollarSign className="h-4 w-4" />
                  {car.rentPerHour}/hr
                </span>
              </div>

              {car.bookedTimeSlots.length > 0 && (
                <div className="mt-2">
                  <h3 className="mb-2 text-sm font-medium text-foreground">
                    Already Booked Slots
                  </h3>
                  <div className="flex flex-col gap-1">
                    {car.bookedTimeSlots.map((slot, i) => (
                      <div
                        key={i}
                        className="rounded-md bg-destructive/10 px-3 py-1.5 text-xs text-destructive"
                      >
                        {slot.from} - {slot.to}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking sidebar */}
        <div className="lg:col-span-2">
          <div className="sticky top-20 rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Book This Car
            </h2>

            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  From
                </span>
                <input
                  type="datetime-local"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  To
                </span>
                <input
                  type="datetime-local"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </label>

              <label className="flex items-center gap-3 rounded-lg border border-input bg-background px-3 py-2.5">
                <input
                  type="checkbox"
                  checked={driverRequired}
                  onChange={(e) => setDriverRequired(e.target.checked)}
                  className="h-4 w-4 rounded border-input accent-primary"
                />
                <span className="text-sm text-foreground">
                  Driver required (+$30/hr)
                </span>
              </label>

              {totalHours > 0 && (
                <div className="rounded-lg bg-secondary p-4">
                  <div className="flex items-center justify-between text-sm text-secondary-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      Duration
                    </span>
                    <span className="font-medium">{totalHours} hours</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                    <span className="text-sm font-medium text-foreground">
                      Total
                    </span>
                    <span className="text-xl font-bold text-primary">
                      ${totalAmount}
                    </span>
                  </div>
                </div>
              )}

              {errorMsg && (
                <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {errorMsg}
                </p>
              )}

              <button
                onClick={handleBook}
                disabled={bookingStatus === "loading" || totalHours <= 0}
                className="mt-2 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bookingStatus === "loading"
                  ? "Processing..."
                  : !user
                    ? "Login to Book"
                    : "Book Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
