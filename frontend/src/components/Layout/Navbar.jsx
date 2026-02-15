import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { LogOut, PieChart, Wallet } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center text-white">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
        <Wallet className="text-pink-500" /> ExpenseTracker
      </Link>
      
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-pink-400 transition">Dashboard</Link>
            <Link to="/transactions" className="hover:text-pink-400 transition">Transactions</Link>
            <div className="flex items-center gap-2">
              <span className="text-sm opacity-70">Hi, {user.name}</span>
              <button 
                onClick={logout}
                className="flex items-center gap-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 px-3 py-1.5 rounded-full text-sm transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="text-white/80 hover:text-white">Login</Link>
            <Link to="/register" className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg font-medium transition shadow-lg shadow-pink-500/20">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
