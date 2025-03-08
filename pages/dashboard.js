import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Table from "../components/Table";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/auth/me");
        setIsAuthenticated(true);
      } catch (err) {
        toast.error("Unauthorized! Redirecting to login...");
        setTimeout(() => router.push("/login"), 1000); 
      }
    };

    checkAuth();
  }, [router]);

  const fetchData = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const response = await axios.get("/api/google/getData");
      setData(response.data.values || []);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated, fetchData]); 

  return (
    <div>
      <Toaster />
      {isAuthenticated ? (
        <>
          <Navbar />
          <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Google Sheets Data</h2>

            <button
              onClick={fetchData}
              className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Refresh Data
            </button>

            {loading ? (
              <p className="text-center text-gray-500">Loading data...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <Table data={data} refreshData={fetchData} />
            )}
          </div>
        </>
      ) : (
        <p className="text-center mt-10 text-gray-600">Checking authentication...</p>
      )}
    </div>
  );
}
