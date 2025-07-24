import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    const ok = await register(email, password);
    setIsLoading(false);

    if (ok) {
      // Navigate to the main page after successful registration and login
      navigate("/");
    } else {
      setError("Registration failed. Email might already be in use.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 p-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">🚗 Vehicle Tracker</h1>
      </div>
      <Card className="w-full max-w-md animate__animated animate__fadeIn">
        <CardHeader>
          <CardTitle className="text-center text-xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner className="size-5" /> : "Create Account"}
            </Button>
          </form>
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <span
              onClick={() => !isLoading && navigate("/login")}
              className={`text-blue-500 ${isLoading ? "cursor-not-allowed text-opacity-50" : "cursor-pointer"}`}
            >
              Login
            </span>
          </p>
        </CardContent>
      </Card>
      <div className="text-center mt-6 text-sm text-gray-500">
        <p>Made by Muhammad Faturahman</p>
        <p>mfaturrahmann@gmail.com</p>
      </div>
    </div>
  );
}