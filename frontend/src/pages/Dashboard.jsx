import { useState, useEffect } from "react";
import api from "../utils/api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpCircle, ArrowDownCircle, IndianRupee } from "lucide-react";

const Dashboard = () => {
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0, categoryBreakdown: [] });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await api.get("/transactions/summary");
        setSummary(data);
      } catch (error) {
        console.error("Error fetching summary", error);
      }
    };
    fetchSummary();
  }, []);

  const COLORS = ["#06b6d4", "#10b981", "#f59e0b", "#f97316", "#8b5cf6"];

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
        
        {/* Placeholder for Recent Transactions or Line Chart */}
        <div className="glass p-6 rounded-2xl flex items-center justify-center border-dashed border-2 border-white/10">
          <p className="text-slate-500">Expense Trends (Coming Soon)</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
