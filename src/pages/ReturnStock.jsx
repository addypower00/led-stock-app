import { useState, useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

export default function ReturnStock() {
  const { products, technicians, fetchInitialData } = useContext(InventoryContext);

  const [techId, setTechId] = useState("");
  const [prodId, setProdId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleReturnSubmit = async (e) => {
    e.preventDefault();

    if (!techId || !prodId || !quantity) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/return-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ techId, prodId, qty: quantity }),
      });

      if (response.ok) {
        alert("Stock Returned back to SQLite Database Server! 📥");
        await fetchInitialData();
        setQuantity("");
        setProdId("");
        setTechId("");
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
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">Return Material to Main Stock</h1>
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-8 border border-gray-100">
        <form onSubmit={handleReturnSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Select Technician</label>
            <select value={techId} onChange={(e) => setTechId(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">-- Select Technician --</option>
              {technicians.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Select Product Item</label>
            <select value={prodId} onChange={(e) => setProdId(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">-- Select Item --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name} (In Warehouse: {p.stock})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Quantity Returned</label>
            <input type="number" placeholder="Enter Return Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white p-3.5 rounded-lg font-bold shadow transition uppercase tracking-wider">
            Confirm Return 📥
          </button>
        </form>
      </div>
    </div>
  );
}