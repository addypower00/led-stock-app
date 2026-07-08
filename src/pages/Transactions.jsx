import { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

export default function Transactions() {
  const { installations } = useContext(InventoryContext);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Transactions History</h1>
      <p className="text-gray-600 mb-6">All historical warehouse stock and usage logs.</p>
      
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-700 mb-4">System Activity Audit</h2>
        <p className="text-sm text-gray-500">
          Total verified transactions on cloud server: <span className="font-bold text-blue-600">{installations?.length || 0} items linked</span>
        </p>
      </div>
    </div>
  );
}