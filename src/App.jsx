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

// 🛡️ Strict Route Guard: Ye checking karega ki user logged in hai ya nahi
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    // 🔥 Agar "isAuthenticated" true nahi hai, to direct login page (/) par bhagao
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      {/* 🔑 Main Base Page: Login Screen */}
      <Route path="/" element={<Login />} />

      {/* 🔒 Protected Routes: In panno ko bina login koi nahi dekh sakta */}
      <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><Layout><Products /></Layout></ProtectedRoute>} />
      <Route path="/issue-stock" element={<ProtectedRoute><Layout><IssueStock /></Layout></ProtectedRoute>} />
      <Route path="/return-stock" element={<ProtectedRoute><Layout><ReturnStock /></Layout></ProtectedRoute>} />
      <Route path="/technician-stock" element={<ProtectedRoute><Layout><TechnicianStock /></Layout></ProtectedRoute>} />
      <Route path="/installations" element={<ProtectedRoute><Layout><Installations /></Layout></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute><Layout><Transactions /></Layout></ProtectedRoute>} />

      {/* 🚨 Wrong URL Fallback: Agar koi galat link dale, to bhi login par bhejo */}
      <Route path="*" replace element={<Navigate to="/" />} />
    </Routes>
  );
}

// 📦 Chota sa Layout Component taaki Sidebar sahi se dikhe
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