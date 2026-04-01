"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/header";
import { Loading } from "@/components/loading";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Car {
  id: number;
  name: string;
  image: string;
  capacity: number;
  fuel_type: string;
  rent_per_hour: number;
}

function AdminContent() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { data: cars, isLoading } = useSWR("/api/cars", fetcher);

  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    capacity: 4,
    fuel_type: "Benzina",
    rent_per_hour: 10,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && (!user || !user.isAdmin)) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const resetForm = () => {
    setFormData({
      name: "",
      image: "",
      capacity: 4,
      fuel_type: "Benzina",
      rent_per_hour: 10,
    });
    setEditingCar(null);
    setShowForm(false);
    setError("");
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setFormData({
      name: car.name,
      image: car.image,
      capacity: car.capacity,
      fuel_type: car.fuel_type,
      rent_per_hour: Number(car.rent_per_hour),
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (editingCar) {
        // Update existing car
        const response = await fetch(`/api/cars/${editingCar.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          mutate("/api/cars");
          resetForm();
        } else {
          const data = await response.json();
          setError(data.error || "Errore durante il salvataggio");
        }
      } else {
        // Create new car
        const response = await fetch("/api/cars", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          mutate("/api/cars");
          resetForm();
        } else {
          const data = await response.json();
          setError(data.error || "Errore durante il salvataggio");
        }
      }
    } catch {
      setError("Errore di connessione");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (carId: number) => {
    if (!confirm("Sei sicuro di voler eliminare questo veicolo?")) return;

    try {
      const response = await fetch(`/api/cars/${carId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        mutate("/api/cars");
      }
    } catch (err) {
      console.error("Error deleting car:", err);
    }
  };

  if (authLoading || isLoading) return <Loading />;

  if (!user?.isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Gestione Veicoli
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Aggiungi Veicolo
          </button>
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-card p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-card-foreground">
                {editingCar ? "Modifica Veicolo" : "Aggiungi Veicolo"}
              </h2>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
                    placeholder="es. Fiat 500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">
                    URL Immagine
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    required
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
                    placeholder="https://..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground">
                      Posti
                    </label>
                    <input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          capacity: parseInt(e.target.value),
                        })
                      }
                      required
                      min={1}
                      max={9}
                      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground">
                      Carburante
                    </label>
                    <select
                      value={formData.fuel_type}
                      onChange={(e) =>
                        setFormData({ ...formData, fuel_type: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
                    >
                      <option>Benzina</option>
                      <option>Diesel</option>
                      <option>Elettrica</option>
                      <option>Ibrido</option>
                      <option>GPL</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">
                    Prezzo per ora ({"\u20AC"})
                  </label>
                  <input
                    type="number"
                    value={formData.rent_per_hour}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rent_per_hour: parseFloat(e.target.value),
                      })
                    }
                    required
                    min={1}
                    step={0.5}
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
                  />
                </div>

                {error && (
                  <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 rounded-lg border border-border py-2 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 rounded-lg bg-accent py-2 text-sm font-semibold text-accent-foreground disabled:opacity-50"
                  >
                    {submitting ? "Salvataggio..." : "Salva"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Cars Table */}
        {cars && cars.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full">
              <thead className="border-b border-border bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    Veicolo
                  </th>
                  <th className="hidden px-4 py-3 text-left text-sm font-semibold text-foreground sm:table-cell">
                    Posti
                  </th>
                  <th className="hidden px-4 py-3 text-left text-sm font-semibold text-foreground md:table-cell">
                    Carburante
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    Prezzo/ora
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {cars.map((car: Car) => (
                  <tr key={car.id}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-16 overflow-hidden rounded bg-muted">
                          <Image
                            src={car.image}
                            alt={car.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <span className="font-medium text-card-foreground">
                          {car.name}
                        </span>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                      {car.capacity}
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                      {car.fuel_type}
                    </td>
                    <td className="px-4 py-3 font-medium text-accent">
                      {"\u20AC"}{car.rent_per_hour}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleEdit(car)}
                        className="mr-2 rounded px-2 py-1 text-sm text-accent hover:bg-accent/10"
                      >
                        Modifica
                      </button>
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="rounded px-2 py-1 text-sm text-destructive hover:bg-destructive/10"
                      >
                        Elimina
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-muted p-8 text-center">
            <p className="text-muted-foreground">
              Nessun veicolo presente. Aggiungi il primo!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  );
}
