import { create } from "zustand";
import { loginApi, registerApi } from "../api/auth";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),

  login: async (email, password) => {
    try {
      const data = await loginApi(email, password);
      localStorage.setItem("token", data.token);
      set({ token: data.token, isAuthenticated: true });
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
    set({ token: null, isAuthenticated: false });
  },
}));
