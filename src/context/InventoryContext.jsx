import { createContext, useState, useEffect } from "react";

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [installations, setInstallations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🚀 1. Database se Initial Data Load karne ka Function (Fetch API)
  const fetchInitialData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/initial-data");
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
        setTechnicians(data.technicians);
        setInstallations(data.installations);
      }
    } catch (err) {
      console.error("Failed to sync with SQLite Server: ", err);
    } finally {
      setLoading(false);
    }
  };

  // App start hote hi automatic data sync hoga
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
        fetchInitialData, // Is function ko baki pages me re-fetch ke liye export kar rahe hain
      }}
    >
      {!loading ? children : (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white font-bold text-xl">
          🔄 Connecting to SCIMS Central Database Server...
        </div>
      )}
    </InventoryContext.Provider>
  );
};