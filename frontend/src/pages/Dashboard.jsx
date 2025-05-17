import { Link } from "react-router-dom";
import React, { useState } from "react";


export default function Dashboard() {
    
    const [isSidebarOpen, setIsSidebarOpen] = useState();


    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* side bare */}
            <div className={`bg-white shadow-md p-4 space-y-4 w-64 min-h-screen transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <h2 className="text-2xl font-bold text-blue-600">Rbahi</h2>
                <nav className="flex flex-col gap-2">
                    <Link to="#" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                    <Link to="#" className="text-gray-700 hover:text-blue-600">Upload Data</Link>
                    <Link to="#" className="text-gray-700 hover:text-blue-600">Analytics</Link>
                    <Link to="#" className="text-gray-700 hover:text-blue-600">Settings</Link>
                    <Link to="/" className="text-gray-700 hover:text-blue-600">Log out</Link>

                </nav>
            </div>

            {/* content area */}

            <div className="flex-1 p-6">
                <button 
                    className="md:hidden text-gray-700 mb-4"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}    
                >
                    {isSidebarOpen? "Hide Menu" : "Show Menu"}
                </button>
                <h1 className="text-3xl font-bold text-gray-800">Welcome to your Dashboard</h1>
                <p className="text-gray-600 mt-2">
                    This will containe your analytics and insights.
                </p>
            </div>
        </div>

    );

}