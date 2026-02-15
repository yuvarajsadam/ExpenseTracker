import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpCircle, ArrowDownCircle, IndianRupee, Clock, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0, categoryBreakdown: [] });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, transactionsRes] = await Promise.all([
          api.get("/transactions/summary"),
          api.get("/transactions", { params: { limit: 5, page: 1 } })
        ]);
        setSummary(summaryRes.data);
        setRecentTransactions(transactionsRes.data.data || []);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const COLORS = ["#06b6d4", "#10b981", "##f59e0b", "#f97316", "#8b5cf6"];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
        Overview
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl border-l-4 border-l-cyan-500 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Income</p>
              <h2 className="text-2xl font-bold text-white mt-1">₹{summary.income}</h2>
            </div>
            <ArrowUpCircle className="text-cyan-500 h-10 w-10 opacity-80" />
          </div>
        </div>

        <div className="glass p-6 rounded-2xl border-l-4 border-l-orange-500 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Expenses</p>
              <h2 className="text-2xl font-bold text-white mt-1">₹{summary.expense}</h2>
            </div>
            <ArrowDownCircle className="text-orange-500 h-10 w-10 opacity-80" />
          </div>
        </div>

        <div className="glass p-6 rounded-2xl border-l-4 border-l-indigo-500 hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Balance</p>
              <h2 className="text-2xl font-bold text-white mt-1">₹{summary.balance}</h2>
            </div>
            <IndianRupee className="text-indigo-500 h-10 w-10 opacity-80" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4 text-white/90">Category Breakdown</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={summary.categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="total"
                  nameKey="_id"
                >
                  {summary.categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Recent Transactions */}
        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white/90 flex items-center gap-2">
              <Clock size={20} className="text-cyan-400" />
              Recent Transactions
            </h3>
            <Link 
              to="/transactions" 
              className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1 transition"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="space-y-3">
            {loading ? (
              <p className="text-center text-slate-400 py-8">Loading...</p>
            ) : recentTransactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400 mb-2">No transactions yet</p>
                <Link 
                  to="/transactions" 
                  className="text-cyan-400 hover:text-cyan-300 text-sm transition"
                >
                  Add your first transaction
                </Link>
              </div>
            ) : (
              recentTransactions.map((transaction) => (
                <div 
                  key={transaction._id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-900/30 hover:bg-slate-900/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'income' 
                        ? 'bg-cyan-500/20 text-cyan-400' 
                        : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowUpCircle size={16} />
                      ) : (
                        <ArrowDownCircle size={16} />
                      )}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{transaction.title}</p>
                      <p className="text-slate-400 text-xs">{transaction.category}</p>
                    </div>
                  </div>
                  <span className={`font-semibold text-sm ${
                    transaction.type === 'income' ? 'text-cyan-400' : 'text-orange-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
