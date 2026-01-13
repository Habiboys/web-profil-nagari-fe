import * as Icons from 'react-icons/md';
import { MdArrowForward, MdCalendarToday } from 'react-icons/md';
import { Link } from 'react-router-dom';
import MapSection from '../components/MapSection';
import ProductCard from '../components/ProductCard';
import SectionHeader from '../components/SectionHeader';
import { heroShortcuts, marketplaceData, newsData, potensiData, profileData, statsData, villageStructure } from '../data/mockData';

const Home = () => {
    const officials = villageStructure.slice(0, 4); 

    return (
        <div>
            {/* Hero Section with Background Image */}
            <section className="relative min-h-[500px] flex items-center">
                {/* Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)' }}
                >
                    <div className="absolute inset-0 bg-slate-900/70"></div>
                </div>
                
                {/* Content */}
                <div className="container mx-auto px-4 relative z-10 text-white text-center py-20">
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-3">Selamat Datang di</p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{profileData.name}</h1>
                    <p className="text-slate-300 mb-8 max-w-xl mx-auto text-lg">
                        {profileData.kecamatan}, {profileData.kabupaten}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/profile" className="bg-white text-slate-900 px-8 py-3 font-medium hover:bg-slate-100 transition-colors">
                            Profil Nagari
                        </Link>
                        <Link to="/infographics" className="border border-white text-white px-8 py-3 font-medium hover:bg-white hover:text-slate-900 transition-colors">
                            Infografis
                        </Link>
                    </div>
                </div>
            </section>

            {/* Shortcuts */}
            <section className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-4 divide-x divide-slate-200">
                        {heroShortcuts.map((item, index) => {
                            const Icon = Icons[item.icon] || Icons.MdHelp;
                            return (
                                <Link to={item.path} key={index} className="py-6 flex flex-col items-center text-center hover:bg-slate-50 transition-colors">
                                    <Icon size={24} className="text-blue-600 mb-2" />
                                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsData.map((stat, idx) => {
                         const Icon = Icons[stat.icon] || Icons.MdHelp;
                         return (
                            <div key={idx} className="flex items-center gap-4 p-5 border border-slate-200 bg-white">
                                <Icon size={28} className="text-blue-600" />
                                <div>
                                    <h4 className="text-2xl font-bold text-slate-900">{stat.value}</h4>
                                    <p className="text-sm text-slate-500">{stat.label}</p>
                                </div>
                            </div>
                         );
                    })}
                </div>
            </section>

            {/* Sambutan Wali Nagari */}
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-auto">
                        <div className="w-52 h-52 bg-slate-200 shrink-0 border border-slate-300">
                            <img src={profileData.headOfVillage.photo} alt={profileData.headOfVillage.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="text-sm text-blue-600 font-medium uppercase tracking-wider mb-3">Sambutan Wali Nagari</p>
                            <blockquote className="text-xl text-slate-700 italic mb-4 leading-relaxed">
                                "{profileData.headOfVillage.message}"
                            </blockquote>
                            <p className="font-bold text-slate-900">{profileData.headOfVillage.name}</p>
                            <p className="text-sm text-slate-500">Wali {profileData.name}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Perangkat Nagari */}
            <section className="container mx-auto px-4 py-24">
                <SectionHeader title="Perangkat Nagari" subtitle={`Jajaran pemerintahan ${profileData.name}`} />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {officials.map((person, idx) => (
                        <div key={idx} className="text-center">
                            <div className="w-full aspect-square bg-slate-100 mb-3 border border-slate-200">
                                <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="font-medium text-slate-900">{person.name}</h3>
                            <p className="text-sm text-slate-500">{person.position}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Link to="/profile" className="text-blue-600 hover:underline font-medium">
                        Lihat Struktur Lengkap →
                    </Link>
                </div>
            </section>

            {/* Berita */}
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <SectionHeader title="Kabar Nagari" subtitle="Berita dan kegiatan terkini" align="left" />
                        <Link to="/news" className="text-blue-600 hover:underline font-medium flex items-center gap-1">
                            Lihat Semua <MdArrowForward />
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {newsData.map((news) => (
                            <div key={news.id} className="bg-white border border-slate-200">
                                <img src={news.image} alt={news.title} className="w-full h-44 object-cover" />
                                <div className="p-5">
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                        <MdCalendarToday size={12} />
                                        <span>{news.date}</span>
                                        <span className="text-blue-600">• {news.category}</span>
                                    </div>
                                    <h3 className="font-medium text-slate-900 mb-2 line-clamp-2">
                                        <Link to={`/news/${news.id}`} className="hover:text-blue-600">{news.title}</Link>
                                    </h3>
                                    <p className="text-sm text-slate-600 line-clamp-2">{news.summary}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Potensi Nagari - Carousel Style */}
            <section className="py-24 overflow-hidden">
                <div className="container mx-auto px-4">
                    <SectionHeader title="Potensi Nagari" subtitle="Keunggulan Daerah" />
                </div>
                
                {/* Horizontal Scroll Container */}
                <div className="relative">
                    <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-8 pb-4">
                        {/* Spacer for centering on large screens */}
                        <div className="shrink-0 w-[calc((100vw-1280px)/2)] hidden xl:block"></div>
                        
                        {potensiData.map((item, idx) => (
                            <div 
                                key={idx} 
                                className="shrink-0 w-80 h-96 snap-start relative group cursor-pointer"
                            >
                                {/* Background Image */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                    style={{ backgroundImage: `url(${item.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'})` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                                </div>
                                
                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <span className="inline-block bg-blue-600 text-white text-xs font-medium uppercase tracking-wider px-3 py-1 mb-3">
                                        {item.category}
                                    </span>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Lihat selengkapnya →
                                    </p>
                                </div>
                            </div>
                        ))}
                        
                        {/* Spacer for centering on large screens */}
                        <div className="shrink-0 w-[calc((100vw-1280px)/2)] hidden xl:block"></div>
                    </div>
                </div>
            </section>

            {/* Produk Nagari */}
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto px-4">
                    <SectionHeader title="Produk Nagari" subtitle="Produk unggulan dari masyarakat nagari" />
                    <div className="grid md:grid-cols-3 gap-6">
                        {marketplaceData.slice(0, 3).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link to="/marketplace" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 font-medium hover:bg-slate-800 transition-colors">
                            <Icons.MdStore size={18} />
                            Kunjungi Pasar Nagari
                        </Link>
                    </div>
                </div>
            </section>
            
            <MapSection />
        </div>
    );
};

export default Home;
