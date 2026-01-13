import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { profileData } from '../data/mockData';

const Footer = () => {
    const links = [
        { name: 'Profil', path: '/profile' },
        { name: 'Infografis', path: '/infographics' },
        { name: 'Berita', path: '/news' },
        { name: 'Pasar', path: '/marketplace' },
        { name: 'PPID', path: '/ppid' },
    ];

    return (
        <footer className="bg-slate-900 text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <img src={profileData.logo} alt="Logo" className="h-10 w-auto brightness-200" />
                            <div>
                                <h3 className="font-bold text-lg">{profileData.name}</h3>
                                <p className="text-slate-400 text-sm">{profileData.kabupaten}</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Website resmi Pemerintah {profileData.name}. Media informasi dan transparansi publik.
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
                                <span>{profileData.address}</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm">
                                <MdEmail className="text-slate-500 shrink-0" size={18} />
                                <span>{profileData.email}</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm">
                                <MdPhone className="text-slate-500 shrink-0" size={18} />
                                <span>{profileData.phone}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-slate-800">
                <div className="container mx-auto px-4 py-6">
                    <p className="text-center text-slate-500 text-sm">
                        © {new Date().getFullYear()} {profileData.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
