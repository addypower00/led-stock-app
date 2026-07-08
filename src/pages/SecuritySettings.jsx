import { useState } from "react";

export default function SecuritySettings() {
  const [currentUsername, setCurrentUsername] = useState(localStorage.getItem("admin_user") || "admin");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateCredentials = (e) => {
    e.preventDefault();
    if (!newUsername.trim() || !newPassword || !confirmPassword) {
      return alert("Bhai, saari fields bharna zaroori hai!");
    }
    if (newPassword !== confirmPassword) {
      return alert("Naya password aur Confirm password match nahi ho rahe hain!");
    }

    // Save strictly to local configurations
    localStorage.setItem("admin_user", newUsername.trim());
    localStorage.setItem("admin_pwd", newPassword);
    
    alert("Security credentials successfully update ho gaye! 🔐");
    setCurrentUsername(newUsername.trim());
    setNewUsername("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-8 p-2 md:p-6 max-w-[800px] mx-auto min-h-screen bg-gray-50/50">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Security & Access Control</h1>
        <p className="text-sm text-gray-500 mt-1 font-medium">Manage root administrative credentials and gatekeeper authentication tokens.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/60 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span>🛡️</span> Update Master Credentials
        </h2>
        <p className="text-xs text-gray-400 mb-6">Current Active Username: <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{currentUsername}</span></p>

        <form onSubmit={handleUpdateCredentials} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">New Admin Username</label>
            <input
              type="text"
              placeholder="e.g., aditya_admin"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full border border-gray-200 p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">New Passphrase / Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-200 p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Confirm New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-200 p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                required
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-xl font-bold text-sm tracking-wide uppercase transition shadow-lg"
            >
              Apply New Security Lock 🔐
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}