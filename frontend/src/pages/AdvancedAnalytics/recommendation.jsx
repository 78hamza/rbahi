import React, { useState } from "react";
import axios from "axios";

const RecommendationSystem = () => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("")
    const userId = localStorage.getItem('userId');


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file){
            setStatus('please upload a file first.');
            return;
        }
    };
    
    const formData = new FormData();
    formData.append("dataset", file);
    formData.append("userId", userId);
    formData.append("created_at", new Date().toISOString());

    const handeSubmit = async () => {

        try{
            setStatus('loading...');
            const response = await axios.post("http://localhost:7070/api/advanced-analytics/recommendation/upload", formData, {
                headers: {
                    "Content-Type" : "multipart/form-data",
                },
            });
    
            setStatus("Uploaded successfullty re")
        }catch (error) {
            console.error("upload error: ", error);
            setStatus('upload failed.')
        }
    }

    return (
        <div className="p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Recommendation system</h2>
            <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handeSubmit}>Send Dataset</button>
            <p className="mt-4">{status}</p>
        </div>
    );
};

export default RecommendationSystem;

