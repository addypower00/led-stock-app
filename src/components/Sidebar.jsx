import { Link } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaArrowDown,
  FaArrowUp,
  FaUsers,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-5 shadow-xl">
      <h1 className="text-2xl font-bold mb-8 text-center text-blue-400 tracking-wider">
        LED Inventory Pro
      </h1>

      <nav className="space-y-3">
        {/* Dashboard Link */}
        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition duration-150"
        >
          <FaHome className="text-blue-400" />
          Dashboard
        </Link>

        {/* Products Link - Isko humne '/products' ka sahi raasta de diya hai */}
        <Link
          to="/products"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition duration-150"
        >
          <FaBox className="text-green-400" />
          Products Master
        </Link>

        {/* Stock In - Hamara Issue Stock Form */}
        <Link
          to="/issue-stock"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition duration-150"
        >
          <FaArrowDown className="text-teal-400" />
          Issue Stock (In)
        </Link>

        {/* Return Stock Link */}
        <Link
          to="/return-stock"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition duration-150"
        >
          <FaSignOutAlt className="rotate-180 text-orange-400" />
          Return Stock
        </Link>

        {/* Installation Entry Link */}
        <Link
          to="/installations"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition duration-150"
        >
          <FaChartBar className="text-purple-400" />
          Installation Entry
        </Link>

        {/* Technician Stock Link */}
        <Link
          to="/technician-stock"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition duration-150"
        >
          <FaUsers className="text-yellow-400" />
          Technician Stock
        </Link>

        {/* Logout Link */}
        <Link
          to="/"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition duration-150 mt-10 font-semibold"
        >
          <FaSignOutAlt className="text-red-400" />
          Logout
        </Link>
      </nav>
    </div>
  );
}