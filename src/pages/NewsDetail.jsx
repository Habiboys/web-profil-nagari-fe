import { useEffect, useState } from 'react';
import { MdCalendarToday } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';

const NewsDetail = () => {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await api.get(ENDPOINTS.NEWS.GET_ONE(id));
                setNews(res.data);
            } catch (error) {
                console.error('Failed to fetch news:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-slate-500">Loading...</p>
            </div>
        );
    }

    if (!news) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-slate-500 mb-4">Berita tidak ditemukan</p>
                <Link to="/news" className="text-blue-600 hover:underline">← Kembali ke Berita</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <Link to="/news" className="text-blue-600 hover:underline text-sm">← Kembali ke Berita</Link>
                </div>
            </div>

            {/* Featured Image */}
            {news.image && (
                <div className="max-w-4xl mx-auto px-4 mt-8">
                    <img src={news.image} alt={news.title} className="w-full h-64 md:h-96 object-cover border border-slate-200" />
                </div>
            )}

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white border border-slate-200 p-8">
                    {/* Title & Meta */}
                    <div className="mb-6 pb-6 border-b border-slate-200">
                        <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                            {news.category && <span className="bg-blue-600 text-white px-3 py-1 text-xs font-medium uppercase tracking-wide">{news.category}</span>}
                            <span className="flex items-center gap-1">
                                <MdCalendarToday size={14} />
                                {news.createdAt ? new Date(news.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{news.title}</h1>
                    </div>

                    {/* Article Content */}
                    <div 
                        className="prose max-w-none" 
                        dangerouslySetInnerHTML={{ __html: news.content }}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewsDetail;
