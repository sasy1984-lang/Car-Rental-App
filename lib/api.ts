const API_BASE = "/api"

export interface Car {
  _id: string
  name: string
  image: string
  capacity: number
  fuelType: string
  bookedTimeSlots: { from: string; to: string }[]
  rentPerHour: number
  createdAt: string
  updatedAt: string
}

export interface User {
  _id: string
  username: string
  email: string
  phone?: string
  admin: boolean
}

export interface Booking {
  _id: string
  car: Car
  user: User
  bookedTimeSlots: { from: string; to: string }
  totalMins: number
  totalAmount: number
  transactionId: string
  driverRequired: boolean
  address?: string
  createdAt: string
}

async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Request failed: ${res.status}`)
  }
  return res.json()
}

export const carsApi = {
  getAll: () => request<Car[]>("/cars/getallcars"),
  add: (car: Omit<Car, "_id" | "bookedTimeSlots" | "createdAt" | "updatedAt">) =>
    request<string>("/cars/addcar", {
      method: "POST",
      body: JSON.stringify(car),
    }),
  edit: (car: Car) =>
    request<string>("/cars/editcar", {
      method: "PUT",
      body: JSON.stringify(car),
    }),
  delete: (carid: string) =>
    request<string>("/cars/deletecar", {
      method: "POST",
      body: JSON.stringify({ carid }),
    }),
}

export const usersApi = {
  login: (email: string, password: string) =>
    request<User>("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (data: {
    username: string
    email: string
    password: string
    phone?: string
  }) =>
    request<string>("/users/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
}

export const bookingsApi = {
  getAll: () => request<Booking[]>("/bookings/getallbookings"),
  book: (data: {
    car: string
    user: string
    bookedTimeSlots: { from: string; to: string }
    totalMins: number
    totalAmount: number
    driverRequired: boolean
    token: { id: string; email: string }
  }) =>
    request<string>("/bookings/bookcar", {
      method: "POST",
      body: JSON.stringify(data),
    }),
}
