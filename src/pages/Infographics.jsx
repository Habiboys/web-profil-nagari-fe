import { useEffect, useState } from 'react';
import { MdFamilyRestroom, MdMan, MdPeople, MdWoman, MdWork } from 'react-icons/md';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import usePageHero from '../hooks/usePageHero';

const Infographics = () => {
    const [demographics, setDemographics] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const { hero } = usePageHero('infographics');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(ENDPOINTS.DEMOGRAPHICS.GET);
                setDemographics(res.data?.data || res.data);
            } catch (error) {
                console.error('Failed to fetch demographics:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Fallback data
    const fallback = {
        totalPopulation: 2534,
        totalFamilies: 650,
        maleCount: 1289,
        femaleCount: 1245,
    };

    const data = demographics || fallback;
    const heroBackground = hero?.image || 'https://images.unsplash.com/photo-1523475496153-3d6cc0f0bf19?w=1920&q=80';

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Header */}
            <div className="relative py-24">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroBackground})` }}
                >
                    <div className="absolute inset-0 bg-slate-900/75"></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-2">Data Kependudukan</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">{hero?.title || 'Demografi Nagari Talang Anau'}</h1>
                    <p className="text-slate-300">{hero?.subtitle || 'Visualisasi data statistik penduduk tahun 2025'}</p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                {loading ? (
                    <div className="text-center py-12 text-slate-500">Loading...</div>
                ) : (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {[
                                { label: 'Total Penduduk', val: data.totalPopulation, icon: MdPeople, color: 'text-blue-600' },
                                { label: 'Kepala Keluarga', val: data.totalFamilies, icon: MdFamilyRestroom, color: 'text-orange-600' },
                                { label: 'Perempuan', val: data.femaleCount, icon: MdWoman, color: 'text-pink-600' },
                                { label: 'Laki-laki', val: data.maleCount, icon: MdMan, color: 'text-cyan-600' },
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-white p-6 border border-slate-200">
                                    <div className={`${stat.color} mb-4`}>
                                        <stat.icon size={28} />
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900 mb-1">{stat.val?.toLocaleString('id-ID') || '-'}</div>
                                    <div className="text-sm text-slate-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Gender Distribution */}
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="bg-white p-6 border border-slate-200">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                    <MdPeople size={24} className="text-indigo-600" />
                                    <h3 className="text-lg font-bold text-slate-900">Distribusi Gender</h3>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="font-medium text-slate-700 flex items-center gap-2"><MdMan className="text-cyan-600" /> Laki-laki</span>
                                            <span className="font-bold text-slate-900">{data.maleCount?.toLocaleString('id-ID')} Jiwa</span>
                                        </div>
                                        <div className="h-4 w-full bg-slate-100 overflow-hidden">
                                            <div 
                                                className="h-full bg-cyan-600" 
                                                style={{ width: `${Math.min((data.maleCount / (data.totalPopulation || 1)) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="font-medium text-slate-700 flex items-center gap-2"><MdWoman className="text-pink-600" /> Perempuan</span>
                                            <span className="font-bold text-slate-900">{data.femaleCount?.toLocaleString('id-ID')} Jiwa</span>
                                        </div>
                                        <div className="h-4 w-full bg-slate-100 overflow-hidden">
                                            <div 
                                                className="h-full bg-pink-600" 
                                                style={{ width: `${Math.min((data.femaleCount / (data.totalPopulation || 1)) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Summary Card */}
                            <div className="bg-slate-900 p-6 text-white">
                                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700">
                                    <MdWork size={24} />
                                    <h3 className="text-lg font-bold">Ringkasan Data</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-2 border-b border-slate-700">
                                        <span className="text-slate-300">Total Penduduk</span>
                                        <span className="font-bold">{data.totalPopulation?.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-slate-700">
                                        <span className="text-slate-300">Jumlah KK</span>
                                        <span className="font-bold">{data.totalFamilies?.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-slate-700">
                                        <span className="text-slate-300">Rasio Gender</span>
                                        <span className="font-bold">{data.maleCount && data.femaleCount ? `${Math.round((data.maleCount / data.femaleCount) * 100)}:100` : '-'}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-slate-300">Rata-rata per KK</span>
                                        <span className="font-bold">{data.totalPopulation && data.totalFamilies ? (data.totalPopulation / data.totalFamilies).toFixed(1) : '-'} orang</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Infographics;