// src/components/FileUploader.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { FiUploadCloud } from 'react-icons/fi';

const FileUploader = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setResult(null);
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            setError("");
            const response = await axios.post("http://localhost:7070/api/uploads", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            });

            setResult(response.data.result);
        } catch (err) {
            console.error("Upload error:", err);
            setError("Failed to analyze file.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full">
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Upload Your Business Data
            </h2>

            <label
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-all mb-4"
            >
            <FiUploadCloud className="text-4xl text-blue-600 mb-2" />
            <span className="text-gray-600">
                {file ? file.name : "Click to choose a CSV or Excel file"}
            </span>
            <input
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileChange}
                className="hidden"
            />
            </label>

            <button
            onClick={handleUpload}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
            >
            {loading ? "Analyzing..." : "Upload & Analyze"}
            </button>

            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

            {result && (
            <div className="mt-6 bg-gray-50 p-4 rounded-md max-h-64 overflow-auto">
                <h3 className="text-lg font-bold mb-2 text-gray-700">Analysis Result:</h3>
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
                </pre>
            </div>
            )}
        </div>
        </div>
    );
};

export default FileUploader;
