"use client";

import { Header } from "@/components/header";
import { CarCard } from "@/components/car-card";
import { Loading } from "@/components/loading";
import { AuthProvider } from "@/lib/auth-context";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function CarsContent() {
  const { data: cars, error, isLoading } = useSWR("/api/cars", fetcher);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            I Nostri Veicoli
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Scegli tra la nostra ampia selezione di auto a noleggio
          </p>
        </div>

        {isLoading && <Loading />}

        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
            Si e verificato un errore nel caricamento dei veicoli. Riprova piu
            tardi.
          </div>
        )}

        {cars && cars.length === 0 && (
          <div className="rounded-lg border border-border bg-muted p-8 text-center">
            <p className="text-muted-foreground">
              Nessun veicolo disponibile al momento.
            </p>
          </div>
        )}

        {cars && cars.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car: { id: number; name: string; image: string; capacity: number; fuel_type: string; rent_per_hour: number }) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function CarsPage() {
  return (
    <AuthProvider>
      <CarsContent />
    </AuthProvider>
  );
}
