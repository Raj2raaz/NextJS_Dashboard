

// import { useEffect, useState } from "react";
// import axios from "axios";
// import io from "socket.io-client";
// import Table from "../components/Table";
// import Navbar from "../components/Navbar";

// export default function Dashboard() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ✅ Fetch Data from Google Sheets
//   const fetchData = async () => {
//     try {
//       const response = await axios.get("/api/google/getData");
//       setData(response.data.values || []);
//     } catch (err) {
//       console.error("Failed to fetch data", err);
//       setError("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(); // Fetch data when component loads

//     // ✅ Connect WebSocket to Listen for Real-Time Updates
//     const socket = io("http://localhost:3001");
//     socket.on("dataUpdated", (updatedData) => {
//       console.log("Real-time update received:", updatedData);
//       setData(updatedData);
//     });

//     return () => socket.disconnect(); // ✅ Cleanup WebSocket on component unmount
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <div className="container mx-auto mt-10">
//         <h2 className="text-2xl font-bold mb-4">Google Sheets Data (Real-Time)</h2>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading data...</p>
//         ) : error ? (
//           <p className="text-red-500">{error}</p>
//         ) : (
//           <Table data={data} refreshData={fetchData} />
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Table({ data, refreshData }) {
  const [editedData, setEditedData] = useState(data);

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  // ✅ Handle Cell Edit
  const handleEdit = (rowIndex, colIndex, value) => {
    const updatedData = [...editedData];
    updatedData[rowIndex][colIndex] = value;
    setEditedData(updatedData);
  };

  // ✅ Add a New Row
  const handleAddRow = () => {
    const newRow = Array(editedData[0]?.length || 1).fill("");
    setEditedData([...editedData, newRow]);
  };

  // ✅ Add a New Column
  const handleAddColumn = () => {
    const updatedData = editedData.map((row) => [...row, ""]);
    setEditedData(updatedData);
  };

  // ✅ Save Data to Google Sheets
  const handleSave = async () => {
    try {
      await axios.post("/api/google/updateData", { data: editedData });
      alert("Data updated successfully!");
      if (refreshData) refreshData();
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update data.");
    }
  };

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No data available.</p>;
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {editedData[0].map((header, index) => (
              <th key={index} className="border p-2 text-left">{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {editedData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
              {row.map((cell, colIndex) => (
                <td key={colIndex} className="border p-2">
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleEdit(rowIndex + 1, colIndex, e.target.value)}
                    className="w-full p-1 border-none focus:ring focus:ring-blue-300"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex gap-4">
        <button onClick={handleAddRow} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Row
        </button>
        <button onClick={handleAddColumn} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Add Column
        </button>
        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </div>
    </div>
  );
}
