import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/auth/me", { withCredentials: true });
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully!");
      setIsAuthenticated(false);
      router.push("/login");
    } catch (err) {
      toast.error("Logout failed!");
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <Toaster />
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg font-semibold">Dashboard</h1>
        <div>
          {isAuthenticated ? (
            <button 
              onClick={handleLogout} 
              className="text-white bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="text-white mr-4">Login</Link>
              <Link href="/register" className="text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
