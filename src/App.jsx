import { Routes, Route, Navigate } from "react-router-dom";
import { InventoryProvider } from "./context/InventoryContext";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import IssueStock from "./pages/IssueStock";
import ReturnStock from "./pages/ReturnStock";
import TechnicianStock from "./pages/TechnicianStock";
import Installations from "./pages/Installations";
import SecuritySettings from "./pages/SecuritySettings";

// 🛡️ Safe Gatekeeper: Context and storage state configuration validation
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    // Session token agar miss hai toh return validation gate
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex bg-gray-50/50 min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <InventoryProvider>
      <Routes>
        {/* Public Landing Terminal */}
        <Route path="/" element={<Login />} />

        {/* Secure Administration Workspaces */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/issue" element={<ProtectedRoute><IssueStock /></ProtectedRoute>} />
        <Route path="/return" element={<ProtectedRoute><ReturnStock /></ProtectedRoute>} />
        <Route path="/tech-stock" element={<ProtectedRoute><TechnicianStock /></ProtectedRoute>} />
        <Route path="/installations" element={<ProtectedRoute><Installations /></ProtectedRoute>} />
        <Route path="/security" element={<ProtectedRoute><SecuritySettings /></ProtectedRoute>} />

        {/* Global Redirect Interceptor */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </InventoryProvider>
  );
}