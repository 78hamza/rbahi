import { Link } from "react-router-dom";

export default function Signup(){

    return (
        <div className="min-h-screen flex items-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient bg-size-200 px-4 sm:px lg:px-8 ">

            <div className="bg-white bg-opacity-90 rounded-xl shadow-xl p-10 w-full max-w-md space-y-6">
                <h2 className="text-3xl font-extrabold text-center text-gray-800">
                    Create your <span className="text-blue-600">Rbahi</span> account
                </h2>

                <form className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input 
                            type="name"
                            name="name"
                            id="name"
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        />
                    </div>
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                            Company/organisation name
                        </label>
                        <input 
                            type="text"
                            name="company"
                            id="company"
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address/City
                        </label>
                        <input 
                            type="text" 
                            name="address"
                            id="address"
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            name="email"
                            id="email"
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input 
                            type="tel"
                            name="phone"
                            id="phone"
                            required 
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                        <Link to="/signin" className="text-blue-600 hover:underline">
                            Already have an account? Sign In
                        </Link>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">
                        Sign Up
                    </button>
                </form>

            </div>
        </div>
    );
};