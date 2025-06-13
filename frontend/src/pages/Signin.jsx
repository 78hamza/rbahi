import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, BarChart3 } from 'lucide-react';
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios';


export default function SignUp () {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
        setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            const response = await axios.post('http://localhost:7070/api/auth/signin', formData);


            // check jwt
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem("userId", user.id.toString());

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            console.log("sign in process succed");
            setSuccessMessage("Sign In successfully");
            setErrorMessage("");

            setTimeout(() => {
               navigate("/dashboard");
            }, 1000);
            


        } catch (err) {
            setErrorMessage("sign in failed. Please try again");
            console.log("sign in failed", err);
            setSuccessMessage("");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image/Visual */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-40 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-white p-12 text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                        <BarChart3 className="w-12 h-12 text-white" />
                    </div>
                    
                    <h1 className="text-5xl font-bold mb-4">Welcome back to Rbahi</h1>
                    <p className="text-xl text-white/90 mb-8 max-w-md leading-relaxed">
                        Transform your business with powerful analytics and data-driven insights
                    </p>
                    
                    {/* Decorative Elements */}
                    <div className="grid grid-cols-2 gap-6 text-center mt-12">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="text-3xl font-bold mb-2">50K+</div>
                            <div className="text-white/80 text-sm">Happy Users</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="text-3xl font-bold mb-2">99.9%</div>
                            <div className="text-white/80 text-sm">Uptime</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Sign In Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center mb-8">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center mr-3">
                            <BarChart3 className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Rbahi
                        </span>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="flex mx-auto mt-4 mr-4">
                            <a href="/"><FaArrowLeftLong className="text-blue-500 mt-1 mr-2 hover:text-blue-700"/></a><a href="/"><span className="text-blue-500 mr-2 mt-2 underline hover:text-blue-700">Return Home</span></a>
                        </div>
                        <div className="text-center mb-8 mt-4">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                Sign In to <span className="text-blue-600">Rbahi</span>
                            </h2>
                            <p className="text-gray-600">Welcome back! Please sign in to your account</p>
                        </div>

                        {errorMessage && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm">{errorMessage}</p>
                            </div>
                        )}

                        {successMessage && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-600 text-sm">{successMessage}</p>
                            </div>
                        )}

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                                    placeholder="Enter your email"
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
                                        autoComplete="current-password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <button type="button" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                    Forgot password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-gray-600 text-sm">
                                Don't have an account?{" "}
                                <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                                    <a href="/signup">Sign Up</a>
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}