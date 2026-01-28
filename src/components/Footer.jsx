import { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { getImageUrl } from '../utils/imageUrl';

const Footer = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get(ENDPOINTS.PROFILE.GET);
                setProfile(response.data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        };
        fetchProfile();
    }, []);

    const links = [
        { name: 'Tentang Nagari', path: '/tentang' },
        { name: 'Visi & Misi', path: '/visi-misi' },
        { name: 'Struktur', path: '/struktur' },
        { name: 'Infografis', path: '/infographics' },
        { name: 'IDM', path: '/idm' },
        { name: 'Wisata', path: '/tourism' },
        { name: 'Berita', path: '/news' },
        { name: 'Pasar Nagari', path: '/marketplace' },
        { name: 'Aset', path: '/assets' },
        { name: 'PPID', path: '/ppid' },
    ];

    return (
        <footer className="bg-slate-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-500 blur-3xl"></div>
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat opacity-20"></div>
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="grid md:grid-cols-12 gap-12">
                    {/* Brand Section */}
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-4 mb-6">
                            {profile?.logo && (
                                <img src={getImageUrl(profile.logo)} alt="Logo" className="h-16 w-auto drop-shadow-lg" />
                            )}
                            <div>
                                <h3 className="font-bold text-2xl tracking-tight">{profile?.name || 'Nagari Talang Anau'}</h3>
                                <p className="text-blue-400 font-medium">{profile?.kabupaten || 'Lima Puluh Kota'}</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
                            Website resmi Pemerintah {profile?.name || 'Nagari'}. Media informasi, layanan publik, dan transparansi nagari untuk masyarakat.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: <FaFacebook size={20} />, href: '#', color: 'hover:bg-blue-600', label: 'Facebook' },
                                { icon: <FaInstagram size={20} />, href: '#', color: 'hover:bg-pink-600', label: 'Instagram' },
                                { icon: <FaYoutube size={20} />, href: '#', color: 'hover:bg-red-600', label: 'YouTube' },
                                { icon: <FaWhatsapp size={20} />, href: 'https://whatsapp.com/channel/0029VbCQmYjHgZWj0PG6WE2Q', color: 'hover:bg-green-600', label: 'WhatsApp' }
                            ].map((item, i) => (
                                <a 
                                    key={i} 
                                    href={item.href} 
                                    target={item.href.startsWith('http') ? '_blank' : undefined}
                                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-transparent transition-all ${item.color}`}
                                    aria-label={item.label}
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="md:col-span-3">
                        <h4 className="font-bold text-lg mb-6 relative inline-block">
                            Menu Utama
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500 rounded-full"></span>
                        </h4>
                        <ul className="space-y-3">
                            {links.slice(0, 5).map((link) => (
                                <li key={link.path}>
                                    <Link 
                                        to={link.path} 
                                        className="text-slate-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-500 transition-colors"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="md:col-span-4">
                        <h4 className="font-bold text-lg mb-6 relative inline-block">
                            Hubungi Kami
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500 rounded-full"></span>
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4 text-slate-400 text-sm group">
                                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors text-blue-500">
                                    <MdLocationOn size={16} />
                                </div>
                                <span className="mt-1 leading-relaxed">{profile?.address || 'Alamat belum diatur'}</span>
                            </li>
                            <li className="flex items-center gap-4 text-slate-400 text-sm group">
                                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors text-blue-500">
                                    <MdEmail size={16} />
                                </div>
                                <span>{profile?.email || 'email@contoh.com'}</span>
                            </li>
                            <li className="flex items-center gap-4 text-slate-400 text-sm group">
                                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors text-blue-500">
                                    <MdPhone size={16} />
                                </div>
                                <span>{profile?.phone || '0812-3456-7890'}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5 relative z-10 bg-black/20 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm text-center md:text-left">
                        © {new Date().getFullYear()} <span className="text-white font-medium">{profile?.name || 'Nagari Talang Anau'}</span>. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-slate-500 font-medium uppercase tracking-wider">
                        <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
