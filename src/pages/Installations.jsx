import { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

export default function Installations() {
  const { installations } = useContext(InventoryContext);

  return (
    <div className="space-y-8 p-2 md:p-6 max-w-[1600px] mx-auto min-h-screen bg-gray-50/50">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Customer Installation Ledger</h1>
        <p className="text-sm text-gray-500 mt-1 font-medium">Historical audit verification logs mapping physical work completed at customer sites.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Job Sheet Verification Audit</h2>
          <p className="text-xs text-gray-400 mt-0.5">Verified installation lists synced from central server</p>
        </div>

        <div className="overflow-x-auto">
          {installations && installations.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                  <th className="p-4 pl-6">Call ID</th>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Technician Dispatched</th>
                  <th className="p-4">Material Applied</th>
                  <th className="p-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-600">
                {installations.map((job, index) => (
                  <tr key={job.id || index} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 pl-6 text-xs font-mono text-indigo-600 font-bold tracking-wide">
                      {job.callId || `#JOB-${100 + index}`}
                    </td>
                    <td className="p-4 text-gray-900 font-bold">
                      {job.customerName}
                    </td>
                    <td className="p-4 text-slate-700 font-semibold">
                      👤 {job.technicianName}
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg">
                        🔧 {job.standUsed}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-medium text-gray-400 font-mono">
                      {job.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-gray-400 space-y-1">
              <p className="text-sm font-medium">Job logging table is empty.</p>
              <p className="text-xs text-gray-400">Complete an installation ticket on the server to push real data.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}