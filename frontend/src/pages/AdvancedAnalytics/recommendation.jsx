import React, { useState } from "react";
import { Upload, FileText, Brain, CheckCircle, AlertCircle, Loader, Star, TrendingUp, Users, BarChart3, Download, Eye } from 'lucide-react';

const RecommendationSystem = () => {
    const [status, setStatus] = useState("");
    const [file, setFile] = useState(null);
    const [recommendations, setRecommendation] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // get the userId - in real app this would come from auth context
    const userId = localStorage.getItem('userId') || 'demo_user';

    // Function to handle drag and drop
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type === 'text/csv' || droppedFile.name.endsWith('.csv') || droppedFile.name.endsWith('.xlsx') || droppedFile.name.endsWith('.xls'))) {
            setFile(droppedFile);
        }
    };

    // Function to handle the file change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) {
            setStatus("Please upload a dataset first");
            return;
        }

        if (!userId) {
            setStatus("User ID is required");
            return;
        }

        const formData = new FormData();
        formData.append('dataset', file);
        formData.append('userId', userId);
        formData.append('created_at', new Date().toISOString());

        try {
            setIsProcessing(true);
            setStatus("Processing dataset and generating recommendations...");
            setRecommendation(null);

            // Simulate API call - replace with your actual endpoint
            // const response = await axios.post('http://localhost:7071/api/dataset/upload/recommend', formData, {
            //     headers: { "Content-Type": "multipart/form-data" },
            //     timeout: 60000,
            // });

            // Demo response for visualization
            setTimeout(() => {
                const demoResponse = {
                    rowCount: 1250,
                    columns: ['user_id', 'item_name', 'rating', 'category', 'purchase_date'],
                    dataset_id: 'rec_' + Math.random().toString(36).substr(2, 9),
                    processing_time: '2.3s',
                    accuracy_score: 0.94,
                    recommendations: {
                        "user_1": [
                            { item_name: "Wireless Headphones", score: 4.8, category: "Electronics" },
                            { item_name: "Smart Watch", score: 4.6, category: "Electronics" },
                            { item_name: "Bluetooth Speaker", score: 4.4, category: "Electronics" }
                        ],
                        "user_2": [
                            { item_name: "Running Shoes", score: 4.7, category: "Sports" },
                            { item_name: "Yoga Mat", score: 4.5, category: "Sports" },
                            { item_name: "Water Bottle", score: 4.3, category: "Sports" }
                        ],
                        "user_3": [
                            { item_name: "Coffee Maker", score: 4.9, category: "Home" },
                            { item_name: "Air Fryer", score: 4.6, category: "Home" },
                            { item_name: "Blender", score: 4.4, category: "Home" }
                        ]
                    }
                };

                setStatus("Dataset processed and recommendations generated successfully!");
                setRecommendation(demoResponse);
                setIsProcessing(false);
            }, 3000);

        } catch (error) {
            setIsProcessing(false);
            console.log("Processing error: ", error);
            
            if (error.code === 'ECONNABORTED') {
                setStatus('Request timeout. Please try again with a smaller dataset.');
            } else if (error.response) {
                setStatus(`Error: ${error.response.data.error || 'Processing failed'}`);
            } else {
                setStatus('Network error. Please check if the service is running.');
            }
        }
    };

    const getStatusIcon = () => {
        if (isProcessing) return <Loader className="w-5 h-5 animate-spin" />;
        if (status.includes('successfully')) return <CheckCircle className="w-5 h-5" />;
        if (status.includes('Error') || status.includes('failed')) return <AlertCircle className="w-5 h-5" />;
        return <Brain className="w-5 h-5" />;
    };

    const getStatusColor = () => {
        if (status.includes('successfully')) return 'bg-emerald-50 border-emerald-200 text-emerald-700';
        if (status.includes('Error') || status.includes('failed')) return 'bg-red-50 border-red-200 text-red-700';
        return 'bg-blue-50 border-blue-200 text-blue-700';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full mb-6">
                        <Brain className="w-6 h-6 mr-2" />
                        <span className="font-semibold">AI-Powered Recommendations</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Recommendation System
                    </h1>
                    
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Upload your sales data and get personalized product recommendations using advanced collaborative filtering algorithms
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Upload Section */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <div className="flex items-center mb-6">
                            <Upload className="w-8 h-8 text-indigo-600 mr-3" />
                            <h2 className="text-2xl font-bold text-gray-800">Upload Dataset</h2>
                        </div>

                        {/* File Upload Area */}
                        <div 
                            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                                isDragOver 
                                    ? 'border-indigo-400 bg-indigo-50' 
                                    : file 
                                        ? 'border-emerald-400 bg-emerald-50' 
                                        : 'border-gray-300 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            {file ? (
                                <div className="space-y-4">
                                    <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-2">File Selected</h3>
                                        <p className="text-gray-600">{file.name}</p>
                                        <p className="text-sm text-gray-500">
                                            Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => setFile(null)}
                                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                                    >
                                        Remove file
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-2">
                                            Drag & drop your dataset here
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            or click to browse files
                                        </p>
                                        <input 
                                            type="file" 
                                            accept=".csv,.xlsx,.xls" 
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label 
                                            htmlFor="file-upload"
                                            className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
                                        >
                                            <Upload className="w-5 h-5 mr-2" />
                                            Choose File
                                        </label>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Supported formats: CSV, XLSX, XLS
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Process Button */}
                        <button 
                            className="w-full mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center"
                            onClick={handleSubmit}
                            disabled={!file || isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Brain className="w-5 h-5 mr-2" />
                                    Generate Recommendations
                                </>
                            )}
                        </button>

                        {/* Status Message */}
                        {status && (
                            <div className={`mt-6 p-4 rounded-xl border flex items-start ${getStatusColor()}`}>
                                <div className="mr-3 mt-0.5">
                                    {getStatusIcon()}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">{status}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Info Panel */}
                    <div className="space-y-6">
                        {/* How it works */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <Brain className="w-6 h-6 text-purple-600 mr-2" />
                                How It Works
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                                        <span className="text-purple-600 font-bold text-sm">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Upload Your Data</h4>
                                        <p className="text-gray-600 text-sm">Upload your sales or user interaction data in CSV/Excel format</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                                        <span className="text-purple-600 font-bold text-sm">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">AI Processing</h4>
                                        <p className="text-gray-600 text-sm">Our algorithm analyzes patterns and user behaviors</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                                        <span className="text-purple-600 font-bold text-sm">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Get Recommendations</h4>
                                        <p className="text-gray-600 text-sm">Receive personalized product recommendations for each user</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl shadow-xl p-8 text-white">
                            <h3 className="text-xl font-bold mb-6">Key Features</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <Star className="w-5 h-5 mr-2" />
                                    <span className="text-sm">Collaborative Filtering</span>
                                </div>
                                <div className="flex items-center">
                                    <TrendingUp className="w-5 h-5 mr-2" />
                                    <span className="text-sm">Real-time Processing</span>
                                </div>
                                <div className="flex items-center">
                                    <Users className="w-5 h-5 mr-2" />
                                    <span className="text-sm">User Segmentation</span>
                                </div>
                                <div className="flex items-center">
                                    <BarChart3 className="w-5 h-5 mr-2" />
                                    <span className="text-sm">Accuracy Metrics</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                {recommendations && (
                    <div className="mt-12 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                                <BarChart3 className="w-7 h-7 text-emerald-600 mr-3" />
                                Processing Results
                            </h3>
                            <div className="flex gap-3">
                                <button className="flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                </button>
                                <button className="flex items-center bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200 transition-colors">
                                    <Download className="w-4 h-4 mr-2" />
                                    Export Results
                                </button>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                                <div className="text-2xl font-bold text-blue-800 mb-1">{recommendations.rowCount?.toLocaleString()}</div>
                                <div className="text-blue-600 text-sm">Rows Processed</div>
                            </div>
                            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-emerald-200">
                                <div className="text-2xl font-bold text-emerald-800 mb-1">{recommendations.columns?.length}</div>
                                <div className="text-emerald-600 text-sm">Data Columns</div>
                            </div>
                            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                                <div className="text-2xl font-bold text-purple-800 mb-1">{Math.round(recommendations.accuracy_score * 100)}%</div>
                                <div className="text-purple-600 text-sm">Accuracy Score</div>
                            </div>
                            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
                                <div className="text-2xl font-bold text-orange-800 mb-1">{recommendations.processing_time}</div>
                                <div className="text-orange-600 text-sm">Processing Time</div>
                            </div>
                        </div>

                        {/* Dataset Info */}
                        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                            <h4 className="font-semibold text-gray-800 mb-4">Dataset Information</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Dataset ID</p>
                                    <p className="font-mono text-sm bg-white px-3 py-2 rounded border">{recommendations.dataset_id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Columns</p>
                                    <p className="text-sm bg-white px-3 py-2 rounded border">
                                        {recommendations.columns?.join(', ')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Recommendations Display */}
                        <div className="space-y-6">
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">Generated Recommendations</h4>
                            <div className="grid gap-6">
                                {Object.entries(recommendations.recommendations || {}).map(([userId, userRecs]) => (
                                    <div key={userId} className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
                                        <h5 className="font-semibold text-gray-800 mb-4 flex items-center">
                                            <Users className="w-5 h-5 text-indigo-600 mr-2" />
                                            User {userId}
                                        </h5>
                                        <div className="space-y-3">
                                            {userRecs.map((rec, index) => (
                                                <div key={index} className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mr-4">
                                                            {index + 1}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800">{rec.item_name}</p>
                                                            <p className="text-sm text-gray-500">{rec.category}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                                        <span className="font-semibold text-gray-800">{rec.score}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendationSystem;