import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import IssueStock from "./pages/IssueStock";
import ReturnStock from "./pages/ReturnStock";
import TechnicianStock from "./pages/TechnicianStock";
import Installations from "./pages/Installations";
import Transactions from "./pages/Transactions";
import Login from "./pages/Login";

// 🛡️ Strict Route Guard: Agar user logged in nahi hai, toh use login (/) par phek do
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-64 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      {/* 🔑 Open Route: Login Page */}
      <Route path="/" element={<Login />} />

      {/* 🔒 Protected Routes: Inme bina login ke entry band */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      <Route path="/issue-stock" element={<ProtectedRoute><IssueStock /></ProtectedRoute>} />
      <Route path="/return-stock" element={<ProtectedRoute><ReturnStock /></ProtectedRoute>} />
      <Route path="/technician-stock" element={<ProtectedRoute><TechnicianStock /></ProtectedRoute>} />
      <Route path="/installations" element={<ProtectedRoute><Installations /></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />

      {/* 🚨 Kuch bhi galat URL ho to seedhe Login Page par bhej do */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;