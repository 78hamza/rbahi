import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function UploadSection({ onFileUpload }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const handleFileCharge = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = (e) => {
        if (selectedFile && onFileUpload){
            onFileUpload(selectedFile);

        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4 text-center">Upload Your sales file.</h2>
                <input 
                    type="file"
                    accept=".csv, .xlsx"
                    onChange={handleFileCharge} 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0 file:text-sm file:font-semibold
                        file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                {selectedFile && (
                    <p className="mt-2 text-sm text-gray-700">
                        Selected: <strong>{selectedFile.name}</strong>
                    </p>
                )}
                <button 
                    onClick={handleUpload} 
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
                >
                    Analyse File
                </button>
            </div>
        </div>
    );
}