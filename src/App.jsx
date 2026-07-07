import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import IssueStock from "./pages/IssueStock";
import Products from "./pages/Products";
import TechnicianStock from "./pages/TechnicianStock";
import Installations from "./pages/Installations";
import ReturnStock from "./pages/ReturnStock";
import Sidebar from "./components/Sidebar";

// Ek chota sa Component jo har page ke side me Sidebar ko fix rakhega
function MainLayout({ children }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page bina Sidebar ke dikhega */}
        <Route path="/" element={<Login />} />

        {/* Baaki saare pages automatic Sidebar ke sath dikhenge */}
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
        <Route path="/issue-stock" element={<MainLayout><IssueStock /></MainLayout>} />
        <Route path="/technician-stock" element={<MainLayout><TechnicianStock /></MainLayout>} />
        <Route path="/installations" element={<MainLayout><Installations /></MainLayout>} />
        <Route path="/return-stock" element={<MainLayout><ReturnStock /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;