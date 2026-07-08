import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout and lock the portal?")) {
      localStorage.removeItem("isAuthenticated"); // Session khatam!
      alert("Logged out successfully! Portal is now locked. 🔒");
      navigate("/"); // Wapas login page par bhejo
    }
  };

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-5 space-y-6 hidden lg:block shadow-2xl border-r border-gray-800">
      <div className="mb-8 text-center border-b border-gray-800 pb-5">
        <h2 className="text-2xl font-black tracking-wider text-blue-400">SCIMS CONTROL</h2>
        <p className="text-xs text-gray-400 mt-1">Live Cloud Database v2.0</p>
      </div>

      <nav className="space-y-2">
        <Link to="/dashboard" className="block p-3 rounded-xl font-semibold hover:bg-gray-800 transition">📊 Dashboard</Link>
        <Link to="/products" className="block p-3 rounded-xl font-semibold hover:bg-gray-800 transition">📦 Products Master</Link>
        <Link to="/issue-stock" className="block p-3 rounded-xl font-semibold hover:bg-gray-800 transition">🚚 Issue Material</Link>
        <Link to="/return-stock" className="block p-3 rounded-xl font-semibold hover:bg-gray-800 transition">📥 Return Material</Link>
        <Link to="/technician-stock" className="block p-3 rounded-xl font-semibold hover:bg-gray-800 transition">🧑‍🔧 Tech Hand-Stock</Link>
        <Link to="/installations" className="block p-3 rounded-xl font-semibold hover:bg-gray-800 transition">📺 Installation Logs</Link>
      <Link to="/security" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition">
  <span>🔐</span> Security Settings
</Link>
      </nav>

      {/* 🛑 SECURE LOGOUT BUTTON */}
      <div className="pt-10 border-t border-gray-800">
        <button 
          onClick={handleLogout}
          className="w-full bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white p-3 rounded-xl font-bold transition duration-150 flex items-center justify-center gap-2 border border-red-600/30"
        >
          🚫 Lock & Logout
        </button>
      </div>
    </div>
  );
}