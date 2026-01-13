import { useEffect, useState } from 'react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdClose, MdFacebook, MdMenu } from 'react-icons/md';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { profileData } from '../data/mockData';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

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
            {/* Top Bar - Static (Scrolls away) */}
            <div className="bg-slate-900 text-white text-xs py-2 w-full z-50 relative border-b border-slate-800 hidden lg:block">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-6 font-medium tracking-wide">
                        <div className="flex items-center gap-2">
                            <span className="text-slate-400">Email:</span>
                            <span className="hover:text-blue-400 cursor-pointer transition-colors">{profileData.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-400">Telp:</span>
                            <span>{profileData.phone}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-4">
                            {[MdFacebook, FaInstagram, FaYoutube, FaTwitter].map((Icon, idx) => (
                                <a key={idx} href="#" className="text-slate-400 hover:text-white transition-colors">
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar - Sticky */}
            <nav className={`sticky top-0 w-full z-40 bg-white border-b border-gray-200 transition-all duration-200 ${scrolled ? 'shadow-md' : ''}`}>
                <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-4 group h-full py-4 mr-8">
                        <img 
                            src={profileData.logo} 
                            alt="Logo" 
                            className="h-full w-auto object-contain" 
                        />
                        <div className="flex flex-col justify-center h-full">
                            <span className="font-black text-xl text-slate-900 leading-none uppercase tracking-tighter group-hover:text-blue-700 transition-colors">
                                {profileData.name}
                            </span>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
                                {profileData.kabupaten}
                            </span>
                        </div>
                    </Link>

                    {/* Navigation - Modern Centered */}
                    <div className="hidden xl:flex h-full items-center">
                        {navLinks.map((link, index) => (
                            <NavLink 
                                key={index}
                                to={link.path}
                                className={({ isActive }) => 
                                    `relative h-full flex items-center px-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 border-b-4 ${
                                        isActive 
                                            ? 'text-slate-900 border-slate-900 bg-gray-50' 
                                            : 'text-slate-500 border-transparent hover:text-slate-900 hover:bg-gray-50 hover:border-gray-200'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="hidden xl:flex items-center gap-4 pl-6 border-l border-gray-200 h-10 my-auto">
                        <button className="flex items-center gap-2 text-slate-900 font-bold uppercase text-sm tracking-wide hover:text-blue-700 transition-colors">
                           <MdMenu size={20} />
                           Menu Lain
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button 
                        className="xl:hidden p-3 bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-white transition-all"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="xl:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
                    <div className="absolute top-0 right-0 w-[80%] h-full bg-white shadow-2xl p-0 flex flex-col animate-in slide-in-from-right duration-300" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-900 text-white">
                             <span className="font-black uppercase tracking-widest text-lg">Menu</span>
                             <button onClick={() => setMobileMenuOpen(false)}>
                                <MdClose size={24} />
                             </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {navLinks.map((link, index) => (
                                <NavLink 
                                    key={index}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={({ isActive }) => 
                                        `block p-6 text-sm font-bold uppercase tracking-widest border-b border-gray-100 ${
                                            isActive 
                                                ? 'bg-blue-50 text-blue-700 border-l-4 border-l-blue-700' 
                                                : 'text-slate-600 hover:bg-gray-50'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-gray-200">
                             <div className="flex justify-center gap-6 mb-4">
                                {[MdFacebook, FaInstagram, FaYoutube, FaTwitter].map((Icon, idx) => (
                                    <a key={idx} href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
