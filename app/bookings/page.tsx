"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Loading } from "@/components/loading";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import useSWR from "swr";
import { format, parseISO } from "date-fns";
import { it } from "date-fns/locale";
import { useEffect } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Booking {
  _id: string;
  car: {
    _id: string;
    name: string;
    image: string;
  };
  bookedTimeSlots: {
    from: string;
    to: string;
  };
  totalAmount: number;
  driverRequired: boolean;
  createdAt: string;
}

function BookingsContent() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const {
    data: bookings,
    error,
    isLoading,
  } = useSWR(user ? `/api/bookings?userId=${user._id}` : null, fetcher);

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
                key={booking._id}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground">
                      {booking.car?.name || "Veicolo"}
                    </h3>
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium">Inizio:</span>{" "}
                        {format(
                          parseISO(booking.bookedTimeSlots.from),
                          "PPP 'alle' HH:mm",
                          { locale: it }
                        )}
                      </p>
                      <p>
                        <span className="font-medium">Fine:</span>{" "}
                        {format(
                          parseISO(booking.bookedTimeSlots.to),
                          "PPP 'alle' HH:mm",
                          { locale: it }
                        )}
                      </p>
                      {booking.driverRequired && (
                        <p className="text-accent">Con autista</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent">
                      {"\u20AC"}{booking.totalAmount.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Prenotato il{" "}
                      {format(parseISO(booking.createdAt), "dd/MM/yyyy")}
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
