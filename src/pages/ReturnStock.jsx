import { useState, useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

export default function ReturnStock() {
  const { products, technicians, fetchInitialData } = useContext(InventoryContext);
  const [techId, setTechId] = useState("");
  const [prodId, setProdId] = useState("");
  const [qty, setQty] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!techId || !prodId || !qty) return alert("Bhai, saari fields select karna zaroori hai!");

    try {
      const response = await fetch("https://led-inventory-backend.onrender.com/api/return-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          techId: Number(techId),
          prodId: Number(prodId),
          qty: Number(qty)
        })
      });

      const resData = await response.json();

      if (response.ok) {
        alert("Stock warehouse me wapas jama ho gaya! 📥🔄");
        setQty("");
        fetchInitialData(); // Sync live data again
      } else {
        alert(`Return Failed: ${resData.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Database error: Inward return operation crash.");
    }
  };

  return (
    <div className="space-y-8 p-2 md:p-6 max-w-[1000px] mx-auto min-h-screen bg-gray-50/50">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Inward Return Protocol</h1>
        <p className="text-sm text-gray-500 mt-1 font-medium">Process unused or returned parts from technicians back into central warehouse safety lock.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/60 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span>🔄</span> Warehouse Stock Reclamation
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technician Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Returning Technician</label>
              <select
                value={techId}
                onChange={(e) => setTechId(e.target.value)}
                className="w-full border border-gray-200 p-3.5 rounded-xl text-sm font-semibold text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                required
              >
                <option value="">-- Choose Technician --</option>
                {technicians?.map((tech) => (
                  <option key={tech.id} value={tech.id}>{tech.name}</option>
                ))}
              </select>
            </div>

            {/* Product Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Item to be Reclaimed</label>
              <select
                value={prodId}
                onChange={(e) => setProdId(e.target.value)}
                className="w-full border border-gray-200 p-3.5 rounded-xl text-sm font-semibold text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                required
              >
                <option value="">-- Choose Inventory Item --</option>
                {products?.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name} (Warehouse Current Balance: {prod.stock} pcs)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="max-w-xs">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Reclaimed Quantity (Units)</label>
            <input
              type="number"
              placeholder="0"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-full border border-gray-200 p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              required
            />
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl font-bold text-sm tracking-wider uppercase transition shadow-lg shadow-indigo-500/15"
            >
              Verify & Log Return Inward 📥
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}