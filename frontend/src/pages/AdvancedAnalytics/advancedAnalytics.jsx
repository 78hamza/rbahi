import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Brain, ArrowRight, Sparkles, Target, PieChart, LineChart, Zap } from 'lucide-react';

const analyticsTools = [
    {
        name: 'Recommendation System',
        description: "Collaborative Filtering is a method used by recommender systems to make predictions about the interest of a specific user by collecting taste or preference information from many other users. Get personalized product recommendation using collaborative filtering approach, based on your sales data.",
        route: "/dashboard/advanced-analytics/recommendation",
        bg: "bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700",
        icon: Brain,
        features: ["Collaborative Filtering", "Real-time Recommendations", "Sales Data Integration"],
        complexity: "Advanced",
        time: "5-10 min setup"
    },
    {
        name: "Sales Forecasting",
        description: "Predict future sales using time series analytics and historical data trends with machine learning algorithms for accurate business planning.",
        route: "/advanced-analytics/forecasting",
        bg: "bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700",
        icon: TrendingUp,
        features: ["Time Series Analysis", "Historical Trends", "ML Predictions"],
        complexity: "Intermediate",
        time: "3-5 min setup"
    },
    {
        name: "Customer Clustering",
        description: "Segment your customers using unsupervised learning algorithms to better target your marketing campaigns and improve customer satisfaction.",
        route: "/advanced-analytics/clustering",
        bg: "bg-gradient-to-br from-orange-500 via-red-600 to-pink-700",
        icon: Users,
        features: ["K-means Clustering", "Customer Segmentation", "Marketing Optimization"],
        complexity: "Intermediate",
        time: "2-4 min setup"
    },
];

const stats = [
    { label: "Data Points Processed", value: "2.5M+", icon: BarChart3 },
    { label: "Accuracy Rate", value: "94.7%", icon: Target },
    { label: "Active Users", value: "15K+", icon: Users },
    { label: "Models Deployed", value: "127", icon: Brain }
];

export default function AdvancedAnalytics() {
    const [hoveredTool, setHoveredTool] = useState(null);

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100'>
            {/* Hero Section */}
            <section className='relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 text-white'>
                {/* Background Pattern */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/3 rounded-full blur-2xl"></div>
                </div>

                <div className='relative z-10 max-w-7xl mx-auto px-6 py-20'>
                    <div className='text-center mb-16'>
                        <div className='inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20'>
                            <Sparkles className='w-5 h-5 mr-2' />
                            <span className='text-sm font-medium'>AI-Powered Business Intelligence</span>
                        </div>
                        
                        <h1 className='text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>
                            Advanced Analytics Tools
                        </h1>
                        
                        <p className='text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed'>
                            Transform your business with cutting-edge AI algorithms and machine learning models designed to unlock deep insights from your data
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-12'>
                        {stats.map((stat, index) => (
                            <div key={index} className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all duration-300'>
                                <stat.icon className='w-8 h-8 mx-auto mb-3 text-blue-200' />
                                <div className='text-2xl font-bold mb-1'>{stat.value}</div>
                                <div className='text-sm text-blue-200'>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className='max-w-7xl mx-auto px-6 py-20'>
                <div className='text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
                        Choose Your Analytics Solution
                    </h2>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                        Select from our suite of specialized tools, each designed to solve specific business challenges with precision and intelligence.
                    </p>
                </div>

                {/* Tools Grid */}
                <div className='space-y-8'>
                    {analyticsTools.map((tool, index) => (
                        <div 
                            key={index}
                            className={`group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 ${tool.bg}`}
                            onMouseEnter={() => setHoveredTool(index)}
                            onMouseLeave={() => setHoveredTool(null)}
                        >
                            {/* Background Effects */}
                            <div className="absolute inset-0">
                                <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                                <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                            </div>

                            <div className='relative z-10 p-8 md:p-12'>
                                <div className='grid md:grid-cols-2 gap-8 items-center'>
                                    {/* Content */}
                                    <div className='text-white'>
                                        <div className='flex items-center mb-6'>
                                            <div className='w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4 border border-white/30'>
                                                <tool.icon className='w-8 h-8' />
                                            </div>
                                            <div>
                                                <h3 className='text-3xl font-bold mb-1'>{tool.name}</h3>
                                                <div className='flex items-center text-sm text-white/80'>
                                                    <span className='bg-white/20 px-3 py-1 rounded-full mr-3'>{tool.complexity}</span>
                                                    <span>{tool.time}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className='text-lg text-white/90 mb-6 leading-relaxed'>
                                            {tool.description}
                                        </p>

                                        {/* Features */}
                                        <div className='grid grid-cols-1 gap-3 mb-8'>
                                            {tool.features.map((feature, featureIndex) => (
                                                <div key={featureIndex} className='flex items-center text-white/90'>
                                                    <Zap className='w-4 h-4 mr-3 text-yellow-300' />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA Button */}
                                        <button 
                                            className='group/btn bg-white text-gray-800 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105'
                                            onClick={() => window.location.href = tool.route}
                                        >
                                            <span className='mr-2'>Get Started</span>
                                            <ArrowRight className='w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300' />
                                        </button>
                                    </div>

                                    {/* Visual Element */}
                                    <div className='relative'>
                                        <div className={`w-full h-64 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center transform transition-all duration-500 ${
                                            hoveredTool === index ? 'scale-105 rotate-1' : ''
                                        }`}>
                                            {index === 0 && <PieChart className='w-24 h-24 text-white/60' />}
                                            {index === 1 && <LineChart className='w-24 h-24 text-white/60' />}
                                            {index === 2 && <BarChart3 className='w-24 h-24 text-white/60' />}
                                        </div>
                                        
                                        {/* Floating Elements */}
                                        <div className={`absolute -top-4 -right-4 w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 flex items-center justify-center transform transition-all duration-700 ${
                                            hoveredTool === index ? 'translate-y-2 rotate-12' : ''
                                        }`}>
                                            <Sparkles className='w-6 h-6 text-white/80' />
                                        </div>
                                        
                                        <div className={`absolute -bottom-4 -left-4 w-10 h-10 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 flex items-center justify-center transform transition-all duration-700 delay-100 ${
                                            hoveredTool === index ? '-translate-y-2 -rotate-12' : ''
                                        }`}>
                                            <Target className='w-5 h-5 text-white/80' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <div className='mt-20 text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-white'>
                    <h3 className='text-3xl font-bold mb-4'>Ready to Transform Your Business?</h3>
                    <p className='text-lg text-gray-300 mb-8 max-w-2xl mx-auto'>
                        Join thousands of businesses already using our AI-powered analytics tools to make smarter decisions and drive growth.
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                        <button className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg'>
                            Start Free Trial
                        </button>
                        <button className='border-2 border-gray-600 hover:border-gray-500 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-800'>
                            Schedule Demo
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}