import { useEffect, useState } from 'react';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';

const StrukturNagari = () => {
    const [officials, setOfficials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(ENDPOINTS.OFFICIALS.GET_ALL);
                setOfficials(res.data || []);
            } catch (error) {
                console.error('Failed to fetch officials:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Group officials by role
    const waliNagari = officials.find(o => o.position?.toLowerCase().includes('wali nagari'));
    const lpm = officials.find(o => o.position?.toLowerCase().includes('lpm'));
    const bamus = officials.find(o => o.position?.toLowerCase().includes('bamus'));
    const sekretaris = officials.find(o => o.position?.toLowerCase().includes('sekretaris'));
    const kasiKaur = officials.filter(o => 
        o.position?.toLowerCase().includes('kasi') || 
        o.position?.toLowerCase().includes('kaur')
    );
    const kepalaJorong = officials.filter(o => 
        o.position?.toLowerCase().includes('kepala jorong') || 
        o.position?.toLowerCase().includes('jorong')
    );

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
            <div className="bg-slate-900 text-white py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-2">Struktur Organisasi</h1>
                    <p className="text-slate-300">Pemerintahan Nagari Talang Anau Tahun 2025</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Top Level: LPM - Wali Nagari - BAMUS */}
                <div className="flex justify-center items-center gap-8 mb-8">
                    {/* LPM */}
                    {lpm && (
                        <div className="border-2 border-green-500 bg-white px-6 py-3 text-center">
                            <div className="font-bold text-green-700">{lpm.position}</div>
                            <div className="text-sm text-slate-600">{lpm.name || '-'}</div>
                        </div>
                    )}

                    <div className="text-2xl text-slate-400">⟷</div>

                    {/* Wali Nagari */}
                    {waliNagari && (
                        <div className="border-2 border-green-500 bg-green-500 text-white px-8 py-4 text-center">
                            <div className="font-bold">{waliNagari.position}</div>
                            <div className="text-sm">{waliNagari.name}</div>
                        </div>
                    )}

                    <div className="text-2xl text-slate-400">⟷</div>

                    {/* BAMUS */}
                    {bamus && (
                        <div className="border-2 border-green-500 bg-white px-6 py-3 text-center">
                            <div className="font-bold text-green-700">{bamus.position}</div>
                            <div className="text-sm text-slate-600">{bamus.name || '-'}</div>
                        </div>
                    )}
                </div>

                {/* Connector Line */}
                <div className="flex justify-center mb-4">
                    <div className="w-0.5 h-8 bg-slate-300"></div>
                </div>

                {/* Sekretaris Nagari */}
                {sekretaris && (
                    <div className="flex justify-center mb-8">
                        <div className="border-2 border-green-500 bg-white px-8 py-4 text-center">
                            <div className="font-bold text-green-700">{sekretaris.position}</div>
                            <div className="text-sm text-slate-600">{sekretaris.name}</div>
                        </div>
                    </div>
                )}

                {/* Connector Line */}
                <div className="flex justify-center mb-4">
                    <div className="w-0.5 h-8 bg-slate-300"></div>
                </div>

                {/* KASI & KAUR Grid */}
                {kasiKaur.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                        {kasiKaur.map((official) => (
                            <div key={official.id} className="border-2 border-green-500 bg-white p-4 text-center">
                                <div className="font-bold text-green-700 text-sm">{official.position}</div>
                                <div className="text-xs text-slate-600 mt-1">{official.name}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Kepala Jorong Section */}
                {kepalaJorong.length > 0 && (
                    <>
                        <div className="flex justify-center mb-8">
                            <div className="border-2 border-green-500 bg-green-500 text-white px-8 py-3 text-center">
                                <div className="font-bold">KEPALA JORONG</div>
                            </div>
                        </div>

                        <div className="flex justify-center mb-4">
                            <div className="w-0.5 h-8 bg-slate-300"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                            {kepalaJorong.map((official) => (
                                <div key={official.id} className="border-2 border-green-500 bg-white p-4 text-center">
                                    <div className="font-bold text-green-700">{official.position}</div>
                                    <div className="text-sm text-slate-600 mt-1">{official.name}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {officials.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        Belum ada data struktur organisasi
                    </div>
                )}
            </div>
        </div>
    );
};

export default StrukturNagari;
