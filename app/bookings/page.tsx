"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Loading } from "@/components/loading";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import useSWR from "swr";
import { useEffect } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Booking {
  id: number;
  car_name: string;
  car_image: string;
  booked_time_slots: {
    from: string;
    to: string;
  };
  total_amount: number;
  driver_required: boolean;
  created_at: string;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function BookingsContent() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const {
    data: bookings,
    error,
    isLoading,
  } = useSWR(user ? `/api/bookings` : null, fetcher);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading || isLoading) return <Loading />;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Le Mie Prenotazioni
        </h1>

        {error && (
          <div className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
            Errore nel caricamento delle prenotazioni
          </div>
        )}

        {bookings && bookings.length === 0 && (
          <div className="mt-8 rounded-lg border border-border bg-muted p-8 text-center">
            <p className="text-muted-foreground">
              Non hai ancora effettuato prenotazioni.
            </p>
          </div>
        )}

        {bookings && bookings.length > 0 && (
          <div className="mt-8 space-y-4">
            {bookings.map((booking: Booking) => (
              <div
                key={booking.id}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground">
                      {booking.car_name || "Veicolo"}
                    </h3>
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium">Inizio:</span>{" "}
                        {formatDate(booking.booked_time_slots.from)}
                      </p>
                      <p>
                        <span className="font-medium">Fine:</span>{" "}
                        {formatDate(booking.booked_time_slots.to)}
                      </p>
                      {booking.driver_required && (
                        <p className="text-accent">Con autista</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent">
                      {"\u20AC"}{Number(booking.total_amount).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Prenotato il{" "}
                      {new Date(booking.created_at).toLocaleDateString("it-IT")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function BookingsPage() {
  return (
    <AuthProvider>
      <BookingsContent />
    </AuthProvider>
  );
}
