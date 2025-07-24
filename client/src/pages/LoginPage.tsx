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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      setIsLoading(false);
      return;
    }

    const success = await login(email, password);
    setIsLoading(false);

    if (success) {
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 p-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">🚗 Vehicle Tracker</h1>
      </div>
      <Card className="w-full max-w-md animate__animated animate__fadeIn">
        <CardHeader>
          <CardTitle className="text-center text-xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              {isLoading ? <Spinner className="size-5" /> : "Login"}
            </Button>
          </form>
          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => !isLoading && navigate("/register")}
              className={`text-blue-500 ${isLoading ? "cursor-not-allowed text-opacity-50" : "cursor-pointer"}`}
            >
              Register
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