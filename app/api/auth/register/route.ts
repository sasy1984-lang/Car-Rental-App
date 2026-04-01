import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import bcrypt from "bcryptjs"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const sql = getDb()
    const body = await request.json()
    const { username, email, password } = body

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Tutti i campi sono obbligatori" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUsers = await sql`
      SELECT * FROM users WHERE username = ${username} OR email = ${email}
    `

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "Username o email già in uso" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const result = await sql`
      INSERT INTO users (username, email, password)
      VALUES (${username}, ${email}, ${hashedPassword})
      RETURNING id, username, email, is_admin
    `

    return NextResponse.json({
      message: "Registrazione completata con successo",
      user: {
        id: result[0].id,
        username: result[0].username,
        email: result[0].email,
        isAdmin: result[0].is_admin,
      },
    }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Errore durante la registrazione" },
      { status: 500 }
    )
  }
}
