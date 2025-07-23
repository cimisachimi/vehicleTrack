import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { href: "/", label: "Real Time" },
    { href: "/vehicle", label: "Vehicle List" },
  ];

  return (
    <nav className="bg-primary text-white px-6 py-4 flex items-center shadow-md relative z-20">
      {/* Title */}
      <div className="flex-1">
        <div className="text-lg font-bold">
          <Link to="/" className="hover:underline">
            🚗 Vehicle Tracker
          </Link>
        </div>
      </div>

      {/* Desktop Navigation Links (Centered) */}
      <div className="hidden md:flex flex-1 justify-center items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={`nav-link text-sm font-medium ${
              location.pathname === link.href ? "active" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* User Info and Logout (Right-aligned) */}
      <div className="hidden md:flex flex-1 justify-end items-center gap-4">
        {user ? ` Logged in as, ${user.name}` : ""}
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden ml-auto">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-primary flex flex-col items-center gap-4 py-4 md:hidden shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={`nav-link py-2 ${
                location.pathname === link.href ? "active" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="text-white pt-4 border-t border-white/20 w-full text-center">
            {user ? `Logged in as, ${user.name}` : ""}
          </div>
          <div className="w-full px-4 pt-2">
            <Button
              className="w-full"
              variant="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}