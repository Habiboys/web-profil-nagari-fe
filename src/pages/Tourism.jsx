import { useEffect, useState } from 'react';
import { MdLocationOn, MdSearch } from 'react-icons/md';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import TourismDetailModal from '../components/TourismDetailModal';
import usePageHero from '../hooks/usePageHero';

const Tourism = () => {
    const [tourism, setTourism] = useState([]);
    const [filteredTourism, setFilteredTourism] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedTourism, setSelectedTourism] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const { hero } = usePageHero('tourism');

    useEffect(() => {
        const fetchTourism = async () => {
            try {
                const response = await api.get(ENDPOINTS.TOURISM.GET_ALL);
                const data = response.data?.data || response.data || [];
                setTourism(Array.isArray(data) ? data : []);
                setFilteredTourism(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to fetch tourism data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTourism();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredTourism(tourism);
        } else {
            const filtered = tourism.filter(item =>
                item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredTourism(filtered);
        }
    }, [searchQuery, tourism]);

    const handleCardClick = (item) => {
        setSelectedTourism(item);
        setIsModalOpen(true);
    };

    const heroBackground = hero?.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80';
    const heroTitle = hero?.title || 'Destinasi Wisata';
    const heroSubtitle = hero?.subtitle || 'Keindahan alam dan budaya Nagari Talang Anau';

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Header */}
            <div className="relative py-24">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroBackground})` }}
                >
                    <div className="absolute inset-0 bg-slate-900/75"></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-2">Jelajahi Wisata</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">{heroTitle}</h1>
                    <p className="text-slate-300 max-w-2xl mx-auto">{heroSubtitle}</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-slate-50 border-b border-slate-200 py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto relative">
                        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Cari destinasi wisata..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                </div>
            </div>

            {/* Tourism Grid */}
            <div className="container mx-auto px-4 py-16">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-500 mt-4">Memuat data...</p>
                    </div>
                ) : filteredTourism.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTourism.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleCardClick(item)}
                                className="group cursor-pointer bg-white border border-slate-200 hover:border-slate-300 transition-all hover:shadow-lg"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img 
                                        src={item.image || 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80'} 
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                                        {item.location && (
                                            <div className="flex items-center gap-1 text-sm opacity-90">
                                                <MdLocationOn size={14} />
                                                <span>{item.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <p className="text-sm text-slate-600 line-clamp-2">
                                        {item.description || 'Destinasi wisata yang menarik untuk dikunjungi'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">Tidak ada destinasi wisata ditemukan</p>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-4 text-blue-600 hover:underline"
                            >
                                Reset pencarian
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Modal */}
            <TourismDetailModal
                tourism={selectedTourism}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default Tourism;
