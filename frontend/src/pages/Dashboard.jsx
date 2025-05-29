import React, { useState, useEffect } from "react"; 
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

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a29bfe', '#ff6b81', '#48dbfb', '#1dd1a1'];


export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // In a real app, this would navigate to signin
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
    // In a real app, this would navigate to signin
    console.log("Logging out and should redirect to signin");
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

  // const handleProfileAccess = () => {
  //   const navigate = useNavigate();
  //   navigate('/dashboard/profile');
  // };
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold text-blue-600">Rbahi Dashboard</h1>

        <div className="flex gap-4">
          <button
            onClick={handleLogOut}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Log out
          </button>

          <button
            onClick={() => navigate("/dashboard/profile")}
            className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-lg shadow-sm transition-colors duration-200"
          >
            👤 Profile
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-lg w-64 min-h-full transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:static z-20`}
        >
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-blue-600">Menu</h2>
              <hr className="mt-2 border-blue-100" />
            </div>
            
            <nav className="flex flex-col space-y-2">
              <button
                className="text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                onClick={() => console.log("navigate to dashboard")}
              >
                <a href="/dashboard">📊 Dashboard</a> 
   
              </button>
              <button
                className="text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                onClick={() => console.log('Navigate to upload')}
              >
                <a href="/fileUpload">📁 Upload Data</a>
              </button>
              <button
                className="text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                onClick={() => console.log("navigate to advanced analytics")}
              >
                <Link to="/dashboard/advanced-analytics">📈 Advanced Analytics</Link>
                
              </button>
              <button
                className="text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                onClick={() => console.log('Navigate to settings')}
              >
                ⚙️ Settings
              </button>
            </nav>
          </div>
        </aside>

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
                onClick={() => console.log('Navigate to upload')}
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
          <p className="text-sm text-gray-500">© 2025 Rbahi Dashboard</p>
        </div>
      </footer>
    </main>
  );
}