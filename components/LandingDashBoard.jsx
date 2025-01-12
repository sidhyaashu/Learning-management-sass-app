"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import Link from "next/link";

function LandingDashBoard({ title }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Close menu when navigating
  const closeMenu = () => setMenuOpen(false);

  // Close the menu on route change with router.events check
  useEffect(() => {
    if (router.events) {
      router.events.on("routeChangeStart", closeMenu);
      return () => {
        router.events.off("routeChangeStart", closeMenu);
      };
    }
  }, [router]);

  return (
    <header className="p-4 shadow-md bg-gray-800 text-gray-100 flex justify-between items-center relative">
      {/* Left Section: Logo and Title */}
      <div className="flex items-center space-x-4 cursor-pointer">
        <img src="/logo.svg" alt="Logo" className="w-8 h-8 rounded-full" />
        {title && <h1 className="text-xl font-bold tracking-wide text-gray-100">{title}</h1>}
      </div>

      {/* Right Section: Menu for Desktop */}
      <div className="hidden md:flex items-center space-x-4">
        <Link href="/dashboard" className="text-gray-100 hover:text-white">Dashboard</Link>
      </div>

      {/* Hamburger Menu for Tablet and Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-400 hover:text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Menu (for mobile) */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-gray-800 shadow-lg rounded-md w-48 z-50">
          <ul className="text-gray-100">
            <li className="border-b border-gray-700 p-2 hover:bg-gray-700">
              <Link href="/dashboard" className="w-full text-left">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Spinner */}
      {loading && <Spinner show={loading} />}
    </header>
  );
}

// Spinner Component
const Spinner = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-md flex items-center justify-center z-50">
      <div
        className="h-12 w-12 border-4 border-t-blue-500 border-t-4 rounded-full animate-spin"
        style={{
          borderColor: "rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.2) blue rgba(0, 0, 0, 0.2)",
          animation: "spin 1s linear infinite",
        }}
      ></div>
    </div>
  );
};

export default LandingDashBoard;
