import { MdArrowForward, MdCalendarToday } from 'react-icons/md';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { newsData } from '../data/mockData';

const News = () => {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <SectionHeader 
                title="Berita Desa" 
                subtitle="Informasi kegiatan, pembangunan, dan peristiwa terkini di Desa Tamang." 
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsData.map((news) => (
                    <article key={news.id} className="bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col group hover:border-slate-800">
                        <div className="h-56 overflow-hidden relative">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                            <img 
                                src={news.image} 
                                alt={news.title} 
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                            />
                            <span className="absolute top-0 left-0 z-20 bg-orange-600 text-white text-xs font-bold px-4 py-1 uppercase tracking-wider">
                                {news.category}
                            </span>
                        </div>
                        
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center text-xs font-bold text-gray-400 mb-4 gap-2 uppercase tracking-wide">
                                <MdCalendarToday className="text-blue-600" />
                                <span>{news.date}</span>
                            </div>

                            <h2 className="text-xl font-black text-slate-900 mb-3 leading-tight uppercase tracking-tight group-hover:text-blue-700 transition-colors">
                                <Link to={`/news/${news.id}`}>{news.title}</Link>
                            </h2>
                            
                            <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1 font-medium">
                                {news.summary}
                            </p>

                            <Link 
                                to={`/news/${news.id}`} 
                                className="inline-flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-widest border-b-2 border-transparent hover:border-slate-900 transition-all pb-1"
                            >
                                Baca Selengkapnya <MdArrowForward />
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default News;
