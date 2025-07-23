import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-lg font-bold">
        <Link to="/" className="hover:underline">🚗 Vehicle Tracker</Link>
        
      </div>
      <div className="flex items-center gap-4">
        {user ? ` Logged in as, ${user.name}` : ""}
        <Button variant="secondary" onClick={handleLogout}>Logout</Button>
      </div>
    </nav>
  );
}