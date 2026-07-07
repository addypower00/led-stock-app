import { createContext, useState, useEffect } from "react";

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [installations, setInstallations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🚀 Live Render API se Data Load karne ka Function
  const fetchInitialData = async () => {
    try {
      const response = await fetch("https://led-inventory-backend.onrender.com/api/initial-data");
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
        setTechnicians(data.technicians);
        setInstallations(data.installations);
      }
    } catch (err) {
      console.error("Failed to sync with Live Render Server: ", err);
    } finally {
      setLoading(false);
    }
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
      }}
    >
      {!loading ? children : (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white font-bold text-xl">
          🔄 Connecting to SCIMS Central Cloud Database Server...
        </div>
      )}
    </InventoryContext.Provider>
  );
};