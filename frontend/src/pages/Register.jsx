import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Email might be in use.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="glass p-8 rounded-2xl w-full max-w-md animate-slide-up">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Create Account</h2>
        {error && <div className="bg-red-500/20 text-red-200 p-3 rounded mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block text-sm text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400 transition"
              required
            />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-2 rounded-lg transition shadow-lg shadow-cyan-500/30">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-slate-400 text-sm">
          Already have an account? <Link to="/login" className="text-cyan-400 hover:text-cyan-300">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
