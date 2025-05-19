import React, { useState } from 'react';
import { Link } from "react-router-dom";


const Header = async () => {

    return (
        <header>
            
            <div>
                <a href="/"><img src="/home/hamza-bouzian/rbahi/frontend/src/assets/logo_icon.png" alt="Logo" /></a>
                <a href="/"><h2><span className='text-blue-600 text:sm'>Rbahi</span></h2></a>
            </div>
            <nav>
                <Link to={"/"} className='text-gray-700 hover:text-blue-600'>Home</Link>
                <Link to={"/about"} className='text-gray-700 hover:text-blue-600'>About</Link>
                <Link to={"/about"} className='text-gray-700 hover:text-blue-600'>Contact</Link>
                <Link to={'/signin'} className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'>Sign In</Link>
            </nav>
        
        </header>
    );
}

export default Header;