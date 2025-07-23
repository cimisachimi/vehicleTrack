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

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await register(email, password);
    if (ok) {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setError("Registration failed. Email might already be registered.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">Registered successfully! Redirecting...</p>}
            <Button className="w-full" type="submit">
              Register
            </Button>
            <p className="text-center text-sm mt-2">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-500 cursor-pointer"
              >
                Login
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
