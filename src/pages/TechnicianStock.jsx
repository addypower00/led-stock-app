import { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

export default function TechnicianStock() {
  const { technicians } = useContext(InventoryContext);

  return (
    <div className="space-y-8 p-2 md:p-6 max-w-[1600px] mx-auto min-h-screen bg-gray-50/50">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">On-Field Hand Stock Ledger</h1>
        <p className="text-sm text-gray-500 mt-1 font-medium">Real-time monitoring of inventory modules physically carried by technicians on the field.</p>
      </div>

      {/* Grid View */}
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Technician Custody Audit</h2>
          <p className="text-xs text-gray-400 mt-0.5">Live records mapping column schemas from corporate server database</p>
        </div>

        <div className="overflow-x-auto">
          {technicians && technicians.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                  <th className="p-4 pl-6">Technician Name</th>
                  <th className="p-4">32" Wall Mount Stock</th>
                  <th className="p-4">43" Wall Mount Stock</th>
                  <th className="p-4">55"-65" Wall Mount Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-600">
                {technicians.map((tech, index) => (
                  <tr key={tech.id || index} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 pl-6 text-gray-900 font-bold">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 font-black flex items-center justify-center text-xs">
                          {tech.name?.charAt(0).toUpperCase()}
                        </span>
                        <span>{tech.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block font-mono px-2.5 py-1 rounded-lg text-xs font-bold ${tech.stock32 > 0 ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-100 text-gray-400'}`}>
                        {tech.stock32 || 0} pcs
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block font-mono px-2.5 py-1 rounded-lg text-xs font-bold ${tech.stock43 > 0 ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-400'}`}>
                        {tech.stock43 || 0} pcs
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block font-mono px-2.5 py-1 rounded-lg text-xs font-bold ${tech.stock5565 > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
                        {tech.stock5565 || 0} pcs
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-gray-400">
              <p className="text-sm font-medium">No active technicians registered on cloud databases.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}