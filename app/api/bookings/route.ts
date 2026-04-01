import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { jwtVerify } from "jose"
import { cookies } from "next/headers"
import Stripe from "stripe"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
)

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null

async function getUserFromToken() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")?.value
  
  if (!token) return null
  
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as { userId: number; username: string; isAdmin: boolean }
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const user = await getUserFromToken()
    
    if (!user) {
      return NextResponse.json(
        { error: "Non autenticato" },
        { status: 401 }
      )
    }

    let bookings
    if (user.isAdmin) {
      bookings = await sql`
        SELECT b.*, c.name as car_name, c.image as car_image, u.username
        FROM bookings b
        JOIN cars c ON b.car_id = c.id
        JOIN users u ON b.user_id = u.id
        ORDER BY b.created_at DESC
      `
    } else {
      bookings = await sql`
        SELECT b.*, c.name as car_name, c.image as car_image
        FROM bookings b
        JOIN cars c ON b.car_id = c.id
        WHERE b.user_id = ${user.userId}
        ORDER BY b.created_at DESC
      `
    }

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json(
      { error: "Errore nel recupero delle prenotazioni" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUserFromToken()
    
    if (!user) {
      return NextResponse.json(
        { error: "Non autenticato" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { carId, bookedTimeSlots, totalHours, totalAmount, driverRequired, token: stripeToken } = body

    if (!carId || !bookedTimeSlots || !totalHours || !totalAmount) {
      return NextResponse.json(
        { error: "Dati mancanti per la prenotazione" },
        { status: 400 }
      )
    }

    // Process Stripe payment if token provided and Stripe is configured
    let transactionId = null
    if (stripeToken && stripe) {
      try {
        const charge = await stripe.charges.create({
          amount: Math.round(totalAmount * 100),
          currency: "eur",
          source: stripeToken,
          description: `Noleggio auto - ${totalHours} ore`,
        })
        transactionId = charge.id
      } catch (stripeError) {
        console.error("Stripe error:", stripeError)
        return NextResponse.json(
          { error: "Errore nel pagamento" },
          { status: 400 }
        )
      }
    } else {
      // Demo mode - generate a fake transaction ID
      transactionId = `demo_${Date.now()}`
    }

    // Create booking
    const result = await sql`
      INSERT INTO bookings (car_id, user_id, booked_time_slots, total_hours, total_amount, transaction_id, driver_required)
      VALUES (${carId}, ${user.userId}, ${JSON.stringify(bookedTimeSlots)}, ${totalHours}, ${totalAmount}, ${transactionId}, ${driverRequired || false})
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json(
      { error: "Errore nella creazione della prenotazione" },
      { status: 500 }
    )
  }
}
