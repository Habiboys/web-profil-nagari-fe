import { useEffect, useState } from 'react';
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
        <footer className="bg-slate-900 text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            {profile?.logo && (
                                <img src={getImageUrl(profile.logo)} alt="Logo" className="h-10 w-auto brightness-200" />
                            )}
                            <div>
                                <h3 className="font-bold text-lg">{profile?.name || 'Nagari Talang Anau'}</h3>
                                <p className="text-slate-400 text-sm">{profile?.kabupaten || 'Lima Puluh Kota'}</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Website resmi Pemerintah {profile?.name || 'Nagari'}. Media informasi dan transparansi publik.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-medium text-sm text-slate-400 uppercase tracking-wider mb-4">Menu</h4>
                        <ul className="space-y-2">
                            {links.map((link) => (
                                <li key={link.path}>
                                    <Link 
                                        to={link.path} 
                                        className="text-slate-300 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-medium text-sm text-slate-400 uppercase tracking-wider mb-4">Kontak</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-slate-300 text-sm">
                                <MdLocationOn className="mt-0.5 text-slate-500 shrink-0" size={18} />
                                <span>{profile?.address || '-'}</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm">
                                <MdEmail className="text-slate-500 shrink-0" size={18} />
                                <span>{profile?.email || '-'}</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm">
                                <MdPhone className="text-slate-500 shrink-0" size={18} />
                                <span>{profile?.phone || '-'}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-slate-800">
                <div className="container mx-auto px-4 py-6">
                    <p className="text-center text-slate-500 text-sm">
                        © {new Date().getFullYear()} {profile?.name || 'Nagari Talang Anau'}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
