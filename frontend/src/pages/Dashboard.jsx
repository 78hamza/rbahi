import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
          setTimeout(() => navigate("/signin"), 0);  // this return a manke to access to the dashboard page
      } else {
          console.log("user logged in!");
      }
    }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token"); // thjis remove the token and go dirc to the signin page
    navigate("/signin"); 
  };

  return (
    <main>
      <header className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Rbahi Dashboard</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogOut}
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="flex min-h-screen bg-gray-100">
        {/* sidebar */}

        <div
          className={`bg-white shadow-md p-4 space-y-4 w-64 min-h-screen transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          
          <nav className="flex flex-col gap-2 font-bold">
            <Link to="#" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/fileUpload" className="text-gray-700 hover:text-blue-600">
              Upload Data
            </Link>
            <Link to="#" className="text-gray-700 hover:text-blue-600">
              Analytics
            </Link>
            <Link to="#" className="text-gray-700 hover:text-blue-600">
              Settings
            </Link>
            
          </nav>
        </div>

        {/* content area */}
        <div className="flex-1 p-6">
          <button
            className="md:hidden text-gray-700 mb-4"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "Hide Menu" : "Show Menu"}
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to your Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            This will contain your analytics and insights.
          </p>
        </div>

      </div>
      <div className="mt-6 text-center">
        <img src="/src/assets/logo_icon.png" alt="" className="h-17 w-auto mx-auto"/>
        <p className="text-sm text-gray-500 mt-2">© 2025 Rbahi</p>
      </div>
    </main>
  );
}
