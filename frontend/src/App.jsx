import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Layout/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Transactions from "./pages/Transactions";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
  
  return user ? children : <Navigate to="/login" />;
};

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-6">
    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-pulse">
      Master Your Finances
    </h1>
    <p className="text-slate-400 text-lg max-w-2xl">
      Track your expenses, analyze spending habits, and achieve financial freedom with our modern, AI-powered insights platform.
    </p>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-pink-500/30">
          <div className="fixed inset-0 -z-10 h-full w-full bg-slate-950 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-50"></div>
          <Navbar />
          <Routes>
            
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/transactions" 
              element={
                <PrivateRoute>
                  <Transactions />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
