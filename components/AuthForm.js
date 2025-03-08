import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function AuthForm({ type }) {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = type === "register" ? "/api/auth/register" : "/api/auth/login";
      const response = await axios.post(endpoint, formData);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        router.push("/");
      }
    } catch (err) {
      setError("Authentication failed!");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{type === "register" ? "Register" : "Login"}</h2>
        {type === "register" && (
          <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border mb-3" />
        )}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border mb-3" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border mb-3" />
        {error && <p className="text-red-500">{error}</p>}
        <button className="w-full bg-blue-500 text-white py-2 mt-3">{type === "register" ? "Register" : "Login"}</button>
      </form>
    </div>
  );
}
