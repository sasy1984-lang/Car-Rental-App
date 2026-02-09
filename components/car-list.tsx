"use client"

import useSWR from "swr"
import { carsApi, type Car } from "@/lib/api"
import { CarCard } from "@/components/car-card"
import { Spinner } from "@/components/spinner"
import { Search, AlertCircle } from "lucide-react"
import { useState, useMemo } from "react"

export function CarList() {
  const { data: cars, error, isLoading } = useSWR<Car[]>("cars", carsApi.getAll)
  const [search, setSearch] = useState("")
  const [fuelFilter, setFuelFilter] = useState("all")

  const fuelTypes = useMemo(() => {
    if (!cars) return []
    const types = new Set(cars.map((c) => c.fuelType))
    return Array.from(types)
  }, [cars])

  const filtered = useMemo(() => {
    if (!cars) return []
    return cars.filter((car) => {
      const matchSearch = car.name.toLowerCase().includes(search.toLowerCase())
      const matchFuel = fuelFilter === "all" || car.fuelType === fuelFilter
      return matchSearch && matchFuel
    })
  }, [cars, search, fuelFilter])

  if (isLoading) return <Spinner />

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Unable to load cars
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Make sure the backend server is running on port 8000.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search cars..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFuelFilter("all")}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              fuelFilter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            All
          </button>
          {fuelTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFuelFilter(type)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                fuelFilter === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">No cars found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  )
}
