import { createContext, useState, useEffect } from "react";

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [installations, setInstallations] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = "https://led-inventory-backend.onrender.com/api";

  // 🚀 Backend se poora data load karne ka function
  const fetchInitialData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/initial-data`);
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products || []);
        setTechnicians(data.technicians || []);
        setInstallations(data.installations || []);
      }
    } catch (err) {
      console.error("Failed to sync with Live Render Server: ", err);
    } finally {
      setLoading(false);
    }
  };

  // ➕ 1. Add Product Function
  const addProduct = async (productData) => {
    const response = await fetch(`${BACKEND_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: productData.name, // Mapping to backend column
        qty: productData.quantity       // Mapping to backend column
      }),
    });
    if (!response.ok) throw new Error("Failed to add product");
    await fetchInitialData(); // Database se refresh karo list
  };

  // 🔄 2. Update Product Function
  const updateProduct = async (id, updatedData) => {
    const response = await fetch(`${BACKEND_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: updatedData.name,
        qty: updatedData.quantity
      }),
    });
    if (!response.ok) throw new Error("Failed to update product");
    await fetchInitialData();
  };

  // 🗑️ 3. Delete Product Function
  const deleteProduct = async (id) => {
    const response = await fetch(`${BACKEND_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete product");
    await fetchInitialData();
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <InventoryContext.Provider
      value={{
        products,
        setProducts,
        technicians,
        setTechnicians,
        installations,
        setInstallations,
        fetchInitialData,
        addProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {!loading ? children : (
        <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white font-bold text-xl tracking-wide">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-400 font-medium text-sm animate-pulse">🔄 Connecting to SCIMS Central Cloud Database Server...</p>
          </div>
        </div>
      )}
    </InventoryContext.Provider>
  );
};