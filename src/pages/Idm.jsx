import { useEffect, useState } from 'react';
import { MdTrendingDown, MdTrendingUp } from 'react-icons/md';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import usePageHero from '../hooks/usePageHero';

const Idm = () => {
    const [idm, setIdm] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const { hero } = usePageHero('idm');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(ENDPOINTS.IDM.GET);
                if (res.data && res.data.id) {
                    setIdm(res.data);
                }
            } catch (error) {
                console.error('Failed to fetch IDM:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Fallback data
    const data = idm || {
        score: 0.8286,
        status: 'MANDIRI',
        scoreSocial: 0.8656,
        scoreEconomy: 0.6667,
        scoreEnv: 0.9333,
        prevScore: 0.8046,
        analysis: 'Nagari Talang Anau telah mencapai status MANDIRI dengan skor 0.8286. Kekuatan utama terletak pada aspek Lingkungan (0.9333) dan Sosial (0.8656). Fokus pengembangan selanjutnya pada penguatan sektor Ekonomi (0.6667).',
        reportFile: null,
        year: 2025
    };

    const scoreDiff = data.prevScore ? (parseFloat(data.score) - parseFloat(data.prevScore)).toFixed(4) : null;
    const isPositive = scoreDiff && parseFloat(scoreDiff) >= 0;
    const heroBackground = hero?.image || 'https://images.unsplash.com/photo-1504418456623-1e32de4e6a03?w=1920&q=80';

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Header with Background */}
            <div className="relative py-24">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroBackground})` }}
                >
                    <div className="absolute inset-0 bg-slate-900/75"></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-2">Data Tahun {data.year}</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">{hero?.title || 'Indeks Desa Membangun'}</h1>
                    <p className="text-slate-300">{hero?.subtitle || 'Pengukuran kemandirian dan pembangunan Nagari Talang Anau'}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {loading ? (
                    <div className="text-center py-12 text-slate-500">Loading...</div>
                ) : (
                    <>
                        {/* Main Score */}
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="border border-slate-200 p-8">
                                <p className="text-sm text-slate-500 uppercase tracking-wider mb-2">Status IDM</p>
                                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{data.status}</h2>
                                <p className="text-sm text-slate-500">Terverifikasi Kemendes PDTT</p>
                            </div>
                            <div className="bg-slate-50 p-8">
                                <p className="text-sm text-slate-500 uppercase tracking-wider mb-2">Skor Indeks</p>
                                <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">{parseFloat(data.score).toFixed(4)}</h2>
                                {scoreDiff && (
                                    <p className={`text-sm flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                        {isPositive ? <MdTrendingUp /> : <MdTrendingDown />}
                                        {isPositive ? '+' : ''}{scoreDiff} dari tahun sebelumnya
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Detailed Scores */}
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Komponen Indeks</h3>
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            {[
                                { title: "Ketahanan Sosial", code: "IKS", score: parseFloat(data.scoreSocial) },
                                { title: "Ketahanan Ekonomi", code: "IKE", score: parseFloat(data.scoreEconomy) },
                                { title: "Ketahanan Lingkungan", code: "IKL", score: parseFloat(data.scoreEnv) }
                            ].map((item, idx) => (
                                <div key={idx} className="border border-slate-200 p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-sm text-slate-500">{item.code}</p>
                                            <h4 className="font-medium text-slate-900">{item.title}</h4>
                                        </div>
                                        <span className="text-2xl font-bold text-slate-900">{item.score.toFixed(4)}</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 w-full">
                                        <div className="h-full bg-blue-600" style={{ width: `${item.score * 100}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Analysis */}
                        <div className="bg-slate-50 p-8">
                            <h3 className="font-bold text-slate-900 mb-4">Analisis</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                {data.analysis || `Nagari Talang Anau telah mencapai status ${data.status} dengan skor ${parseFloat(data.score).toFixed(4)}.`}
                            </p>
                            {data.reportFile && (
                                <a 
                                    href={data.reportFile} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-slate-900 text-white px-6 py-2 text-sm font-medium hover:bg-slate-800 transition-colors inline-block"
                                >
                                    Unduh Laporan
                                </a>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Idm;
