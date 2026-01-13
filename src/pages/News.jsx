import { MdCalendarToday } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { newsData } from '../data/mockData';

const News = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Header */}
            <div className="relative py-24">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80)' }}
                >
                    <div className="absolute inset-0 bg-slate-900/75"></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-2">Informasi Terkini</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">Kabar Nagari</h1>
                    <p className="text-slate-300">Berita dan kegiatan dari Nagari Talang Anau</p>
                </div>
            </div>

            {/* News Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsData.map((news) => (
                        <Link to={`/news/${news.id}`} key={news.id} className="group block">
                            <div className="aspect-video bg-slate-100 overflow-hidden mb-4">
                                <img 
                                    src={news.image} 
                                    alt={news.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 text-sm text-slate-400 mb-2">
                                    <span className="text-blue-600 font-medium">{news.category}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <MdCalendarToday size={14} />
                                        {news.date}
                                    </span>
                                </div>
                                <h2 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                                    {news.title}
                                </h2>
                                <p className="text-sm text-slate-500 line-clamp-2">
                                    {news.summary}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;
