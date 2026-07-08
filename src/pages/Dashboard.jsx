import { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

export default function Dashboard() {
  const { products, installations } = useContext(InventoryContext);

  // 📈 Smart Calculations for Business Overview
  const totalStockItems = products?.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0) || 0;
  const totalCategories = products?.length || 0;
  const totalDispatched = installations?.length || 0;

  return (
    <div className="space-y-8 p-2 md:p-6 max-w-[1600px] mx-auto min-h-screen bg-gray-50/50">
      
      {/* 🌟 Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 shadow-xl border border-slate-800 text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
            Enterprise Control Center
          </span>
          <h1 className="text-3xl md:text-4xl font-black mt-4 tracking-tight">
            Welcome Back, <span className="text-indigo-400">Aditya</span> 👋
          </h1>
          <p className="text-slate-400 mt-2 text-sm md:text-base max-w-xl font-medium">
            SCIMS Ledger Framework v2.4. Live cloud inventory synchronization with SQL database is fully optimized.
          </p>
        </div>
      </div>

      {/* 📊 High-End Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Warehouse Capacity */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-200 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Warehouse Units</p>
            <h3 className="text-3xl font-black text-gray-800 tracking-tight">{totalStockItems} <span className="text-xs font-semibold text-gray-400">pcs</span></h3>
            <p className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">↑ Optimized</p>
          </div>
          <div className="bg-indigo-50 text-indigo-600 p-4 rounded-xl text-2xl font-bold">📦</div>
        </div>

        {/* Card 2: Active Product Lines */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-200 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Product Lines</p>
            <h3 className="text-3xl font-black text-gray-800 tracking-tight">{totalCategories} <span className="text-xs font-semibold text-gray-400">SKUs</span></h3>
            <p className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-block">Live Catalog</p>
          </div>
          <div className="bg-blue-50 text-blue-600 p-4 rounded-xl text-2xl font-bold">⚡</div>
        </div>

        {/* Card 3: Dispatched Operations */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-200 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Material Dispatched</p>
            <h3 className="text-3xl font-black text-gray-800 tracking-tight">{totalDispatched} <span className="text-xs font-semibold text-gray-400">Logs</span></h3>
            <p className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md inline-block">On-Field Activity</p>
          </div>
          <div className="bg-amber-50 text-amber-600 p-4 rounded-xl text-2xl font-bold">🚚</div>
        </div>

      </div>

      {/* 📑 Recent Activity Table (Clean Slate Design) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Live Operation Audit</h2>
            <p className="text-xs text-gray-400 mt-0.5">Real-time ledger updates across logistics operations</p>
          </div>
          <button className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm transition">
            Export Report 📄
          </button>
        </div>

        <div className="overflow-x-auto">
          {installations && installations.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                  <th className="p-4 pl-6">Technician / Client</th>
                  <th className="p-4">Material Details</th>
                  <th className="p-4">Status Flag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-600">
                {installations.slice(0, 5).map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50/70 transition">
                    <td className="p-4 pl-6">
                      <p className="text-gray-800 font-bold">{log.technicianName || "Unknown"}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{log.clientName || "Direct Stock Entry"}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-slate-700 bg-slate-100 font-semibold px-2.5 py-1 rounded-lg text-xs border border-slate-200">
                        {log.productName || "Generic LED Module"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        Dispatched
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-gray-400 space-y-2">
              <p className="text-2xl">💤</p>
              <p className="text-sm font-semibold">No operational records found on the cloud ledger.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}