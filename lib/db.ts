import { neon } from '@neondatabase/serverless'

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  return neon(process.env.DATABASE_URL)
}

// Type definitions
export interface User {
  id: number
  username: string
  email: string
  password: string
  is_admin: boolean
  created_at: Date
}

export interface Car {
  id: number
  name: string
  image: string
  rent_per_hour: number
  capacity: number
  fuel_type: string
  created_at: Date
}

export interface Booking {
  id: number
  user_id: number
  car_id: number
  booked_time_slots: {
    from: string
    to: string
  }
  total_hours: number
  total_amount: number
  transaction_id: string | null
  driver_required: boolean
  created_at: Date
}
