import Link from "next/link";
import { Header } from "@/components/header";
import { AuthProvider } from "@/lib/auth-context";

export default function HomePage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 py-20 lg:py-32">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
                Noleggia la tua auto ideale
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
                Ampia selezione di veicoli a prezzi competitivi. Prenotazione
                semplice e veloce, senza sorprese.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/cars"
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3 text-base font-semibold text-accent-foreground shadow-lg transition-all hover:bg-accent/90 hover:shadow-xl"
                >
                  Scopri i Veicoli
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-primary-foreground/30 px-8 py-3 text-base font-semibold text-primary-foreground transition-all hover:border-primary-foreground/50 hover:bg-primary-foreground/10"
                >
                  Registrati Gratis
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Perche scegliere CarRent?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Offriamo un servizio di noleggio auto semplice, trasparente e
                conveniente.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-card-foreground">
                  Prezzi Trasparenti
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Nessun costo nascosto. Il prezzo che vedi e quello che paghi,
                  senza sorprese.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <svg
                    className="h-7 w-7"
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
                </div>
                <h3 className="mt-6 text-xl font-semibold text-card-foreground">
                  Prenotazione Veloce
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Prenota la tua auto in pochi click. Processo semplice e
                  intuitivo.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-8 text-center sm:col-span-2 lg:col-span-1">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-card-foreground">
                  Pagamenti Sicuri
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Transazioni protette con Stripe. I tuoi dati sono sempre al
                  sicuro.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-accent p-8 sm:flex-row sm:p-12">
              <div>
                <h2 className="text-2xl font-bold text-accent-foreground sm:text-3xl">
                  Pronto a partire?
                </h2>
                <p className="mt-2 text-accent-foreground/80">
                  Inizia a noleggiare oggi stesso e scopri la comodita di
                  CarRent.
                </p>
              </div>
              <Link
                href="/cars"
                className="shrink-0 rounded-lg bg-background px-8 py-3 text-base font-semibold text-foreground shadow-lg transition-all hover:bg-background/90"
              >
                Vedi Tutti i Veicoli
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-background py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-2">
                <svg
                  className="h-6 w-6 text-accent"
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
                <span className="font-semibold text-foreground">CarRent</span>
              </div>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} CarRent. Tutti i diritti
                riservati.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}
