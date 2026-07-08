import { createContext, useState, useEffect } from "react";

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [installations, setInstallations] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = "https://led-inventory-backend.onrender.com/api";

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

  // ➕ 1. Add Product (Exact Matching Schema)
  const addProduct = async (productData) => {
    const response = await fetch(`${BACKEND_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: productData.category,
        name: productData.name,
        stock: Number(productData.stock)
      }),
    });
    if (!response.ok) throw new Error("Failed to add product");
    await fetchInitialData();
  };

  // 🔄 2. Update Product (Exact Matching Schema)
  const updateProduct = async (id, updatedData) => {
    const response = await fetch(`${BACKEND_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: updatedData.category,
        name: updatedData.name,
        stock: Number(updatedData.stock)
      }),
    });
    if (!response.ok) throw new Error("Failed to update product");
    await fetchInitialData();
  };

  // 🗑️ 3. Delete Product
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
        <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white font-bold text-xl">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-400 text-sm font-medium animate-pulse">🔄 Connecting to SCIMS SQL Server...</p>
          </div>
        </div>
      )}
    </InventoryContext.Provider>
  );
};