import React, { useState, useEffect } from "react"; 
import Footer from "../components/copy";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";
import {
  BarChart3,
  Upload,
  TrendingUp,
  Settings,
  LogOut,
  User,
  Menu,
  X,
  DollarSign,
  Package,
  Users,
  Activity,
  ChevronRight,
  Calendar,
  TrendingDown,
  Eye,
  Download
} from "lucide-react";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a29bfe', '#ff6b81', '#48dbfb', '#1dd1a1'];


export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/signin')
      console.log("No token found, should redirect to signin");
    } else {
      console.log("user logged in!");
    }
  }, []);

  useEffect(() => {
    
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:7071/api/stats");
        const data = await response.json();
        console.log("full response", data);
        setStats(data);
      } catch (e) {
        console.error("Error fetching stats", e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // In a real app, this would navigate to signin
    navigate("/signin")
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const getStatDisplayValue = (metric, value) => {
    if (metric === 'count') return Math.round(value).toLocaleString();
    if (metric === 'mean' || metric === 'min' || metric === 'max' || metric === '25%' || metric === '50%' || metric === '75%') {
      return formatCurrency(value);
    }
    return value.toFixed(2);
  };
  const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard", active: true },
    { icon: Upload, label: "Upload Data", href: "/dashboard/fileUpload", active:true },
    { icon: TrendingUp, label: "Advanced Analytics", href: "/dashboard/advanced-analytics", active:true },
    { icon: Settings, label: "Settings", href: "/dashboard/settings", active:false }
  ];


  // const handleProfileAccess = () => {
  //   const navigate = useNavigate();
  //   navigate('/dashboard/profile');
  // };
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Rbahi Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard/profile")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 text-gray-700 hover:text-gray-900"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </button>
            <button
              onClick={handleLogOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>
      </header>
      {/* Body */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white/80 backdrop-blur-md border-r border-gray-200 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}>
          <div className="p-6 pt-8">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Navigation</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>
            
            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    item.active 
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-200" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => navigate(item.href)}
                >
                  <item.icon className={`w-5 h-5 ${item.active ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`} />
                  <span className="font-medium">{item.label}</span>
                  {item.active && <ChevronRight className="w-4 h-4 ml-auto text-blue-400" />}
                </button>
              ))}
            </nav>
          </div>
        </aside>
       {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}


        {/* Main Content */}
        <div className="flex-1 p-6 md:ml-0">
          <button
            className="md:hidden bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600 transition-colors"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "Hide Menu" : "Show Menu"}
          </button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Data Summary Statistics</h1>
            <p className="text-gray-600 mt-2">Comprehensive insights from your uploaded sales data</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading statistics...</span>
            </div>
          ) : stats ? (
            <div className="space-y-8">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Records</h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {stats.describe?.total?.count?.toLocaleString() || 'N/A'}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Avg Total</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {stats.describe?.total?.mean ? formatCurrency(stats.describe.total.mean) : 'N/A'}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Products</h3>
                  <p className="text-3xl font-bold text-purple-600">
                    {Object.keys(stats.top_products || {}).length}
                  </p>
                </div>
              </div>

              {/* Stats Table */}
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">Statistical Summary</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Metrics</th>
                        {Object.keys(stats.describe || {}).map((col) => (
                          <th key={col} className="px-6 py-4 text-left text-sm font-semibold text-gray-700 capitalize">{col.replace('_', ' ')}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {stats.describe && Object.keys(stats.describe[Object.keys(stats.describe)[0]] || {}).map((metric) => (
                        <tr key={metric} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold text-gray-700 capitalize">{metric}</td>
                          {Object.keys(stats.describe).map((col) => (
                            <td key={col + metric} className="px-6 py-4 text-gray-600">
                              {stats.describe[col][metric] ? getStatDisplayValue(metric, stats.describe[col][metric]) : 'N/A'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Monthly Sales Trend Chart */}
                {stats.sales_by_month && Object.keys(stats.sales_by_month).length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border">
                    <div className="p-6 border-b">
                      <h2 className="text-xl font-semibold text-gray-800">Monthly Sales Trend</h2>
                    </div>
                    <div className="p-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                          data={Object.entries(stats.sales_by_month)
                            .sort(([a], [b]) => new Date(a) - new Date(b))
                            .map(([month, total]) => ({ 
                              month: new Date(month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), 
                              total 
                            }))}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="month" stroke="#666" />
                          <YAxis stroke="#666" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                          <Tooltip 
                            formatter={(value) => [formatCurrency(value), 'Sales']}
                            labelStyle={{ color: '#333' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="total" 
                            stroke="#3182ce" 
                            strokeWidth={3}
                            dot={{ fill: '#3182ce', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: '#3182ce', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Top Products Pie Chart */}
                {stats.top_products && Object.keys(stats.top_products).length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border">
                    <div className="p-6 border-b">
                      <h2 className="text-xl font-semibold text-gray-800">Top Products by Revenue</h2>
                    </div>
                    <div className="p-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={Object.entries(stats.top_products).map(([name, value]) => ({ name, value }))}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                            labelLine={false}
                          >
                            {Object.keys(stats.top_products).map((_, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>

              {/* Top Products Bar Chart */}
              {stats.top_products && Object.keys(stats.top_products).length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Product Performance</h2>
                  </div>
                  <div className="p-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={Object.entries(stats.top_products)
                          .sort(([,a], [,b]) => b - a)
                          .map(([name, value]) => ({ name, value }))}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="name" 
                          stroke="#666" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis stroke="#666" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                        <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Data Available</h3>
              <p className="text-gray-500 mb-6">
                Upload a CSV or Excel file to see your data statistics and insights.
              </p>
              <button
                onClick={() => navigate("/dashboard/fileUpload")}
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Upload Data
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-8">
        <div className="text-center">
          <div className="text-4xl mb-2"><img src="/home/hamza-bouzian/rbahi/frontend/src/assets/logo_icon.png" alt="Logo" /></div>
          {/* <p className="text-sm text-gray-500">© 2025 Rbahi Dashboard</p> */}
          <Footer />
        </div>
      </footer>
    </main>
  );
}