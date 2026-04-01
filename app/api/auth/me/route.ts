import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { jwtVerify } from "jose"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
)

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ user: null })
    }

    const { payload } = await jwtVerify(token, JWT_SECRET)
    const userId = payload.userId as number

    const sql = getDb()
    const users = await sql`
      SELECT id, username, email, is_admin FROM users WHERE id = ${userId}
    `

    if (users.length === 0) {
      return NextResponse.json({ user: null })
    }

    const user = users[0]
    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.is_admin,
      },
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ user: null })
  }
}
