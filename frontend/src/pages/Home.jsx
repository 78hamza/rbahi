import React, { useState, useEffect } from 'react';
import { ChevronRight, BarChart3, Brain, TrendingUp, Sparkles, Users, Zap } from 'lucide-react';

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsVisible(true);
        
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const features = [
        { icon: BarChart3, title: "Analytics", description: "Real-time insights" },
        { icon: Brain, title: "AI-Powered", description: "Smart predictions" },
        { icon: TrendingUp, title: "Growth", description: "Scale your business" }
    ];

    return (
        <main className="relative overflow-hidden">
            {/* Dynamic background elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div 
                    className="absolute w-96 h-96 bg-blue-400/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
                    style={{
                        left: mousePosition.x - 192,
                        top: mousePosition.y - 192,
                    }}
                />
                <div className="absolute top-20 right-20 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl animate-bounce" />
            </div>

            {/* Header */}
            <header className="relative z-50 w-full backdrop-blur-md bg-white/80 border-b border-white/20 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            <a href="/">Rbahi</a>
                        </h1>
                    </div>
                    
                    <nav className="flex items-center gap-8">
                        <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group">
                            <a href="/">Home</a> 
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
                        </a>
                        <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group">
                            About
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
                        </a>
                        <a href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group">
                            Contact
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
                        </a>
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                            <a href="/signin">Sign In</a> 
                        </button>
                    </nav>
                </div>
            </header>

            {/* Main content */}
            <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 sm:px-6 lg:px-8">
                {/* Animated grid background */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                <div className={`relative z-10 max-w-6xl w-full text-center transform transition-all duration-1000 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                    
                    {/* Hero badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8 text-sm text-white/90 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span>AI-Powered Business Intelligence</span>
                        <ChevronRight className="w-4 h-4" />
                    </div>
                    
                    {/* Main heading */}
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Welcome to{' '}
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                            Rbahi
                        </span>
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Your smart business platform to{' '}
                        <span className="text-blue-400 font-semibold">track</span>,{' '}
                        <span className="text-purple-400 font-semibold">analyze</span>, and{' '}
                        <span className="text-pink-400 font-semibold">grow</span>{' '}
                        with AI-powered insights.
                    </p>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25">
                            <span className="relative z-10 flex items-center gap-2">
                                <a href="signup">Get Started Free</a>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                        
                        <button className="group border-2 border-white/30 hover:border-white/50 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 backdrop-blur-sm hover:bg-white/10">
                            <span className="flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                Watch Demo
                            </span>
                        </button>
                    </div>
                    
                    {/* Feature cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {features.map((feature, index) => (
                            <div 
                                key={index}
                                className={`group relative overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300">
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-300">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute top-20 left-10 animate-bounce">
                        <div className="w-3 h-3 bg-blue-400 rounded-full opacity-60" />
                    </div>
                    <div className="absolute top-40 right-20 animate-pulse">
                        <div className="w-2 h-2 bg-purple-400 rounded-full opacity-60" />
                    </div>
                    <div className="absolute bottom-32 left-20 animate-bounce" style={{ animationDelay: '1s' }}>
                        <div className="w-4 h-4 bg-pink-400 rounded-full opacity-60" />
                    </div>
                </div>
            </div>
        </main>
    );
}