import { useState, useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

export default function Products() {
  const { products, fetchInitialData } = useContext(InventoryContext);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [stock, setStock] = useState("");

  // 🚀 DB Add Logic
  const handleAddProduct = async () => {
    if (!category || !productName || !stock) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, name: productName, stock }),
      });

      if (response.ok) {
        alert("Product Added to SQLite Database! 🗄️");
        await fetchInitialData(); // Live reload from DB
        resetForm();
      } else {
        const err = await response.json();
        alert(err.error);
      }
    } catch (err) {
      alert("Server connection error");
    }
  };

  // 🚀 DB Edit Logic
  const handleSaveEdit = async () => {
    if (!category || !productName || !stock) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${currentProductId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, name: productName, stock }),
      });

      if (response.ok) {
        alert("Product Details Updated in DB! ✏️");
        await fetchInitialData();
        resetForm();
      }
    } catch (err) {
      alert("Server connection error");
    }
  };

  // 🚀 DB Delete Logic
  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete ${name}?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Product Deleted from Database!");
          await fetchInitialData();
        }
      } catch (err) {
        alert("Server connection error");
      }
    }
  };

  const openEditModal = (product) => {
    setIsEditing(true);
    setCurrentProductId(product.id);
    setCategory(product.category);
    setProductName(product.name);
    setStock(product.stock);
    setShowModal(true);
  };

  const resetForm = () => {
    setCategory("");
    setProductName("");
    setStock("");
    setCurrentProductId(null);
    setIsEditing(false);
    setShowModal(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Products Master</h1>
        <button
          onClick={() => { setIsEditing(false); setShowModal(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition duration-200"
        >
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-600 text-white text-center">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Category</th>
              <th className="p-4">Product Name</th>
              <th className="p-4">Current Stock</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="text-center border-b hover:bg-gray-50 transition duration-150">
                <td className="p-4 text-gray-600 font-medium">{item.id}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.category === "Wall Mount" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"}`}>
                    {item.category}
                  </span>
                </td>
                <td className="p-4 text-gray-800 font-semibold">{item.name}</td>
                <td className="p-4 text-blue-600 font-bold">{item.stock}</td>
                <td className="p-4">
                  <button onClick={() => openEditModal(item)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mr-2 font-medium transition">Edit</button>
                  <button onClick={() => handleDeleteProduct(item.id, item.name)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white w-[450px] rounded-xl shadow-2xl p-6">
            <h2 className="text-2xl font-bold mb-5 text-gray-800">{isEditing ? "Edit Product Details" : "Add New Product"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-300 w-full p-3 rounded-lg focus:outline-none">
                  <option value="">Select Category</option>
                  <option value="Wall Mount">Wall Mount</option>
                  <option value="Parts">Parts</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Product Name</label>
                <input type="text" placeholder="e.g. 55 Inch Wall Mount" value={productName} onChange={(e) => setProductName(e.target.value)} className="border border-gray-300 w-full p-3 rounded-lg focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">{isEditing ? "Current Stock Qty" : "Opening Quantity"}</label>
                <input type="number" placeholder="Enter stock qty" value={stock} onChange={(e) => setStock(e.target.value)} className="border border-gray-300 w-full p-3 rounded-lg focus:outline-none" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={resetForm} className="bg-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-medium">Cancel</button>
              <button onClick={isEditing ? handleSaveEdit : handleAddProduct} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md">{isEditing ? "Save Changes" : "Save Product"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}