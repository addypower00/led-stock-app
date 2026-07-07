import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🛡️ Page khulte hi agar pehle se koi login bacha ho, to use khatam karo
  useEffect(() => {
    localStorage.removeItem("isAuthenticated");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault(); // Page ko reload hone se rokna sabse zaroori hai

    // 🔐 MASTER CREDENTIALS CHECKING
    if (username.trim() === "admin" && password === "admin123") {
      localStorage.setItem("isAuthenticated", "true"); // Local memory set hui
      alert("Login Successful! Welcome to SCIMS Portal 🔓");
      navigate("/dashboard", { replace: true }); // Direct force redirect
    } else {
      alert("⚠️ Invalid Username or Password! Access Denied.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">SCIMS PORTAL</h1>
          <p className="text-sm text-gray-500 mt-1">LED Inventory Control System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition font-medium"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition duration-150 uppercase tracking-wider text-sm"
          >
            Secure Login 🔐
          </button>
        </form>
      </div>
    </div>
  );
}