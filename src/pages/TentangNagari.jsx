import { useEffect, useState } from 'react';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import usePageHero from '../hooks/usePageHero';

const TentangNagari = () => {
    const [profile, setProfile] = useState(null);
    const [geography, setGeography] = useState(null);
    const [historyVersions, setHistoryVersions] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { hero } = usePageHero('tentang');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, geoRes, historyRes] = await Promise.all([
                    api.get(ENDPOINTS.PROFILE.GET),
                    api.get(ENDPOINTS.GEOGRAPHY.GET),
                    api.get(ENDPOINTS.HISTORY.GET_ALL),
                ]);
                setProfile(profileRes.data?.data || profileRes.data);
                setGeography(geoRes.data?.data || geoRes.data);
                setHistoryVersions(historyRes.data || []);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-slate-500">Loading...</p>
            </div>
        );
    }
    
    const heroBackground = hero?.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80';

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div className="relative py-24">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroBackground})` }}
                >
                    <div className="absolute inset-0 bg-slate-900/75"></div>
                </div>
                <div className="max-w-6xl mx-auto px-4 relative z-10 text-white text-center">
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-2">Profil Daerah</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">{hero?.title || 'Tentang Nagari'}</h1>
                    <p className="text-slate-300">{hero?.subtitle || 'Informasi umum tentang Nagari Talang Anau'}</p>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-slate-900 text-white py-6">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-2xl font-bold">{profile?.areaTotal || 1854}</div>
                            <div className="text-sm text-slate-300">Luas (Ha)</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">3</div>
                            <div className="text-sm text-slate-300">Jorong</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">2.500+</div>
                            <div className="text-sm text-slate-300">Penduduk</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">650+</div>
                            <div className="text-sm text-slate-300">KK</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Info Umum */}
                <div className="bg-white border border-slate-200 p-8 mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Informasi Umum</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-slate-500">Nama Nagari</p>
                            <p className="font-medium text-slate-900">{profile?.name || 'Nagari Talang Anau'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Kecamatan</p>
                            <p className="font-medium text-slate-900">{profile?.kecamatan || 'Gunuang Omeh'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Kabupaten</p>
                            <p className="font-medium text-slate-900">{profile?.kabupaten || 'Lima Puluh Kota'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Email</p>
                            <p className="font-medium text-slate-900">{profile?.email || '-'}</p>
                        </div>
                    </div>
                </div>

                {/* Kondisi Geografis */}
                {geography && (
                    <div className="bg-white border border-slate-200 p-8 mb-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Kondisi Geografis</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-slate-500">Batas Utara</p>
                                <p className="font-medium text-slate-900">{geography.boundaryNorth || '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Batas Selatan</p>
                                <p className="font-medium text-slate-900">{geography.boundarySouth || '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Batas Barat</p>
                                <p className="font-medium text-slate-900">{geography.boundaryWest || '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Batas Timur</p>
                                <p className="font-medium text-slate-900">{geography.boundaryEast || '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Ketinggian</p>
                                <p className="font-medium text-slate-900">{geography.elevationMin} - {geography.elevationMax} mdpl</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Curah Hujan</p>
                                <p className="font-medium text-slate-900">{geography.rainfall || '-'} mm/tahun</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sejarah */}
                <div className="bg-white border border-slate-200 p-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Sejarah Nagari</h2>
                    
                    {/* Intro */}
                    {profile?.historyIntro && (
                        <p className="text-slate-700 leading-relaxed mb-6">{profile.historyIntro}</p>
                    )}

                    {/* Detailed History Versions */}
                    {historyVersions.length > 0 && (
                        <div className="space-y-6">
                            {historyVersions.map((item, idx) => (
                                <div key={item.id || idx} className="border-l-4 border-blue-600 pl-4">
                                    <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-700 whitespace-pre-wrap">{item.content}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {!profile?.historyIntro && historyVersions.length === 0 && (
                        <p className="text-slate-500">Belum ada data sejarah.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TentangNagari;
