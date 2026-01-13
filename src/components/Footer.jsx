import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdFacebook, MdLocationOn, MdPhone } from 'react-icons/md';
import { profileData } from '../data/mockData';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <img src={profileData.logo} alt="Logo" className="w-12 h-12 brightness-200 grayscale-0" />
                            <div>
                                <h3 className="font-bold text-xl leading-none">{profileData.name}</h3>
                                <p className="text-gray-400 text-sm">{profileData.kabupaten}</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Website resmi Pemerintah {profileData.name}. Media komunikasi dan transparansi informasi publik.
                        </p>
                        <div className="flex gap-4">
                            {[MdFacebook, FaInstagram, FaYoutube, FaTwitter].map((Icon, idx) => (
                                <a key={idx} href="#" className="bg-slate-800 p-2 rounded-full text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 border-b border-slate-700 pb-2 inline-block">Jelajahi</h4>
                        <ul className="space-y-3 text-gray-400">
                            {['Profil Desa', 'Infografis', 'Berita Terkini', 'Produk Hukum', 'Potensi Desa'].map((item, idx) => (
                                <li key={idx}>
                                    <a href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 border-b border-slate-700 pb-2 inline-block">Hubungi Kami</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start gap-3">
                                <MdLocationOn className="mt-1 text-orange-500 shrink-0" />
                                <span className="text-sm">{profileData.address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MdEmail className="text-orange-500 shrink-0" />
                                <span className="text-sm">{profileData.email}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MdPhone className="text-orange-500 shrink-0" />
                                <span className="text-sm">{profileData.phone}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Map/Hours */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 border-b border-slate-700 pb-2 inline-block">Jam Pelayanan</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="flex justify-between">
                                <span>Senin - Kamis</span>
                                <span>08:00 - 16:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Jumat</span>
                                <span>08:00 - 15:00</span>
                            </li>
                            <li className="flex justify-between text-orange-500 font-medium">
                                <span>Sabtu - Minggu</span>
                                <span>Tutup</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Pemerintah {profileData.name}. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
