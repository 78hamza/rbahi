import { Link } from "react-router-dom";


export default function Signin() {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient bg-size-200 px-4 sm:px-6 lg:px-8">
            <div className="bg-white bg-opacity-90 rounded-xl shadow-xl p-10 w-full max-w-md space-y-6">
                <h2 className="text-3xl font-extrabold text-center text-gray-800">
                    Sign In to <span className="text-blue-600">Rbahi</span>
                </h2>

                <form className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input 
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
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