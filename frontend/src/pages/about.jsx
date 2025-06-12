import React from 'react';
import { Users, Target, Award, Heart, Lightbulb, Globe, ArrowRight, Star } from 'lucide-react';
import { ChevronRight, BarChart3, Brain, TrendingUp, Sparkles, Zap } from 'lucide-react';
import Header from '../components/Header';
// import Footer from '../components/Footer';

export default function About() {
    const teamMembers = [
        {
            name: "John Smith",
            role: "Founder & CEO",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
            bio: "Passionate about creating innovative solutions that make a difference."
        },
        {
            name: "Sarah Johnson",
            role: "CTO",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
            bio: "Tech enthusiast with 10+ years of experience in software development."
        },
        {
            name: "Mike Davis",
            role: "Design Lead",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            bio: "Creative designer focused on user experience and beautiful interfaces."
        }
    ];

    const values = [
        {
            icon: <Heart className="w-8 h-8 text-red-500" />,
            title: "Passion",
            description: "We love what we do and it shows in every project we deliver."
        },
        {
            icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
            title: "Innovation",
            description: "Always pushing boundaries and exploring new possibilities."
        },
        {
            icon: <Users className="w-8 h-8 text-blue-500" />,
            title: "Collaboration",
            description: "Working together to achieve extraordinary results."
        },
        {
            icon: <Award className="w-8 h-8 text-purple-500" />,
            title: "Excellence",
            description: "Committed to delivering the highest quality in everything we do."
        }
    ];

    const stats = [
        { number: "500+", label: "Projects Completed" },
        { number: "50+", label: "Happy Clients" },
        { number: "5+", label: "Years Experience" },
        { number: "24/7", label: "Support Available" }
    ];

    return (
        <>
        <Header />
        <div className="min-h-screen bg-white">
        

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
                    <div className="absolute top-32 right-20 w-16 h-16 bg-white opacity-10 rounded-full"></div>
                    <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white opacity-10 rounded-full"></div>
                </div>
                
                <div className="relative max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Our Story</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        We're a passionate team of innovators, creators, and problem-solvers 
                        dedicated to building exceptional digital experiences.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                We believe technology should empower people and businesses to achieve their dreams. 
                                Our mission is to create innovative, user-friendly solutions that solve real-world 
                                problems and make a positive impact on the communities we serve.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Every project we undertake is guided by our commitment to excellence, creativity, 
                                and the belief that great design and development can change the world.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                                <Globe className="w-12 h-12 mb-4 text-blue-200" />
                                <h3 className="text-2xl font-bold mb-4">Global Impact</h3>
                                <p className="text-blue-100 mb-6">
                                    Our work spans across continents, helping businesses of all sizes 
                                    achieve their digital transformation goals.
                                </p>
                                <div className="flex items-center text-blue-200">
                                    <span>Learn more about our projects</span>
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            These core principles guide everything we do and shape the way we work with our clients and each other.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
                                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The talented individuals behind our success. Each bringing unique skills and perspectives to create something amazing.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                                <div className="relative overflow-hidden">
                                    <img 
                                        src={member.image} 
                                        alt={member.name}
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                                    <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}

            {/* CTA Section */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                            ))}
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Work Together?</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Let's turn your ideas into reality. Get in touch with us today and discover 
                        how we can help bring your vision to life.
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center space-x-2 shadow-lg">
                        <a href="/contact"><span>Start Your Project</span></a>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}