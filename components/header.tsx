"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";

export function Header() {
  const { user, logout, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <svg
            className="h-8 w-8 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <span className="text-xl font-bold text-foreground">CarRent</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/cars"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Veicoli
          </Link>
          {user && (
            <Link
              href="/bookings"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Le Mie Prenotazioni
            </Link>
          )}
          {user?.admin && (
            <Link
              href="/admin"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          {loading ? (
            <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Ciao, {user.username}
              </span>
              <button
                onClick={logout}
                className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                Esci
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Accedi
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
              >
                Registrati
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="flex flex-col gap-2 p-4">
            <Link
              href="/"
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/cars"
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Veicoli
            </Link>
            {user && (
              <Link
                href="/bookings"
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Le Mie Prenotazioni
              </Link>
            )}
            {user?.admin && (
              <Link
                href="/admin"
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            <div className="mt-4 border-t border-border pt-4">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground"
                >
                  Esci
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    className="w-full rounded-md bg-secondary px-4 py-2 text-center text-sm font-medium text-secondary-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Accedi
                  </Link>
                  <Link
                    href="/register"
                    className="w-full rounded-md bg-accent px-4 py-2 text-center text-sm font-medium text-accent-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Registrati
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
