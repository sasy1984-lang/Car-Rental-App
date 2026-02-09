"use client"

import { AuthProvider } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border bg-card px-4 py-6 text-center text-sm text-muted-foreground">
          AutoRent Car Rental. All rights reserved.
        </footer>
      </div>
    </AuthProvider>
  )
}
