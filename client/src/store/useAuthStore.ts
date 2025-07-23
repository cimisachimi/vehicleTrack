import { create } from "zustand";
import { loginApi, registerApi } from "../api/auth";

interface AuthState {
  token: string | null;
  user: { email: string } | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!localStorage.getItem("token"),

  login: async (email, password) => {
    try {
      const data = await loginApi(email, password); // { token, email }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ email: data.email }));
      set({ token: data.token, user: { email: data.email }, isAuthenticated: true });
      return true;
    } catch {
      return false;
    }
  },

  register: async (email, password) => {
    try {
      return await registerApi(email, password);
    } catch {
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
