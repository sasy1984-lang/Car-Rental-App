"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import useSWR from "swr";

interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { username: string; email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, mutate } = useSWR("/api/auth/me", fetcher);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  }, [data]);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || "Login fallito" };
      }

      setUser(data.user);
      mutate();
      return { success: true };
    } catch {
      return { success: false, error: "Si è verificato un errore" };
    }
  }, [mutate]);

  const register = useCallback(async (userData: { username: string; email: string; password: string }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || "Registrazione fallita" };
      }

      return { success: true };
    } catch {
      return { success: false, error: "Si è verificato un errore" };
    }
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    mutate();
  }, [mutate]);

  const refreshUser = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <AuthContext.Provider value={{ user, loading: isLoading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
