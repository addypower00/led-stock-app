import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/products", label: "Products Master", icon: "📦" },
    { path: "/issue", label: "Issue Material", icon: "🚚" },
    { path: "/return", label: "Return Material", icon: "📥" },
    { path: "/tech-stock", label: "Tech Hand-Stock", icon: "👷‍♂️" },
    { path: "/installations", label: "Installation Logs", icon: "📋" },
    { path: "/security", label: "Security Settings", icon: "🔐" },
  ];

  const handleLogout = () => {
    if (window.confirm("Bhai, kya aap log out karna chahte hain?")) {
      localStorage.removeItem("isAuthenticated");
      window.location.href = "/";
    }
  };

  return (
    <div className="w-64 bg-slate-950 text-slate-300 min-h-screen flex flex-col border-r border-slate-900 justify-between p-4 z-20">
      
      {/* Upper Brand Sector */}
      <div className="space-y-8">
        <div className="p-2 border-b border-slate-900">
          <h2 className="text-xl font-black text-white tracking-wider uppercase flex items-center gap-2">
            <span className="text-indigo-500">⚡</span> SCIMS CONTROL
          </h2>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest mt-0.5">Live Cloud Database v2.4</p>
        </div>

        {/* Dynamic Navigation Architecture */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-150 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                    : "hover:bg-slate-900 hover:text-white"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Branding Panel with Developer Credit */}
      <div className="space-y-4 pt-4 border-t border-slate-900">
        
        {/* 🌟 Permanent Credit Visible Across ALL Pages */}
        <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-900 text-center">
          <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Framework Author</p>
          <p className="text-xs font-black text-slate-200 mt-1 tracking-wide">
            Developed by <span className="text-indigo-400 block mt-0.5">Aditya Dixit</span>
          </p>
        </div>

        {/* Logout System Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-rose-600/10 hover:bg-rose-600 border border-rose-600/20 text-rose-500 hover:text-white font-bold text-xs p-3.5 rounded-xl transition duration-150 uppercase tracking-wider flex items-center justify-center gap-2"
        >
          🚫 Lock & Logout
        </button>
      </div>

    </div>
  );
}