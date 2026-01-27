import { useEffect, useState } from 'react';
import { MdCalendarToday, MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import usePageHero from '../hooks/usePageHero';

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    const { hero } = usePageHero('news');

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

    const filteredNews = news.filter(item => 
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    };
    
    const heroBackground = hero?.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80';

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
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-2">Kabar Terkini</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">{hero?.title || 'Berita Nagari'}</h1>
                    <p className="text-slate-300">{hero?.subtitle || 'Informasi dan kegiatan terbaru dari Nagari Talang Anau'}</p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                {/* Search */}
                <div className="mb-8">
                    <div className="relative max-w-md">
                        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                            type="text"
                            placeholder="Cari berita..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-slate-200 bg-white focus:border-blue-500 outline-none"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-slate-500">Loading...</div>
                ) : filteredNews.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        {searchTerm ? 'Tidak ada berita yang cocok.' : 'Belum ada berita.'}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNews.map((item) => (
                            <Link key={item.id} to={`/news/${item.id}`} className="bg-white border border-slate-200 hover:border-slate-300 transition-colors group">
                                <div className="h-48 bg-slate-100 overflow-hidden">
                                    {item.image && (
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    )}
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                                        <MdCalendarToday size={14} />
                                        <span>{formatDate(item.createdAt)}</span>
                                        {item.category && <span className="text-blue-600">• {item.category}</span>}
                                    </div>
                                    <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 line-clamp-2">{item.summary}</p>
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
