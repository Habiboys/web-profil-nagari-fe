import { useEffect, useState } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { profileData } from '../data/mockData';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Profil', path: '/profile' },
        { name: 'Infografis', path: '/infographics' },
        { name: 'IDM', path: '/idm' },
        { name: 'Peta', path: '/listing' },
        { name: 'PPID', path: '/ppid' },
        { name: 'Berita', path: '/news' },
        { name: 'Pasar', path: '/marketplace' },
    ];

    return (
        <>
            {/* Main Navbar */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-slate-800/95 backdrop-blur-sm shadow-lg' 
                    : 'bg-transparent'
            }`}>
                <div className="container mx-auto px-4">
                    <div className="h-20 flex justify-between items-center">
                        {/* Brand */}
                        <Link to="/" className="flex items-center gap-3">
                            <img 
                                src={profileData.logo} 
                                alt="Logo" 
                                className="h-10 w-auto" 
                            />
                            <div>
                                <span className="font-bold text-lg block leading-tight text-white">
                                    {profileData.name}
                                </span>
                                <span className="text-xs text-white/70">
                                    {profileData.kabupaten}
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <NavLink 
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) => 
                                        `px-4 py-2 text-sm font-medium transition-colors ${
                                            isActive 
                                                ? 'text-white' 
                                                : 'text-white/70 hover:text-white'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>

                        {/* Mobile Toggle */}
                        <button 
                            className="lg:hidden p-2 text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/50" onClick={() => setMobileMenuOpen(false)}>
                    <div 
                        className="absolute top-0 right-0 w-72 h-full bg-white shadow-xl" 
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                            <span className="font-bold text-slate-900">Menu</span>
                            <button onClick={() => setMobileMenuOpen(false)} className="text-slate-500">
                                <MdClose size={24} />
                            </button>
                        </div>
                        <div className="py-2">
                            {navLinks.map((link) => (
                                <NavLink 
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={({ isActive }) => 
                                        `block px-5 py-3 text-sm font-medium transition-colors ${
                                            isActive 
                                                ? 'text-blue-600 bg-blue-50' 
                                                : 'text-slate-600 hover:bg-slate-50'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
