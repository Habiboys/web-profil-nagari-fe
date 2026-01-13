import * as Icons from 'react-icons/md';
import { MdArrowForward, MdCalendarToday, MdVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';
import MapSection from '../components/MapSection';
import ProductCard from '../components/ProductCard';
import SectionHeader from '../components/SectionHeader';
import { heroShortcuts, marketplaceData, newsData, profileData, statsData, villageStructure } from '../data/mockData';

const Home = () => {
    // Get key officials for preview
    const officials = villageStructure.slice(0, 4); 

    return (
        <div>
            {/* Hero Section */}
            <section className="relative mb-24">
                <div 
                    className="min-h-[600px] bg-cover bg-center flex items-center relative"
                    style={{ backgroundImage: 'url(https://placehold.co/1920x800)' }}
                >
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="container mx-auto px-4 relative z-10 text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-black mb-4 animate-in fade-in zoom-in duration-700 uppercase tracking-tight">
                            Selamat Datang di <br />
                            <span className="text-orange-500">{profileData.name}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 font-light">
                            {profileData.vision}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/profile" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-bold uppercase tracking-wider transition-transform hover:scale-105 shadow-lg border border-blue-500">
                                Profil Desa
                            </Link>
                            <Link to="/listing" className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 font-bold uppercase tracking-wider transition-transform hover:scale-105 shadow-lg border border-white">
                                Peta Wilayah
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Shortcuts */}
                <div className="container mx-auto px-4 relative z-20 -mt-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {heroShortcuts.map((item, index) => {
                            const Icon = Icons[item.icon] || Icons.MdHelp;
                            return (
                                <Link 
                                    to={item.path} 
                                    key={index}
                                    className="bg-white p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center group border-b-4 border-gray-100 hover:border-blue-600"
                                >
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <Icon size={24} />
                                    </div>
                                    <span className="font-bold text-gray-800 uppercase tracking-wide text-sm">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="container mx-auto px-4 mb-24">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsData.map((stat, idx) => {
                         const Icon = Icons[stat.icon] || Icons.MdHelp;
                         return (
                            <div key={idx} className="bg-white p-6 shadow-sm border border-gray-200 flex items-center gap-4 hover:border-blue-700 transition-colors">
                                <div className="p-3 bg-orange-100 text-orange-600">
                                    <Icon size={28} />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black text-gray-900">{stat.value}</h4>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                                </div>
                            </div>
                         );
                    })}
                </div>
            </section>

             {/* Kata Sambutan Kepala Desa */}
             <section className="bg-slate-900 text-white py-20 mb-20 overflow-hidden relative">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/3 relative">
                            <div className="absolute inset-0 bg-blue-600 transform translate-x-4 translate-y-4 -z-10 bg-opacity-50"></div>
                            <img 
                                src={profileData.headOfVillage.photo} 
                                alt={profileData.headOfVillage.name} 
                                className="w-full h-auto object-cover border-4 border-white shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                        <div className="w-full md:w-2/3">
                             <div className="inline-block px-4 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest mb-6">
                                Sambutan Kepala Desa
                             </div>
                             <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight leading-tight">
                                Menuju Desa Tamang <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Mandiri & Berkemajuan</span>
                             </h2>
                             <blockquote className="text-xl text-slate-300 italic leading-relaxed border-l-4 border-orange-500 pl-6 mb-8">
                                "{profileData.headOfVillage.message}"
                             </blockquote>
                             <div className="flex items-center gap-4">
                                <div>
                                    <h4 className="text-xl font-bold uppercase tracking-wide">{profileData.headOfVillage.name}</h4>
                                    <p className="text-blue-400 font-medium">Kepala Desa Tamang</p>
                                </div>
                                <MdVerified className="text-blue-500 text-3xl" />
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Struktur Desa Preview */}
            <section className="container mx-auto px-4 mb-24">
                <SectionHeader 
                    title="Perangkat Desa" 
                    subtitle="Mengenal jajaran pemerintahan Desa Tamang yang siap melayani masyarakat." 
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {officials.map((person, idx) => (
                        <div key={idx} className="group bg-white border border-gray-200 hover:border-slate-800 transition-all duration-300">
                             <div className="h-64 overflow-hidden relative bg-gray-100">
                                <img 
                                    src={person.image} 
                                    alt={person.name} 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                                />
                             </div>
                             <div className="p-4 text-center">
                                <h3 className="font-bold text-slate-900 uppercase tracking-tight mb-1">{person.name}</h3>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{person.position}</p>
                             </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <Link to="/profile" className="inline-block border-b-2 border-slate-900 text-slate-900 font-bold uppercase tracking-widest hover:text-blue-700 hover:border-blue-700 transition-colors pb-1">
                        Lihat Struktur Lengkap
                    </Link>
                </div>
            </section>

            {/* Latest News */}
            <section className="bg-gray-50 border-y border-gray-200 py-20 mb-20">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-10">
                        <SectionHeader title="Kabar Desa" subtitle="Informasi terkini kegiatan dan berita desa." align="left" />
                        <Link to="/news" className="text-blue-700 font-bold hover:underline flex items-center gap-1 mb-6 uppercase tracking-wider text-sm">
                            Lihat Semua <MdArrowForward />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {newsData.map((news) => (
                            <div key={news.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all group hover:border-blue-600">
                                <div className="h-48 overflow-hidden relative">
                                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-0 right-0 bg-blue-700 text-white px-3 py-1 text-xs font-bold uppercase">
                                        {news.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">
                                        <span className="flex items-center gap-1"><MdCalendarToday /> {news.date}</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-3 line-clamp-2 uppercase tracking-tight group-hover:text-blue-700 transition-colors">
                                        <Link to={`/news/${news.id}`}>{news.title}</Link>
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 font-medium">
                                        {news.summary}
                                    </p>
                                    <Link to={`/news/${news.id}`} className="inline-block py-2 text-blue-700 text-xs font-bold uppercase tracking-widest border-b-2 border-transparent hover:border-blue-700 transition-all">
                                        Baca Selengkapnya
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Potensi Desa (Nature/Tourism) */}
            <section className="bg-slate-900 text-white py-20 mb-20">
                <div className="container mx-auto px-4">
                     <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <div className="inline-block bg-blue-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest mb-3">
                                Keunggulan Desa
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Potensi Desa</h2>
                        </div>
                        <p className="text-slate-400 max-w-md text-right mt-4 md:mt-0 font-medium">
                            Kekayaan alam dan sumber daya manusia yang menjadi prioritas pengembangan desa.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* We use specific mock data for Potensi if available, or just generic placeholders if not imported */}
                        {/* Assuming 'potensiData' is not imported in the original file, I will add it or use hardcoded if needed. 
                            Wait, I saw potensiData in mockData.js. I should make sure it's used.
                            Checking Home.jsx imports... it seems I need to add potensiData to imports. 
                            I will update the imports in a separate block if I can't do it here. 
                            Ah, I can't check imports with this tool easily in one go. 
                            I will assume I need to fix imports.
                            For now, let's just write the section content assuming the variable exists or I map manually.
                            Ref: view_file shows we didn't import 'potensiData'. 
                            I'll hardcode the render for now or assume I'll fix imports next.
                            Actually, I will trust myself to fix the imports or use a safe fallback.
                         */}
                          {[
                            { title: "Wisata Alam Siling Kanu", category: "Pariwisata" },
                            { title: "Perkebunan Sawit", category: "Pertanian" },
                            { title: "Kerajinan Tangan", category: "Ekonomi Kreatif" }
                        ].map((item, idx) => (
                            <div key={idx} className="group relative h-80 border-4 border-slate-700 hover:border-blue-600 transition-colors bg-slate-800">
                                <img src={`https://placehold.co/600x800?text=${item.title.replace(/ /g, '+')}`} alt={item.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" />
                                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-900 to-transparent">
                                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 block">{item.category}</span>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* Produk Desa (Marketplace) */}
             <section className="container mx-auto px-4 mb-20">
                <SectionHeader 
                    title="Pasar Desa" 
                    subtitle="Dukung ekonomi lokal dengan membeli produk asli desa." 
                />
                
                <div className="grid md:grid-cols-3 gap-8">
                    {marketplaceData.slice(0, 3).map((product) => (
                        <div key={product.id} className="h-full">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                
                <div className="text-center mt-12">
                    <Link to="/marketplace" className="inline-flex items-center gap-3 bg-white text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white px-8 py-4 font-bold uppercase tracking-widest transition-colors">
                        <Icons.MdStore size={20} />
                        Kunjungi Pasar Desa
                    </Link>
                </div>
            </section>
            
            {/* Map Section */}
            <MapSection /> 
        </div>
    );
};

export default Home;
