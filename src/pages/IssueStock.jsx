import { useState, useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

export default function IssueStock() {
  const { products, technicians, fetchInitialData } = useContext(InventoryContext);

  const [selectedTechId, setSelectedTechId] = useState("");
  const [selectedProdId, setSelectedProdId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleIssueStock = async () => {
    if (!selectedTechId || !selectedProdId || !quantity) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("https://led-inventory-backend.onrender.com/api/issue-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          techId: selectedTechId,
          prodId: selectedProdId,
          qty: quantity,
        }),
      });

      if (response.ok) {
        alert("Stock Issued & Saved in Cloud DB! 🚚");
        await fetchInitialData();
        setQuantity("");
        setSelectedProdId("");
        setSelectedTechId("");
      } else {
        const err = await response.json();
        alert(err.error);
      }
    } catch (err) {
      alert("Server connection error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">Issue Stock to Technician</h1>
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-8 border border-gray-100">
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-600 mb-2">Select Technician</label>
          <select value={selectedTechId} onChange={(e) => setSelectedTechId(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">-- Choose Technician --</option>
            {technicians.map((tech) => (
              <option key={tech.id} value={tech.id}>{tech.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-600 mb-2">Select Product Item</label>
          <select value={selectedProdId} onChange={(e) => setSelectedProdId(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">-- Choose Product --</option>
            {products.map((prod) => (
              <option key={prod.id} value={prod.id}>{prod.name} (Available: {prod.stock})</option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-600 mb-2">Quantity to Issue</label>
          <input type="number" placeholder="Enter Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button onClick={handleIssueStock} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-lg font-bold shadow-md transition duration-200 uppercase tracking-wider">
          Confirm Issue Stock 🚚
        </button>
      </div>
    </div>
  );
}