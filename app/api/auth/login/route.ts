import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
)

export async function POST(request: Request) {
  try {
    const sql = getDb()
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username e password sono obbligatori" },
        { status: 400 }
      )
    }

    const users = await sql`
      SELECT * FROM users WHERE username = ${username}
    `

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Credenziali non valide" },
        { status: 401 }
      )
    }

    const user = users[0]
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Credenziali non valide" },
        { status: 401 }
      )
    }

    const token = await new SignJWT({ 
      userId: user.id, 
      username: user.username,
      isAdmin: user.is_admin 
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(JWT_SECRET)

    const cookieStore = await cookies()
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.is_admin,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Errore durante il login" },
      { status: 500 }
    )
  }
}
