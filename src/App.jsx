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

// 🛡️ Strict Route Guard
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// 📦 Layout Component jo Sidebar ko set rakhega
const Layout = ({ children }) => {
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
      {/* 🔑 Login Page */}
      <Route path="/" element={<Login />} />

      {/* 🔒 Protected Routes: Ek-ek karke Layout ke andar wrap kiya */}
      <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><Layout><Products /></Layout></ProtectedRoute>} />
      <Route path="/issue-stock" element={<ProtectedRoute><Layout><IssueStock /></Layout></ProtectedRoute>} />
      <Route path="/return-stock" element={<ProtectedRoute><Layout><ReturnStock /></Layout></ProtectedRoute>} />
      <Route path="/technician-stock" element={<ProtectedRoute><Layout><TechnicianStock /></Layout></ProtectedRoute>} />
      <Route path="/installations" element={<ProtectedRoute><Layout><Installations /></Layout></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute><Layout><Transactions /></Layout></ProtectedRoute>} />

      {/* 🚨 Kuch bhi galat ho to Login par phek do */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;