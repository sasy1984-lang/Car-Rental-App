import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Car Rental App - Noleggio Auto",
  description: "Noleggia la tua auto ideale in pochi click. Ampia selezione di veicoli a prezzi competitivi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
