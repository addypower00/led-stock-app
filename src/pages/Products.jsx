import { useState, useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useContext(InventoryContext);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  
  // Edit State Management
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editQuantity, setEditQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !quantity) return alert("Bhai, saari fields bharna zaroori hai!");
    
    try {
      await addProduct({ name: name.trim(), quantity: Number(quantity) });
      alert("Product successfully ledger me add ho gaya! 📦");
      setName("");
      setQuantity("");
    } catch (error) {
      console.error(error);
      alert("Database error: Product add nahi ho paya.");
    }
  };

  const startEdit = (prod) => {
    setEditingId(prod.id);
    setEditName(prod.name);
    setEditQuantity(prod.quantity ?? prod.qty ?? 0);
  };

  const handleUpdate = async (id) => {
    if (!editName.trim() || !editQuantity) return alert("Fields khali nahi chhod sakte!");
    try {
      await updateProduct(id, { name: editName.trim(), quantity: Number(editQuantity) });
      alert("Product details updated! 🔄");
      setEditingId(null);
    } catch (error) {
      console.error(error);
      alert("Update failed!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bhai, kya aap sach me is product ko delete karna chahte hain?")) {
      try {
        await deleteProduct(id);
        alert("Product deleted from ledger! 🚫");
      } catch (error) {
        console.error(error);
        alert("Delete failed!");
      }
    }
  };

  return (
    <div className="space-y-8 p-2 md:p-6 max-w-[1600px] mx-auto min-h-screen bg-gray-50/50">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Products Registry</h1>
        <p className="text-sm text-gray-500 mt-1 font-medium">Manage master catalog, update quantities, and filter stock baselines.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* 📑 Left side: Form Panel */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
            <span>➕</span> Register New Product Line
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Item Label / Specification</label>
              <input
                type="text"
                placeholder="e.g., 32\" Wall Mount"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                required
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
                required
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

        {/* 📊 Right side: Table Grid */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Warehouse Master Stock</h2>
            <p className="text-xs text-gray-400 mt-0.5">Verified inventory modules physically present in storage</p>
          </div>

          <div className="overflow-x-auto">
            {products && products.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                    <th className="p-4 pl-6">SKU ID</th>
                    <th className="p-4">Product Nomenclature</th>
                    <th className="p-4">Available Stock</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-600">
                  {products.map((prod, index) => {
                    // Smart check for quantity parameters coming from backend
                    const displayQty = prod.quantity !== undefined ? prod.quantity : (prod.qty !== undefined ? prod.qty : 0);
                    const isEditing = editingId === prod.id;

                    return (
                      <tr key={prod.id || index} className="hover:bg-gray-50/50 transition">
                        <td className="p-4 pl-6 text-xs font-mono text-indigo-600 font-semibold">
                          #SKU-{1000 + (prod.id || index)}
                        </td>
                        
                        <td className="p-4">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="border border-gray-300 p-1.5 rounded-lg text-sm w-full font-medium"
                            />
                          ) : (
                            <span className="text-gray-900 font-bold">{prod.name}</span>
                          )}
                        </td>

                        <td className="p-4">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editQuantity}
                              onChange={(e) => setEditQuantity(e.target.value)}
                              className="border border-gray-300 p-1.5 rounded-lg text-sm w-20 font-mono"
                            />
                          ) : (
                            <span className={`inline-block font-mono font-bold px-2.5 py-1 rounded-lg text-xs ${
                              displayQty > 5 
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                                : "bg-rose-50 text-rose-700 border border-rose-100 animate-pulse"
                            }`}>
                              {displayQty} pcs
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-center space-x-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleUpdate(prod.id)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-2.5 py-1.5 rounded-lg font-bold transition"
                              >
                                Save ✅
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="bg-gray-400 hover:bg-gray-50 text-gray-800 text-xs px-2.5 py-1.5 rounded-lg font-bold transition"
                              >
                                Cancel ❌
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(prod)}
                                className="bg-amber-500/10 hover:bg-amber-500 text-amber-700 hover:text-white text-xs px-3 py-1.5 rounded-lg font-bold transition border border-amber-500/20"
                              >
                                Edit ✏️
                              </button>
                              <button
                                onClick={() => handleDelete(prod.id)}
                                className="bg-rose-600/10 hover:bg-rose-600 text-rose-600 hover:text-white text-xs px-3 py-1.5 rounded-lg font-bold transition border border-rose-600/20"
                              >
                                Delete 🗑️
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
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