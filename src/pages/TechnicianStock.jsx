import { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

export default function TechnicianStock() {
  // Global context se live technicians ka data uthayein
  const { technicians } = useContext(InventoryContext);

  // Status Badge Helper (Green, Yellow, Red logic)
  const getStockStatus = (totalStock) => {
    if (totalStock === 0) {
      return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold">🔴 No Stock</span>;
    } else if (totalStock < 5) {
      return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">🟡 Low Stock</span>;
    } else {
      return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">🟢 Sufficient</span>;
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Technician Stock Master</h1>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-900 text-white text-center">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Technician Name</th>
              <th className="p-4">32" Wall Mount Qty</th>
              <th className="p-4">43" Wall Mount Qty</th>
              <th className="p-4">55-65" / Parts Qty</th>
              <th className="p-4">Total Items Held</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map((tech) => {
              const totalItems = tech.stock32 + tech.stock43 + tech.stock5565;
              
              return (
                <tr key={tech.id} className="text-center border-b hover:bg-gray-50 transition duration-150">
                  <td className="p-4 text-gray-500 font-medium">{tech.id}</td>
                  <td className="p-4 text-gray-800 font-bold text-left pl-12">{tech.name}</td>
                  <td className="p-4 text-blue-600 font-semibold">{tech.stock32}</td>
                  <td className="p-4 text-blue-600 font-semibold">{tech.stock43}</td>
                  <td className="p-4 text-blue-600 font-semibold">{tech.stock5565}</td>
                  <td className="p-4 text-gray-900 font-extrabold bg-gray-50">{totalItems}</td>
                  <td className="p-4">{getStockStatus(totalItems)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}