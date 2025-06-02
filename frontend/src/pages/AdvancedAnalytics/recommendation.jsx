import React, { useState } from "react";
import axios from 'axios';

const RecommendationSystem =  () => {
    const [status, setStatus] = useState("");
    const [file, setFile] = useState(null);
    const [recommendations, setRecommendation] = useState(null);


    // get the userId
    const userId = localStorage.getItem('userId');

    // funciton to handle the file change
    const handleFileChange = async (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) {
            setStatus("please upload the data first");
            console.log("the data is not uploaded");
            return ;
        }

        if (!userId) {
            setStatus("the userId is required");
            console.log("the userId is required");
            return;
        }

        const formData = new FormData();

        formData.append('dataset', file);
        formData.append('userId', userId);
        formData.append('created_at', Date.now().toISOString);

        try{
            setStatus("Processing datset and generating recommendations...");
            setRecommendation(null);

            //singel call to the microservice 
            const response = await axios.post('http://localhost:7071/api/dataset/upload/recommend', formData, {
                headers: {
                    "Content-Type" : "multipart/form-data",
                }, 
                timeoute: 60000, // 60 second for processing
            })


            setStatus("data set processind and recommendations generated successfully");
            setRecommendation(response.data);
            console.log("response data", response.data);
        }catch (error) {
            console.log("processing error: ", error);

            if (error.code === 'ECONNABORTED'){
                setStatus('request timeout, please try agina with the similar dataset');
            }else if (error.response){
                setStatus(`error: ${error.response.data.error || 'processing failed'}`);
            }else {
                setStatus('network error. please check if the microservice is runnign')
            }
        }
    }

    return (
        <div className="p-6 bg-white rounded shadow max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Recommendation System</h2>
            
            <div className="mb-4">
                <input 
                    type="file" 
                    accept=".csv, .xlsx, .xls" 
                    onChange={handleFileChange}
                    className="mb-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {file && (
                    <p className="text-sm text-gray-600">
                        Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                )}
            </div>

            <button 
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={!file || status.includes('Processing')}
            >
                {status.includes('Processing') ? 'Processing...' : 'Process Dataset & Get Recommendations'}
            </button>

            {status && (
                <div className={`mt-4 p-3 rounded ${
                    status.includes('successfully') ? 'bg-green-100 text-green-700' :
                    status.includes('Error') || status.includes('failed') ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                }`}>
                    {status}
                </div>
            )}

            {recommendations && (
                <div className="mt-6 p-4 bg-gray-50 rounded">
                    <h3 className="font-semibold mb-2">Processing Results:</h3>
                    <div className="text-sm space-y-1">
                        {recommendations.rowCount && (
                            <p><strong>Rows processed:</strong> {recommendations.rowCount}</p>
                        )}
                        {recommendations.columns && (
                            <p><strong>Columns:</strong> {recommendations.columns.join(', ')}</p>
                        )}
                        {recommendations.dataset_id && (
                            <p><strong>Dataset ID:</strong> {recommendations.dataset_id}</p>
                        )}
                        {recommendations.recommendations && (
                            <div className="mt-3">
                                <strong>Recommendations:</strong>
                                <pre className="bg-white p-2 rounded mt-1 text-xs overflow-auto">
                                    {JSON.stringify(recommendations.recommendations, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
    

};

export default RecommendationSystem;