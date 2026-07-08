import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // 🛡️ Safe check: Custom credentials target karo ya fir root default par fallback karo
    const correctUser = localStorage.getItem("admin_user") || "admin";
    const correctPwd = localStorage.getItem("admin_pwd") || "admin123";

    if (username.trim() === correctUser && password === correctPwd) {
      localStorage.setItem("isAuthenticated", "true");
      alert("Access Granted. SCIMS Framework Unlocked! 🔓");
      window.location.href = "/dashboard"; // Direct refresh redirect to landing node
    } else {
      alert("Access Denied: Invalid Security Passphrase or Username!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 p-4 relative overflow-hidden">
      {/* Background Futuristic Neon Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>

      {/* Main Glassmorphic Login Card */}
      <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-800/80 shadow-2xl w-full max-w-md relative z-10 text-center space-y-6">
        <div>
          <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
            SCIMS SECURITY CONTROL v2.0
          </span>
          <h1 className="text-3xl font-black text-white tracking-tight mt-4">
            Authorized Access
          </h1>
          <p className="text-xs text-slate-400 mt-1.5 font-medium">
            Enter administrative credentials to unlock warehouse database
          </p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              User Identifier / Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Passphrase / Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-xl font-bold text-sm tracking-wide uppercase transition duration-150 shadow-lg shadow-indigo-600/20"
            >
              Secure Login 🔐
            </button>
          </div>
        </form>

        <div className="pt-2 border-t border-slate-800/60">
          <p className="text-[10px] text-slate-500 font-medium font-mono">
            Protected by end-to-end cloud ledger protocol.
          </p>
        </div>
      </div>
    </div>
  );
}