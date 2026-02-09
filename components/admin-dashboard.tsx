"use client"

import useSWR, { mutate } from "swr"
import { carsApi, bookingsApi, type Car, type Booking } from "@/lib/api"
import { Spinner } from "@/components/spinner"
import {
  Car as CarIcon,
  CalendarDays,
  Plus,
  Pencil,
  Trash2,
  X,
  AlertCircle,
} from "lucide-react"
import { useState } from "react"

export function AdminDashboard() {
  const [tab, setTab] = useState<"cars" | "bookings">("cars")

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">
        Admin Dashboard
      </h1>

      <div className="mb-6 flex items-center gap-2 border-b border-border">
        <button
          onClick={() => setTab("cars")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
            tab === "cars"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <CarIcon className="h-4 w-4" />
          Manage Cars
        </button>
        <button
          onClick={() => setTab("bookings")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
            tab === "bookings"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <CalendarDays className="h-4 w-4" />
          All Bookings
        </button>
      </div>

      {tab === "cars" ? <CarsManager /> : <BookingsList />}
    </div>
  )
}

function CarsManager() {
  const { data: cars, error, isLoading } = useSWR<Car[]>("cars", carsApi.getAll)
  const [showForm, setShowForm] = useState(false)
  const [editingCar, setEditingCar] = useState<Car | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this car?")) return
    try {
      await carsApi.delete(id)
      mutate("cars")
    } catch {
      alert("Failed to delete car.")
    }
  }

  if (isLoading) return <Spinner />
  if (error)
    return (
      <div className="py-8 text-center text-muted-foreground">
        <AlertCircle className="mx-auto h-8 w-8 text-destructive" />
        <p className="mt-2">Could not load cars.</p>
      </div>
    )

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {cars?.length || 0} cars in fleet
        </p>
        <button
          onClick={() => {
            setEditingCar(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Car
        </button>
      </div>

      {showForm && (
        <CarForm
          car={editingCar}
          onClose={() => {
            setShowForm(false)
            setEditingCar(null)
          }}
        />
      )}

      <div className="flex flex-col gap-3">
        {cars?.map((car) => (
          <div
            key={car._id}
            className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-full w-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{car.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {car.capacity} seats &middot; {car.fuelType} &middot; $
                  {car.rentPerHour}/hr
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingCar(car)
                  setShowForm(true)
                }}
                className="flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(car._id)}
                className="flex items-center gap-1.5 rounded-md bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/20"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CarForm({
  car,
  onClose,
}: {
  car: Car | null
  onClose: () => void
}) {
  const [form, setForm] = useState({
    name: car?.name || "",
    image: car?.image || "",
    capacity: car?.capacity?.toString() || "",
    fuelType: car?.fuelType || "",
    rentPerHour: car?.rentPerHour?.toString() || "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.image || !form.capacity || !form.fuelType || !form.rentPerHour) {
      setError("Please fill in all fields.")
      return
    }
    setLoading(true)
    setError("")
    try {
      if (car) {
        await carsApi.edit({
          ...car,
          name: form.name,
          image: form.image,
          capacity: Number(form.capacity),
          fuelType: form.fuelType,
          rentPerHour: Number(form.rentPerHour),
        })
      } else {
        await carsApi.add({
          name: form.name,
          image: form.image,
          capacity: Number(form.capacity),
          fuelType: form.fuelType,
          rentPerHour: Number(form.rentPerHour),
        })
      }
      mutate("cars")
      onClose()
    } catch {
      setError("Failed to save car.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-6 rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {car ? "Edit Car" : "Add New Car"}
        </h3>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">Name</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">
            Image URL
          </span>
          <input
            type="text"
            value={form.image}
            onChange={(e) => update("image", e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">Capacity</span>
          <input
            type="number"
            value={form.capacity}
            onChange={(e) => update("capacity", e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">
            Fuel Type
          </span>
          <input
            type="text"
            value={form.fuelType}
            onChange={(e) => update("fuelType", e.target.value)}
            placeholder="Petrol, Diesel, Electric..."
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">
            Rent Per Hour ($)
          </span>
          <input
            type="number"
            value={form.rentPerHour}
            onChange={(e) => update("rentPerHour", e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <div className="flex items-end">
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Saving..." : car ? "Update Car" : "Add Car"}
          </button>
        </div>
      </form>
    </div>
  )
}

function BookingsList() {
  const {
    data: bookings,
    error,
    isLoading,
  } = useSWR<Booking[]>("bookings", bookingsApi.getAll)

  if (isLoading) return <Spinner />
  if (error)
    return (
      <div className="py-8 text-center text-muted-foreground">
        <AlertCircle className="mx-auto h-8 w-8 text-destructive" />
        <p className="mt-2">Could not load bookings.</p>
      </div>
    )

  if (!bookings || bookings.length === 0) {
    return (
      <div className="py-16 text-center">
        <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 text-muted-foreground">No bookings yet.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="pb-3 pr-4 font-medium">Car</th>
            <th className="pb-3 pr-4 font-medium">User</th>
            <th className="pb-3 pr-4 font-medium">Period</th>
            <th className="pb-3 pr-4 font-medium">Hours</th>
            <th className="pb-3 font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="border-b border-border last:border-0">
              <td className="py-3 pr-4 font-medium text-foreground">
                {b.car?.name || "N/A"}
              </td>
              <td className="py-3 pr-4 text-muted-foreground">
                {b.user?.username || "N/A"}
              </td>
              <td className="py-3 pr-4 text-muted-foreground">
                {b.bookedTimeSlots?.from} - {b.bookedTimeSlots?.to}
              </td>
              <td className="py-3 pr-4 text-muted-foreground">
                {b.totalMins ? Math.round(b.totalMins / 60) : 0}h
              </td>
              <td className="py-3 font-semibold text-primary">
                ${b.totalAmount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
