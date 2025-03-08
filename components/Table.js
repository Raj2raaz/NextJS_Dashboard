import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Table({ data, refreshData }) {
  const [editedData, setEditedData] = useState(data || []);

  useEffect(() => {
    setEditedData(data || []);
  }, [data]);

  const handleEdit = (rowIndex, colIndex, value) => {
    const updatedData = [...editedData];
    updatedData[rowIndex][colIndex] = value;
    setEditedData(updatedData);
  };

  const handleAddRow = () => {
    const newRow = Array(editedData[0]?.length || 1).fill(""); 
    setEditedData([...editedData, newRow]);
  };

  const handleAddColumn = () => {
    if (editedData.length === 0) {
      setEditedData([["New Column"]]); 
    } else {
      const updatedData = editedData.map((row) => [...row, ""]);
      setEditedData(updatedData);
    }
  };
  const handleSave = async () => {
    try {
      await axios.post("/api/google/updateData", { data: editedData });
      toast.success("Data updated successfully!");
      if (refreshData) refreshData();
    } catch (error) {
      // console.error("Error updating data:", error);
      toast.error("Failed to update data.");
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      <Toaster />
      {editedData.length === 0 ? (
        <p className="text-center text-gray-500 mb-4">No data available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {editedData[0].map((header, index) => (
                <th key={index} className="border p-2 text-left">
                  <input
                    type="text"
                    value={header}
                    onChange={(e) => handleEdit(0, index, e.target.value)} 
                    className="w-full p-1 border-none bg-transparent focus:ring focus:ring-blue-300"
                  />
                </th>
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
      )}

      <div className="mt-4 flex gap-4 justify-center">
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
