import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await api.get(ENDPOINTS.NEWS.GET_ALL);
                const data = res.data?.data || res.data || [];
                setNews(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to fetch news:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div className="relative py-24">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80)' }}
                >
                    <div className="absolute inset-0 bg-slate-900/75"></div>
                </div>
                <div className="max-w-6xl mx-auto px-4 relative z-10 text-white text-center">
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-2">Informasi Terkini</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">Berita & Pengumuman</h1>
                    <p className="text-slate-300">Kabar terbaru dari Nagari Talang Anau</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                {loading ? (
                    <div className="text-center py-12 text-slate-500">Loading...</div>
                ) : news.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">Belum ada berita</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {news.map((item) => (
                            <Link 
                                key={item.id} 
                                to={`/news/${item.id}`}
                                className="bg-white border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors"
                            >
                                <div className="h-48 bg-slate-100">
                                    {item.image && (
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        {item.category && (
                                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1">{item.category}</span>
                                        )}
                                        <span className="text-xs text-slate-500">
                                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID') : ''}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">{item.title}</h3>
                                    <p className="text-sm text-slate-600 line-clamp-2">{item.summary || ''}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default News;
