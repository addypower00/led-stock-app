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

// 🛡️ Route Guard Component (Jo checking karega ki user logged in hai ya nahi)
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    // Agar login nahi hai, to seedhe khich kar Login page par fenk do
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      {/* 🔑 Public Route: Login Page */}
      <Route path="/" element={<Login />} />

      {/* 🔒 Protected Routes: Ye saare panno par lock lag gaya hai */}
      <Route path="/*" element={
        <ProtectedRoute>
          <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="flex-1 lg:ml-64 transition-all duration-300">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/issue-stock" element={<IssueStock />} />
                <Route path="/return-stock" element={<ReturnStock />} />
                <Route path="/technician-stock" element={<TechnicianStock />} />
                <Route path="/installations" element={<Installations />} />
                <Route path="/transactions" element={<Transactions />} />
              </Routes>
            </div>
          </div>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;