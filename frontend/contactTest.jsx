import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { ChevronRight, BarChart3, Brain, TrendingUp, Sparkles, Zap } from 'lucide-react';

export default function Contact() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        message : ""
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    };

    const handleSubmit = async (e) => {
        setIsLoading(true);
        setErrorMessage("")
        setSuccessMessage("");

        try {
            const response = await axios.post('http://localhost:7070/api/contact', formData, {
                headers : {
                    "Content-Type" : "application/json",
                }
            });
            
            if (!response.ok) {
                throw new Error("Network response was not ok!");
            }
            console.log("message sent successfully");
            setSuccessMessage("Message sent successfully");
            setErrorMessage("");
            setFormData({
                fullName: "",
                email: "",
                message: ""
            })
        }catch (err) {
            console.error("Message sending error: ", err);
            setErrorMessage("message sending error. Please try again!");
            setSuccessMessage("")
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}

                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Have a question or want to work together? We'd love to hear from you. 
                        Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-blue-600" />
                                </div>
                                <h3 className="ml-3 text-lg font-semibold text-gray-900">Email Us</h3>
                            </div>
                            <p className="text-gray-600">hello@company.com</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Settings className="w-5 h-5 text-green-600" />
                                </div>
                                <h3 className="ml-3 text-lg font-semibold text-gray-900">Quick Response</h3>
                            </div>
                            <p className="text-gray-600">We typically respond within 24 hours</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-purple-600" />
                                </div>
                                <h3 className="ml-3 text-lg font-semibold text-gray-900">Let's Chat</h3>
                            </div>
                            <p className="text-gray-600">Whether it's a project, question, or just to say hi!</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                            <div onSubmit={handleSubmit} className="space-y-6">
                                {/* Success Message */}
                                {successMessage && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                                        <p className="text-green-800">{successMessage}</p>
                                    </div>
                                )}

                                {/* Error Message */}
                                {errorMessage && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                                        <p className="text-red-800">{errorMessage}</p>
                                    </div>
                                )}

                                {/* Full Name Field */}
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-3 pointer-events-none">
                                            <MessageSquare className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={6}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                                            placeholder="Tell us about your project, ask a question, or just say hello..."
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                <span>Send Message</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Contact Info */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600">
                        Prefer a different way to reach out? You can also find us on social media or 
                        <span className="text-blue-600 font-medium"> call us directly</span>.
                    </p>
                </div>
            </div>
        </div>
    );

}   
