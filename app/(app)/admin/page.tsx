"use client"

import { useAuth } from "@/lib/auth-context"
import { FullPageSpinner } from "@/components/spinner"
import { AdminDashboard } from "@/components/admin-dashboard"
import { ShieldAlert } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <FullPageSpinner />

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <ShieldAlert className="h-12 w-12 text-destructive" />
        <h2 className="text-xl font-semibold text-foreground">
          Access Denied
        </h2>
        <p className="text-muted-foreground">
          You need to sign in to access the admin dashboard.
        </p>
        <Link
          href="/login"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Sign In
        </Link>
      </div>
    )
  }

  if (!user.admin) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <ShieldAlert className="h-12 w-12 text-destructive" />
        <h2 className="text-xl font-semibold text-foreground">
          Admin Only
        </h2>
        <p className="text-muted-foreground">
          You do not have admin privileges.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground"
        >
          Go Home
        </Link>
      </div>
    )
  }

  return <AdminDashboard />
}
