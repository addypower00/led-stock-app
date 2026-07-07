import { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const { products, technicians } = useContext(InventoryContext);

  // 1. Load installations from LocalStorage for counts
  const savedInstalls = localStorage.getItem("scims_installations");
  const installations = savedInstalls ? JSON.parse(savedInstalls) : [];

  // 2. Calculations for Cards
  const totalCompanyStock = products.reduce((acc, item) => acc + item.stock, 0);
  
  const totalTechStock = technicians.reduce(
    (acc, tech) => acc + tech.stock32 + tech.stock43 + tech.stock5565, 0
  );

  // Filter today's installations based on date string
  const todayDateString = new Date().toLocaleDateString();
  const todaysInstallsCount = installations.filter((job) => {
    // Log string se date matching check
    return job.date.includes(todayDateString);
  }).length;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Panel Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to LED Service Inventory Pro</h1>
          <p className="text-gray-500 mt-2">Live Centralized Management Panel</p>
        </div>

        {/* 3 Live Main Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <h2 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Total Company Stock</h2>
            <h1 className="text-4xl font-extrabold text-gray-800 mt-3">{totalCompanyStock} <span className="text-sm font-normal text-gray-400">pcs</span></h1>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <h2 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Total Technician Stock</h2>
            <h1 className="text-4xl font-extrabold text-gray-800 mt-3">{totalTechStock} <span className="text-sm font-normal text-gray-400">pcs</span></h1>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <h2 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Today's Installations</h2>
            <h1 className="text-4xl font-extrabold text-green-600 mt-3">{todaysInstallsCount} <span className="text-sm font-normal text-gray-400">calls</span></h1>
          </div>

        </div>

        {/* Quick Inventory Summary Sheet */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Stock Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border p-4 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-600 mb-2">📦 Main Warehouse</h3>
              <p className="text-sm text-gray-500">Go to <b>Products Master</b> to manage or add new materials to the company database.</p>
            </div>
            <div className="border p-4 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-600 mb-2">👨‍🔧 Field Logistics</h3>
              <p className="text-sm text-gray-500">Check <b>Technician Stock</b> to track real-time units currently held across the 8 engineers.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}