import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Signin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading]  = useState("");


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
        setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const { email, password } = formData;

        try{
            const response = await axios.post("http://localhost:7070/api/auth/signin", formData);
            setFormData({
                email:"",
                password:""
            })
            setErrorMessage("");
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        }catch (err) {
            setErrorMessage("email or password invalid!");
            
        }
    };





    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient bg-size-200 px-4 sm:px-6 lg:px-8">
            <div className="bg-white bg-opacity-90 rounded-xl shadow-xl p-10 w-full max-w-md space-y-6">
                <h2 className="text-3xl font-extrabold text-center text-gray-800">
                    Sign In to <span className="text-blue-600"><a href="/"><span>Rbahi</span></a></span>
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input 
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        />
                    </div>
                    <div>
                        <label htmlFor="password">
                            Password
                        </label>
                            <input 
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <Link to={"/signup"} className="text-blue-600 hover:underline">
                            Don't have an account? Sign Up
                        </Link>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">
                        Sign In
                    </button>
                </form>
            </div>  
        </div>






    );


};