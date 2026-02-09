"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Car, User, LogOut, Menu, X, LayoutDashboard, CalendarDays } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <Car className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">AutoRent</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Cars
          </Link>
          {user && (
            <Link
              href="/bookings"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                My Bookings
              </span>
            </Link>
          )}
          {user?.admin && (
            <Link
              href="/admin"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="flex items-center gap-1.5">
                <LayoutDashboard className="h-4 w-4" />
                Admin
              </span>
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-sm text-foreground">
                <User className="h-4 w-4 text-primary" />
                {user.username}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-card px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-foreground"
            >
              Cars
            </Link>
            {user && (
              <Link
                href="/bookings"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-foreground"
              >
                My Bookings
              </Link>
            )}
            {user?.admin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-foreground"
              >
                Admin
              </Link>
            )}
            <hr className="border-border" />
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Signed in as {user.username}
                </span>
                <button
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                  className="rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-foreground"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
