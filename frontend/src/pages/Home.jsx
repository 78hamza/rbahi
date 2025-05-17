import { Link } from 'react-router-dom';


export default function Home (){

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient bg-size-200 px-4 sm:px-6 lg:px-8'>
            <div className='bg-white bg-opacity-80 rounded-xl shadow-xl p-10 max-w-2xl w-full text-center'>
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-6'>
                    Welcome to <span className='text-blue-600 mb-8'>Rbahi</span>
                </h1>
                <p className='text-base sm:text-lg md:text-xl text-gray-600 mb-8'>
                    Your smart business to track, analyze, amin-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8nd grow with AI-powered insignts.
                </p>

                <Link
                    to="/signup"
                    className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-base sm:text-lg transition'>
                        Get Started
                    </Link>
            </div>
        </div>
    );

};

