import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch Data from Google Sheets (Only When User Clicks "Refresh Data")
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/google/getData");
      setData(response.data.values || []);
    } catch (err) {
      console.error("Failed to fetch data", err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // ✅ Fetch once when page loads
  }, []); // ✅ No auto-refresh after initial load

  return (
    <div>
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
    </div>
  );
}
