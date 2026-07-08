import { useState, useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

export default function Installations() {
  const { installations, technicians, fetchInitialData } = useContext(InventoryContext);
  
  // Form States
  const [techId, setTechId] = useState("");
  const [callId, setCallId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [standSize, setStandSize] = useState("32");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!techId || !callId.trim() || !customerName.trim() || !standSize) {
      return alert("Bhai, saari fields bharna zaroori hai!");
    }

    try {
      const response = await fetch("https://led-inventory-backend.onrender.com/api/installations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          techId: Number(techId),
          callId: callId.trim(),
          customerName: customerName.trim(),
          standSize: standSize
        })
      });

      const resData = await response.json();

      if (response.ok) {
        alert("Installation log ho gayi aur Tech hand-stock se 1 item deduct ho gaya! ✅🔧");
        // Clear Form fields
        setCallId("");
        setCustomerName("");
        fetchInitialData(); // Live state refresh karo table ke liye
      } else {
        alert(`Deduction Failed: ${resData.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Database link error: Installation submit nahi ho payi.");
    }
  };

  return (
    <div className="space-y-8 p-2 md:p-6 max-w-[1600px] mx-auto min-h-screen bg-gray-50/50">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Installation & Stock Deduction</h1>
        <p className="text-sm text-gray-500 mt-1 font-medium">Log field work, capture customer tokens, and automatically deduct technician custody stock.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* 📑 LEFT SIDE: Log Installation & Deduct Form */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
            <span>⚙️</span> Log Job & Deduct Stock
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Select Technician</label>
              <select
                value={techId}
                onChange={(e) => setTechId(e.target.value)}
                className="w-full border border-gray-200 p-3.5 rounded-xl text-sm font-semibold text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                required
              >
                <option value="">-- Select Tech --</option>
                {technicians?.map((tech) => (
                  <option key={tech.id} value={tech.id}>
                    {tech.name} (32" : {tech.stock32 || 0} | 43" : {tech.stock43 || 0} | 55" : {tech.stock5565 || 0})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Call ID / Ticket Number</label>
              <input
                type="text"
                placeholder="e.g., C20240321"
                value={callId}
                onChange={(e) => setCallId(e.target.value)}
                className="w-full border border-gray-200 p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 uppercase font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Customer Name</label>
              <input
                type="text"
                placeholder="e.g., Amit Kumar"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border border-gray-200 p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Wall Mount Size Applied</label>
              <select
                value={standSize}
                onChange={(e) => setStandSize(e.target.value)}
                className="w-full border border-gray-200 p-3.5 rounded-xl text-sm font-semibold text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                required
              >
                <option value="32">32" Wall Mount</option>
                <option value="43">43" Wall Mount</option>
                <option value="5565">55"-65" Wall Mount</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3.5 rounded-xl font-bold text-sm transition shadow-lg shadow-indigo-500/10"
            >
              Verify Job & Deduct Hand-Stock ⚡
            </button>
          </form>
        </div>

        {/* 📊 RIGHT SIDE: Live Installation Logs Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Job Sheet Verification Audit</h2>
            <p className="text-xs text-gray-400 mt-0.5">Verified installation lists synced from central server database</p>
          </div>

          <div className="overflow-x-auto">
            {installations && installations.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                    <th className="p-4 pl-6">Call ID</th>
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Technician</th>
                    <th className="p-4">Material Applied</th>
                    <th className="p-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-600">
                  {installations.map((job, index) => (
                    <tr key={job.id || index} className="hover:bg-gray-50/50 transition">
                      <td className="p-4 pl-6 text-xs font-mono text-indigo-600 font-bold tracking-wide">
                        {job.callId}
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
              <div className="p-12 text-center text-gray-400">
                <p className="text-sm font-medium">Job logging table is empty.</p>
                <p className="text-xs text-gray-400">Complete the form on the left to log your first live installation.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}