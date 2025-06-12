import React, { useState, useEffect } from 'react';
import { ChevronRight, BarChart3, Brain, TrendingUp, Sparkles, Users, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/copy';

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
        <>
            <Header/>
            <main className="relative overflow-hidden">
                {/* Dynamic background elements - adjusted for mobile */}
                <div className="fixed inset-0 pointer-events-none">
                    <div 
                        className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-blue-400/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
                        style={{
                            left: mousePosition.x - (window.innerWidth < 640 ? 128 : 192),
                            top: mousePosition.y - (window.innerWidth < 640 ? 128 : 192),
                        }}
                    />
                    <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-40 h-40 sm:w-64 sm:h-64 bg-pink-400/20 rounded-full blur-3xl animate-bounce" />
                </div>

                {/* Main content */}
                <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-0">
                    {/* Animated grid background - smaller on mobile */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
                            backgroundSize: window.innerWidth < 640 ? '30px 30px' : '50px 50px'
                        }} />
                    </div>

                    <div className={`relative z-10 max-w-6xl w-full text-center transform transition-all duration-1000 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                        
                        {/* Main heading - responsive text sizes */}
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
                            Welcome to{' '}
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                                Rbahi
                            </span>
                        </h1>
                        
                        {/* Subtitle - responsive text and spacing */}
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                            Your smart business platform to{' '}
                            <span className="text-blue-400 font-semibold">track</span>,{' '}
                            <span className="text-purple-400 font-semibold">analyze</span>, and{' '}
                            <span className="text-pink-400 font-semibold">grow</span>{' '}
                            with AI-powered insights.
                        </p>
                        
                        {/* CTA Buttons - stack on mobile, side by side on larger screens */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 sm:mb-16 px-4">
                            <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 w-full sm:w-auto">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <a href="signup">Get Started Free</a>
                                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                            
                            <button className="group border-2 border-white/30 hover:border-white/50 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 backdrop-blur-sm hover:bg-white/10 w-full sm:w-auto">
                                <span className="flex items-center justify-center gap-2">
                                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <a href="https://www.linkedin.com/feed/update/urn:li:activity:7335983210285187073/" target='_blank'>Watch Demo</a>
                                </span>
                            </button>
                        </div>
                        
                        {/* Feature cards - responsive grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
                            {features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className={`group relative overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                    }`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="relative z-10">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300">
                                            <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{feature.title}</h3>
                                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Floating elements - smaller and positioned for mobile */}
                        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 animate-bounce">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full opacity-60" />
                        </div>
                        <div className="absolute top-20 sm:top-40 right-8 sm:right-20 animate-pulse">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full opacity-60" />
                        </div>
                        <div className="absolute bottom-16 sm:bottom-32 left-8 sm:left-20 animate-bounce" style={{ animationDelay: '1s' }}>
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-pink-400 rounded-full opacity-60" />
                        </div>
                    </div>
                </div>
            </main>
            
        </>
    );
}