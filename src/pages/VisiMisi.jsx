import { useEffect, useState } from 'react';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';

const VisiMisi = () => {
    const [profile, setProfile] = useState(null);
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, missionsRes] = await Promise.all([
                    api.get(ENDPOINTS.PROFILE.GET),
                    api.get(ENDPOINTS.MISSIONS.GET_ALL),
                ]);
                setProfile(profileRes.data?.data || profileRes.data);
                const missionsData = missionsRes.data?.data || missionsRes.data || [];
                setMissions(Array.isArray(missionsData) ? missionsData : []);
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

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div className="relative py-24">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1920&q=80)' }}
                >
                    <div className="absolute inset-0 bg-slate-900/75"></div>
                </div>
                <div className="max-w-6xl mx-auto px-4 relative z-10 text-white text-center">
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-2">Arah Pembangunan</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">Visi & Misi</h1>
                    <p className="text-slate-300">Nagari Talang Anau</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Visi */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Visi</h2>
                    <div className="bg-slate-900 text-white p-8">
                        <p className="text-lg leading-relaxed italic">
                            "{profile?.vision || 'Visi belum tersedia'}"
                        </p>
                    </div>
                </div>

                {/* Misi */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Misi</h2>
                    <div className="space-y-4">
                        {missions.length > 0 ? (
                            missions.map((mission, index) => (
                                <div key={mission.id || index} className="flex gap-4 bg-white border border-slate-200 p-6">
                                    <div className="flex-shrink-0 w-10 h-10 bg-slate-900 text-white flex items-center justify-center font-bold">
                                        {index + 1}
                                    </div>
                                    <p className="text-slate-700 leading-relaxed">{mission.content}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-500">Belum ada data misi</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisiMisi;
