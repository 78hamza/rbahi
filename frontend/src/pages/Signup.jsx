import React, { useState } from 'react';
import { Eye, EyeOff, TrendingUp, BarChart3, Users, Shield } from "lucide-react";
import axios from 'axios'

export default function SingnUp() {
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
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");


        try{
            await new Promise(resolve => setTimeout(resolve, 1500));
            const response = await axios.post('http://localhost:7070/api/auth/signup', formData);

            setSuccessMessage("Account created successfully");
            setFormData({
                fullName: "",
                company: "",
                address : "",
                email: "",
                phone: "",
                password: ""
            });
            console.log('the signup process is passing successfully');
        }catch (err) {
            setErrorMessage("something went wrong. Please try again.");
            console.error("the sign up process is not working", err);
        } finally {
            setIsLoading(false);
        }




    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Left Section - Brand & Features */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
                    <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full"></div>
                    <div className="absolute bottom-32 left-32 w-16 h-16 bg-white rounded-full"></div>
                </div>
                
                <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
                    {/* Logo */}
                    <div className="mb-12">
                        <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl mb-6 shadow-2xl">
                            <BarChart3 className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold mb-2">Rbahi</h1>
                        <p className="text-blue-200 text-lg">Analytics & Business Intelligence</p>
                    </div>

                    {/* Features */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Advanced Analytics</h3>
                                <p className="text-blue-200">Transform your data into actionable insights</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Team Collaboration</h3>
                                <p className="text-blue-200">Work together seamlessly across departments</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Enterprise Security</h3>
                                <p className="text-blue-200">Bank-level security for your sensitive data</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                        <p className="text-sm text-blue-100 italic">
                            "Rbahi has transformed how we understand our business. The insights we've gained have directly contributed to a 40% increase in efficiency."
                        </p>
                        <p className="text-xs text-blue-200 mt-2">— Sarah Johnson, CEO at TechCorp</p>
                    </div>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="lg:hidden flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl mx-auto mb-4">
                                <BarChart3 className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Create your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Rbahi</span> account
                            </h2>
                            <p className="text-gray-600">Join thousands of businesses making data-driven decisions</p>
                        </div>

                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:bg-gray-50"
                                        placeholder="Hamza Bouzian"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        id="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:bg-gray-50"
                                        placeholder="Your Company"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:bg-gray-50"
                                    placeholder="Tetouan, Mo"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:bg-gray-50"
                                    placeholder="hamza@company.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:bg-gray-50"
                                    placeholder="+212 123-456734"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:bg-gray-50"
                                        placeholder="Create a strong password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {errorMessage && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                    {errorMessage}
                                </div>
                            )}

                            {successMessage && (
                                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                                    {successMessage}
                                </div>
                            )}

                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Creating Account...
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </button>

                            <div className="text-center pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <button 
                                        onClick={() => console.log('Navigate to sign in')}
                                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                                    >
                                         <a href="/signin">Sign In</a>
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-6">
                        By creating an account, you agree to our{' '}
                        <button className="text-blue-600 hover:underline">Terms of Service</button>{' '}
                        and{' '}
                        <button className="text-blue-600 hover:underline">Privacy Policy</button>
                    </p>
                </div>
            </div>
        </div>
    );


}