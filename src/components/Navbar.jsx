import { useEffect, useState } from 'react';
import { MdClose, MdExpandMore, MdMenu } from 'react-icons/md';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { profileData } from '../data/mockData';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);
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
        setOpenDropdown(null);
        setMobileSubmenuOpen(null);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { 
            name: 'Profil',
            children: [
                { name: 'Tentang Nagari', path: '/tentang' },
                { name: 'Visi & Misi', path: '/visi-misi' },
                { name: 'Struktur Nagari', path: '/struktur' },
            ]
        },
        { name: 'Infografis', path: '/infographics' },
        { name: 'IDM', path: '/idm' },
        { name: 'Peta', path: '/listing' },
        { name: 'PPID', path: '/ppid' },
        { name: 'Berita', path: '/news' },
        { name: 'Pasar', path: '/marketplace' },
    ];

    const isChildActive = (children) => {
        return children?.some(child => location.pathname === child.path);
    };

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
                            {navLinks.map((link, idx) => (
                                link.children ? (
                                    // Dropdown Menu
                                    <div 
                                        key={idx}
                                        className="relative"
                                        onMouseEnter={() => setOpenDropdown(idx)}
                                        onMouseLeave={() => setOpenDropdown(null)}
                                    >
                                        <button 
                                            className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${
                                                isChildActive(link.children)
                                                    ? 'text-white' 
                                                    : 'text-white/70 hover:text-white'
                                            }`}
                                        >
                                            {link.name}
                                            <MdExpandMore size={18} className={`transition-transform ${openDropdown === idx ? 'rotate-180' : ''}`} />
                                        </button>
                                        
                                        {/* Dropdown Content */}
                                        {openDropdown === idx && (
                                            <div className="absolute top-full left-0 pt-2">
                                                <div className="bg-white rounded-lg shadow-xl py-2 min-w-48 border border-slate-100">
                                                    {link.children.map((child) => (
                                                        <NavLink
                                                            key={child.path}
                                                            to={child.path}
                                                            className={({ isActive }) =>
                                                                `block px-4 py-2.5 text-sm transition-colors ${
                                                                    isActive 
                                                                        ? 'text-blue-600 bg-blue-50 font-medium' 
                                                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                                }`
                                                            }
                                                        >
                                                            {child.name}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    // Regular Link
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
                                )
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
                            {navLinks.map((link, idx) => (
                                link.children ? (
                                    // Mobile Dropdown
                                    <div key={idx}>
                                        <button
                                            onClick={() => setMobileSubmenuOpen(mobileSubmenuOpen === idx ? null : idx)}
                                            className={`w-full px-5 py-3 text-sm font-medium flex justify-between items-center ${
                                                isChildActive(link.children)
                                                    ? 'text-blue-600 bg-blue-50'
                                                    : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                        >
                                            {link.name}
                                            <MdExpandMore 
                                                size={20} 
                                                className={`transition-transform ${mobileSubmenuOpen === idx ? 'rotate-180' : ''}`} 
                                            />
                                        </button>
                                        {mobileSubmenuOpen === idx && (
                                            <div className="bg-slate-50">
                                                {link.children.map((child) => (
                                                    <NavLink
                                                        key={child.path}
                                                        to={child.path}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className={({ isActive }) =>
                                                            `block px-8 py-2.5 text-sm ${
                                                                isActive 
                                                                    ? 'text-blue-600 font-medium' 
                                                                    : 'text-slate-500 hover:text-slate-900'
                                                            }`
                                                        }
                                                    >
                                                        {child.name}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    // Mobile Regular Link
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
                                )
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
