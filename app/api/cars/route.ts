import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const sql = getDb()
    const cars = await sql`SELECT * FROM cars ORDER BY created_at DESC`
    return NextResponse.json(cars)
  } catch (error) {
    console.error("Error fetching cars:", error)
    return NextResponse.json(
      { error: "Errore nel recupero delle auto" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const sql = getDb()
    const body = await request.json()
    const { name, image, rent_per_hour, capacity, fuel_type } = body

    if (!name || !rent_per_hour || !capacity || !fuel_type) {
      return NextResponse.json(
        { error: "Tutti i campi sono obbligatori" },
        { status: 400 }
      )
    }

    const result = await sql`
      INSERT INTO cars (name, image, rent_per_hour, capacity, fuel_type)
      VALUES (${name}, ${image || null}, ${rent_per_hour}, ${capacity}, ${fuel_type})
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating car:", error)
    return NextResponse.json(
      { error: "Errore nella creazione dell'auto" },
      { status: 500 }
    )
  }
}
