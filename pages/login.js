import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import Link from "next/link"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await axios.post("/api/auth/login", { email, password }, { withCredentials: true });
      toast.success("Login successful!");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed!");
    }
  };

  return (
    <Layout>
      <Toaster />
      <div className="w-96 p-6 bg-white shadow-lg rounded">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button 
          onClick={handleLogin} 
          className="w-full bg-blue-500 text-white p-2 rounded mb-4"
        >
          Login
        </button>

        <p className="text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </Layout>
  );
}
