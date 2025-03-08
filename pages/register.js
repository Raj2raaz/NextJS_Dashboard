import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import Link from "next/link"; 

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await axios.post("/api/auth/register", { name, email, password });
      toast.success("Registration successful! Please login.");
      setTimeout(() => router.push("/login"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed!");
    }
  };

  return (
    <Layout>
      <Toaster />
      <div className="w-96 p-6 bg-white shadow-lg rounded">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
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
          onClick={handleRegister} 
          className="w-full bg-green-500 text-white p-2 rounded mb-4"
        >
          Register
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </Layout>
  );
}
