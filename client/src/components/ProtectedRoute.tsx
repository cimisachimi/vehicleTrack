import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import type { JSX } from "react";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
}
