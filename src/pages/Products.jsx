import { useState, useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

export default function Products() {
  const { products, addProduct } = useContext(InventoryContext);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !quantity) return alert("Please fill all fields");
    addProduct({ name, quantity: Number(quantity) });
    setName("");
    setQuantity("");
  };

  return (
    <div className="space-y-8 p-2 md:p-6 max-w-[1600px] mx-auto min-h-screen bg-gray-50/50">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Products Registry</h1>
        <p className="text-sm text-gray-500 mt-1 font-medium">Manage master catalog, inventory units, and stock baselines.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* 📑 Left side: Premium Input Form Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
            <span>➕</span> Register New Product Line
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Item Label / Specification</label>
              <input
                type="text"
                placeholder="e.g., Samsung Opencell Panel v3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Initial Lot Quantity</label>
              <input
                type="number"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full border border-gray-200 p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/10 transition duration-150 tracking-wide"
            >
              Commit to Warehouse Ledger
            </button>
          </form>
        </div>

        {/* 📊 Right side: Enterprise Inventory Grid */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Warehouse Master Stock</h2>
            <p className="text-xs text-gray-400 mt-0.5">Verified inventory modules physically present in central storage</p>
          </div>

          <div className="overflow-x-auto">
            {products && products.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                    <th className="p-4 pl-6">SKU ID</th>
                    <th className="p-4">Product Nomenclature</th>
                    <th className="p-4 text-right pr-8">Available Stock Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-600">
                  {products.map((prod, index) => (
                    <tr key={prod.id || index} className="hover:bg-gray-50/50 transition">
                      <td className="p-4 pl-6 text-xs font-mono text-indigo-600 font-semibold">
                        #SKU-{1000 + (prod.id || index)}
                      </td>
                      <td className="p-4 text-gray-900 font-bold">
                        {prod.name}
                      </td>
                      <td className="p-4 text-right pr-8">
                        <span className={`inline-block font-mono font-bold px-3 py-1 rounded-lg text-sm ${
                          prod.quantity > 5 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                            : "bg-rose-50 text-rose-700 border border-rose-100 animate-pulse"
                        }`}>
                          {prod.quantity} pcs
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center text-gray-400">
                <p className="text-sm font-medium">Warehouse database is empty. Register a product to begin auditing.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}