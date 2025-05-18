import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        company: "",
        address: "",
        email: "",
        phone: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            console.log("Sending data:", formData);
            const response = await axios.post("http://localhost:7070/api/auth/signup", formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000 // 10 second timeout
            });
            
            console.log("Response:", response.data);
            setSuccessMessage("Signup successful!");
            setFormData({
                fullName: "",
                company: "",
                address: "",
                email: "",
                phone: "",
                password: ""
            });
            navigate("/signin");
        } catch (err) {
            console.error("Full error:", err);
            
            if (err.response) {
                // Server responded with error status
                setErrorMessage(err.response.data.error || "Something went wrong, please try again!");
            } else if (err.request) {
                // Network error - request was made but no response
                setErrorMessage("Network error. Please check if the server is running.");
            } else {
                // Something else
                setErrorMessage("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient bg-size-200 px-4 sm:px lg:px-8">
            <div className="bg-white bg-opacity-90 rounded-xl shadow-xl p-10 w-full max-w-md space-y-6">
                <h2 className="text-3xl font-extrabold text-center text-gray-800">
                    Create your <span className="text-blue-600">Rbahi</span> account
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input 
                            type="text"
                            name="fullName"
                            id="name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50" 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                            Company/organisation name
                        </label>
                        <input 
                            type="text"
                            name="company"
                            id="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50" 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address/City
                        </label>
                        <input 
                            type="text" 
                            name="address"
                            id="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input 
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50" 
                        />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                        <Link to="/signin" className="text-blue-600 hover:underline">
                            Already have an account? Sign In
                        </Link>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    
                    {errorMessage && (
                        <div className="text-red-500 text-sm font-semibold text-center">{errorMessage}</div>
                    )}
                    {successMessage && (
                        <div className="text-green-500 text-sm font-semibold text-center">{successMessage}</div>
                    )}
                </form>
            </div>
        </div>
    );
}