import { useState, useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

export default function IssueStock() {
  const { products, issueStock } = useContext(InventoryContext);
  const [productId, setProductId] = useState("");
  const [technicianName, setTechnicianName] = useState("");
  const [clientName, setClientName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productId || !technicianName.trim() || !quantity) return alert("All fields are mandatory");
    
    issueStock({
      productId: Number(productId),
      technicianName,
      clientName: clientName || "General Workshop",
      quantity: Number(quantity)
    });

    setProductId("");
    setTechnicianName("");
    setClientName("");
    setQuantity("");
  };

  return (
    <div className="space-y-8 p-2 md:p-6 max-w-[1200px] mx-auto min-h-screen bg-gray-50/50">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Material Dispatch Protocol</h1>
        <p className="text-sm text-gray-500 mt-1 font-medium">Authorized logging for issuing corporate parts to filed technicians.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-200/60 shadow-sm max-w-2xl">
        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span>🚚</span> Generate Outward Stock Gatepass
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Assign Technician</label>
              <input
                type="text"
                placeholder="Technician Full Name"
                value={technicianName}
                onChange={(e) => setTechnicianName(e.target.value)}
                className="w-full border border-gray-200 p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Client Reference / Job Sheet</label>
              <input
                type="text"
                placeholder="Client Name or Ticket No."
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full border border-gray-200 p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Select Inventory Module</label>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full border border-gray-200 p-3.5 rounded-xl text-sm font-semibold text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              >
                <option value="">-- Choose Module --</option>
                {products?.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name} (Available: {prod.quantity} pcs)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Units Required</label>
              <input
                type="number"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full border border-gray-200 p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-xl font-bold text-sm shadow-xl shadow-slate-900/10 transition duration-150 tracking-wide uppercase"
            >
              Approve & Dispatch Material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}