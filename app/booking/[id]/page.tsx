"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/header";
import { Loading } from "@/components/loading";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function BookingContent({ carId }: { carId: string }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { data: car, error, isLoading } = useSWR(`/api/cars/${carId}`, fetcher);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [driverRequired, setDriverRequired] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const calculateTotal = () => {
    if (!fromDate || !toDate || !car) return { totalHours: 0, totalAmount: 0 };

    const from = new Date(fromDate);
    const to = new Date(toDate);
    const totalMins = (to.getTime() - from.getTime()) / (1000 * 60);

    if (totalMins <= 0) return { totalHours: 0, totalAmount: 0 };

    const totalHours = totalMins / 60;
    let totalAmount = totalHours * Number(car.rent_per_hour);

    if (driverRequired) {
      totalAmount += totalHours * 5; // 5 EUR/hour for driver
    }

    return { totalHours: Math.round(totalHours * 100) / 100, totalAmount: Math.round(totalAmount * 100) / 100 };
  };

  const { totalHours, totalAmount } = calculateTotal();

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleBooking = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!fromDate || !toDate) {
      setBookingError("Seleziona le date di noleggio");
      return;
    }

    if (totalHours <= 0) {
      setBookingError("La data di fine deve essere successiva alla data di inizio");
      return;
    }

    setSubmitting(true);
    setBookingError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: parseInt(carId),
          bookedTimeSlots: {
            from: fromDate,
            to: toDate,
          },
          totalHours: Math.ceil(totalHours),
          totalAmount,
          driverRequired,
        }),
      });

      if (response.ok) {
        alert("Prenotazione effettuata con successo!");
        router.push("/bookings");
      } else {
        const data = await response.json();
        setBookingError(data.error || "Errore durante la prenotazione");
      }
    } catch {
      setBookingError("Errore di connessione. Riprova.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || isLoading) return <Loading />;

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">Errore</h2>
          <p className="mt-2 text-muted-foreground">
            Impossibile caricare i dettagli del veicolo
          </p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">
            Veicolo non trovato
          </h2>
          <p className="mt-2 text-muted-foreground">
            Il veicolo richiesto non esiste
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Car Details */}
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="relative aspect-[16/10] bg-muted">
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <h1 className="text-2xl font-bold text-card-foreground">
                {car.name}
              </h1>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {car.capacity} posti
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  {car.fuel_type}
                </span>
              </div>
              <div className="mt-6">
                <span className="text-3xl font-bold text-accent">
                  {"\u20AC"}{car.rent_per_hour}
                </span>
                <span className="text-lg text-muted-foreground">/ora</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold text-card-foreground">
              Dettagli Prenotazione
            </h2>

            {!user && (
              <div className="mt-4 rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">
                  Devi effettuare il login per prenotare questo veicolo.
                </p>
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="fromDate"
                  className="block text-sm font-medium text-foreground"
                >
                  Data e ora inizio
                </label>
                <input
                  type="datetime-local"
                  id="fromDate"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  min={formatDate(new Date())}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <div>
                <label
                  htmlFor="toDate"
                  className="block text-sm font-medium text-foreground"
                >
                  Data e ora fine
                </label>
                <input
                  type="datetime-local"
                  id="toDate"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  min={fromDate || formatDate(new Date())}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="driver"
                  checked={driverRequired}
                  onChange={(e) => setDriverRequired(e.target.checked)}
                  className="h-4 w-4 rounded border-input text-accent focus:ring-ring"
                />
                <label
                  htmlFor="driver"
                  className="text-sm font-medium text-foreground"
                >
                  Richiedi autista (+5{"\u20AC"}/ora)
                </label>
              </div>

              {totalAmount > 0 && (
                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Durata totale
                    </span>
                    <span className="font-medium text-foreground">
                      {Math.floor(totalHours)}h {Math.round((totalHours % 1) * 60)}m
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                    <span className="text-lg font-semibold text-foreground">
                      Totale
                    </span>
                    <span className="text-2xl font-bold text-accent">
                      {"\u20AC"}{totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {bookingError && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {bookingError}
                </div>
              )}

              <button
                onClick={handleBooking}
                disabled={submitting || !fromDate || !toDate || totalHours <= 0}
                className="w-full rounded-lg bg-accent py-3 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting
                  ? "Elaborazione..."
                  : user
                    ? "Conferma Prenotazione"
                    : "Accedi per Prenotare"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <AuthProvider>
      <BookingContent carId={id} />
    </AuthProvider>
  );
}
