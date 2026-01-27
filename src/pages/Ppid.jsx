import { useEffect, useState } from 'react';
import { MdDescription, MdDownload } from 'react-icons/md';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import usePageHero from '../hooks/usePageHero';

const Ppid = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(null);
    
    const { hero } = usePageHero('ppid');

    const categories = [
        { key: null, label: "Semua" },
        { key: "Berkala", label: "Informasi Berkala" },
        { key: "Serta Merta", label: "Informasi Serta Merta" },
        { key: "Setiap Saat", label: "Informasi Setiap Saat" },
        { key: "Dikecualikan", label: "Informasi Dikecualikan" }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(ENDPOINTS.PPID.GET_ALL);
                setDocuments(res.data || []);
            } catch (error) {
                console.error('Failed to fetch PPID data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredDocs = activeCategory
        ? documents.filter(d => d.type === activeCategory)
        : documents;

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };
    
    const heroBackground = hero?.image || 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80';

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
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-2">Transparansi Publik</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">{hero?.title || 'PPID Nagari'}</h1>
                    <p className="text-slate-300">{hero?.subtitle || 'Pejabat Pengelola Informasi dan Dokumentasi'}</p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Categories */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-50 p-6 sticky top-24">
                            <h3 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200 text-sm uppercase tracking-wider">Kategori Informasi</h3>
                            <ul className="space-y-2">
                                {categories.map((cat, idx) => (
                                    <li key={idx}>
                                        <button 
                                            onClick={() => setActiveCategory(cat.key)}
                                            className={`block w-full text-left px-4 py-2 transition-colors text-sm ${activeCategory === cat.key ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'}`}
                                        >
                                            {cat.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Documents List */}
                    <div className="lg:col-span-3">
                        <div className="border border-slate-200">
                            <div className="p-5 border-b border-slate-200 bg-slate-50">
                                <h3 className="font-bold text-slate-900">Dokumen Publik</h3>
                            </div>
                            {loading ? (
                                <div className="p-8 text-center text-slate-500">Loading...</div>
                            ) : filteredDocs.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">Belum ada dokumen.</div>
                            ) : (
                                <div className="divide-y divide-slate-200">
                                    {filteredDocs.map((doc, idx) => (
                                        <div key={doc.id || idx} className="p-5 hover:bg-slate-50 transition-colors flex items-start gap-5">
                                            <div className="p-3 bg-red-50 text-red-600 shrink-0">
                                                <MdDescription size={24} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-slate-900 mb-2">{doc.title}</h4>
                                                {doc.description && (
                                                    <p className="text-sm text-slate-600 mb-2">{doc.description}</p>
                                                )}
                                                <div className="flex gap-4 text-xs text-slate-500">
                                                    <span className="bg-slate-100 px-2 py-1">{doc.type}</span>
                                                    <span className="py-1">{formatDate(doc.createdAt)}</span>
                                                </div>
                                            </div>
                                            {doc.file && (
                                                <a href={doc.file} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                                    <MdDownload size={20} />
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ppid;
