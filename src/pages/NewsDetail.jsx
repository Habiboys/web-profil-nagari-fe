import { useEffect, useState } from 'react';
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
            {/* Hero with Image */}
            <div className="bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <Link to="/news" className="text-slate-300 hover:text-white mb-4 inline-block">← Kembali</Link>
                    <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
                    <div className="flex items-center gap-4 text-slate-300 text-sm">
                        {news.category && <span className="bg-blue-600 text-white px-2 py-1">{news.category}</span>}
                        <span>{news.createdAt ? new Date(news.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</span>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            {news.image && (
                <div className="max-w-4xl mx-auto px-4 -mt-4">
                    <img src={news.image} alt={news.title} className="w-full h-64 md:h-96 object-cover" />
                </div>
            )}

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white border border-slate-200 p-8">
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
