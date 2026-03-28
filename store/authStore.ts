import { create } from "zustand";
import { api } from "@/lib/api";

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
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const data = await api.auth.login({ email, password });
      localStorage.setItem("access_token", data.access_token);
      set({ user: data.user, token: data.access_token, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  register: async (formData) => {
    set({ isLoading: true });
    try {
      const data = await api.auth.register(formData);
      localStorage.setItem("access_token", data.access_token);
      set({ user: data.user, token: data.access_token, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("access_token");
    set({ user: null, token: null });
  },

  loadUser: async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    try {
      const user = await api.auth.me();
      set({ user, token });
    } catch {
      localStorage.removeItem("access_token");
    }
  },
}));