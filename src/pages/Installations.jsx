import { useState, useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";
import * as XLSX from "xlsx";

export default function Installations() {
  const { technicians, installations, fetchInitialData } = useContext(InventoryContext);

  const [techId, setTechId] = useState("");
  const [callId, setCallId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [standSize, setStandSize] = useState("");

  const handleInstallSubmit = async (e) => {
    e.preventDefault();

    if (!techId || !callId || !customerName || !standSize) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/installations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ techId, callId, customerName, standSize }),
      });

      if (response.ok) {
        alert("Installation Logged in Database & Stock Deducted! 👍");
        await fetchInitialData();
        setCallId("");
        setCustomerName("");
        setStandSize("");
        setTechId("");
      } else {
        const err = await response.json();
        alert(err.error);
      }
    } catch (err) {
      alert("Server connection error");
    }
  };

  const exportToExcel = () => {
    if (installations.length === 0) {
      alert("No data available to export!");
      return;
    }
    const excelData = installations.map((job) => ({
      "Job / Call ID": job.callId,
      "Customer Name": job.customerName,
      "Technician Name": job.technicianName,
      "Material Used": job.standUsed,
      "Date & Time": job.date,
    }));
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Installations");
    XLSX.writeFile(workbook, `LED_Installation_Report_${new Date().toLocaleDateString().replace(/\//g, "-")}.xlsx`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800">Installation Jobs Ledger</h1>
        <button onClick={exportToExcel} className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-lg font-bold shadow transition flex items-center gap-2">
          📥 Export Report to Excel
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit">
          <h2 className="text-xl font-bold text-gray-700 mb-4">New Installation Entry</h2>
          <form onSubmit={handleInstallSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Technician</label>
              <select value={techId} onChange={(e) => setTechId(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">-- Select Who Installed --</option>
                {technicians.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Job / Call ID</label>
              <input type="text" placeholder="e.g. TCL20260707" value={callId} onChange={(e) => setCallId(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Customer Name</label>
              <input type="text" placeholder="Enter Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Stand Size Used</label>
              <select value={standSize} onChange={(e) => setStandSize(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">-- Select Size --</option>
                <option value="32">32" Wall Mount</option>
                <option value="43">43" Wall Mount</option>
                <option value="5565">55-65" Wall Mount</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white p-3.5 rounded-lg font-bold shadow transition uppercase tracking-wider">
              Submit Job Sheet 📺
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Installation Logs</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 font-semibold text-sm">
                <tr className="border-b">
                  <th className="p-3">Call ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Technician</th>
                  <th className="p-3">Stand Size</th>
                  <th className="p-3 text-center">Date & Time</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {installations.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-400 font-medium">No installation entries found yet.</td>
                  </tr>
                ) : (
                  installations.map((job) => (
                    <tr key={job.id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-3 font-bold text-blue-600">{job.callId}</td>
                      <td className="p-3 text-gray-800">{job.customerName}</td>
                      <td className="p-3 text-gray-700 font-medium">{job.technicianName}</td>
                      <td className="p-3"><span className="bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded text-xs font-semibold">{job.standUsed}</span></td>
                      <td className="p-3 text-gray-500 text-center">{job.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}