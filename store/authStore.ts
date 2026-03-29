import { create } from "zustand";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface User {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) { set({ isLoading: false }); throw new Error(data.detail); }
    localStorage.setItem("access_token", data.access_token);
    set({ user: data.user, token: data.access_token, isLoading: false });
  },

  register: async (formData) => {
    set({ isLoading: true });
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) { set({ isLoading: false }); throw new Error(data.detail); }
    localStorage.setItem("access_token", data.access_token);
    set({ user: data.user, token: data.access_token, isLoading: false });
  },

  logout: () => {
    localStorage.removeItem("access_token");
    set({ user: null, token: null });
  },
}));