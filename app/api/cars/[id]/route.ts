import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const sql = getDb()
    const { id } = await params
    const cars = await sql`SELECT * FROM cars WHERE id = ${parseInt(id)}`

    if (cars.length === 0) {
      return NextResponse.json(
        { error: "Auto non trovata" },
        { status: 404 }
      )
    }

    return NextResponse.json(cars[0])
  } catch (error) {
    console.error("Error fetching car:", error)
    return NextResponse.json(
      { error: "Errore nel recupero dell'auto" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const sql = getDb()
    const { id } = await params
    const body = await request.json()
    const { name, image, rent_per_hour, capacity, fuel_type } = body

    const result = await sql`
      UPDATE cars 
      SET name = ${name}, image = ${image}, rent_per_hour = ${rent_per_hour}, 
          capacity = ${capacity}, fuel_type = ${fuel_type}
      WHERE id = ${parseInt(id)}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Auto non trovata" },
        { status: 404 }
      )
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating car:", error)
    return NextResponse.json(
      { error: "Errore nell'aggiornamento dell'auto" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const sql = getDb()
    const { id } = await params
    const result = await sql`DELETE FROM cars WHERE id = ${parseInt(id)} RETURNING *`

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Auto non trovata" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Auto eliminata con successo" })
  } catch (error) {
    console.error("Error deleting car:", error)
    return NextResponse.json(
      { error: "Errore nell'eliminazione dell'auto" },
      { status: 500 }
    )
  }
}
