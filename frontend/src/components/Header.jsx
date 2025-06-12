import { useEffect, useState } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

export default function ResponsiveHeader() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Simulate scroll effect for demo

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, []);
    

    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${
            scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        <a href="/">Rbahi</a>
                    </h1>
                </div>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                    {['About', 'Contact'].map((item) => (
                        <a 
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className={`font-medium transition-all duration-300 hover:scale-105 ${
                                scrolled ? 'text-white-700 hover:text-red-600' : 'text-white hover:text-blue-400'
                            }`}
                        >
                            {item}
                        </a>
                    ))}
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 lg:px-6 py-2 rounded-full font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-sm lg:text-base">
                        <a href="/signin">Sign In</a> 
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100/10"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    {mobileMenuOpen ? (
                        <X className={`w-6 h-6 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
                    ) : (
                        <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
                    )}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${
                mobileMenuOpen 
                    ? 'max-h-64 opacity-100' 
                    : 'max-h-0 opacity-0 overflow-hidden'
            } bg-white/95 backdrop-blur-md border-t border-gray-200/20`}>
                <nav className="px-4 py-4 space-y-4">
                    {['About', 'Contact'].map((item) => (
                        <a 
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="block py-2 px-4 text-gray-700 hover:text-red-600 hover:bg-gray-50/50 rounded-lg font-medium transition-all duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item}
                        </a>
                    ))}
                    <div className="pt-2">
                        <button 
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <a href="/signin" className="block">Sign In</a> 
                        </button>
                    </div>
                </nav>
            </div>

            {/* Demo scroll button */}
            {/* <button 
                onClick={}
                className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 text-sm z-50"
            >
                Toggle Scroll Effect
            </button> */}
        </header>
    );
}