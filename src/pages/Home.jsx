import { useEffect, useState } from 'react';
import * as Icons from 'react-icons/md';
import { MdAccountBalance, MdArrowForward, MdCalendarToday, MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import MapSection from '../components/MapSection';
import SectionHeader from '../components/SectionHeader';
import { heroShortcuts } from '../data/mockData';
import usePageHero from '../hooks/usePageHero';

const Home = () => {
    const [profile, setProfile] = useState(null);
    const [officials, setOfficials] = useState([]);
    const [news, setNews] = useState([]);
    const [products, setProducts] = useState([]);
    const [demographics, setDemographics] = useState(null);
    const [geography, setGeography] = useState(null);
    const [jorongs, setJorongs] = useState([]);
    const [potensi, setPotensi] = useState([]);
    const [tourism, setTourism] = useState([]);
    const [assets, setAssets] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { hero: homeHero } = usePageHero('home');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, officialsRes, newsRes, productsRes, demoRes, geoRes, jorongRes, potensiRes, tourismRes, assetsRes, galleryRes] = await Promise.all([
                    api.get(ENDPOINTS.PROFILE.GET),
                    api.get(ENDPOINTS.OFFICIALS.GET_ALL),
                    api.get(ENDPOINTS.NEWS.GET_ALL),
                    api.get(ENDPOINTS.PRODUCTS.GET_ALL),
                    api.get(ENDPOINTS.DEMOGRAPHICS.GET),
                    api.get(ENDPOINTS.GEOGRAPHY.GET),
                    api.get(ENDPOINTS.JORONGS.GET_ALL),
                    api.get(ENDPOINTS.POTENSI.GET_ALL),
                    api.get(ENDPOINTS.TOURISM.GET_ALL),
                    api.get(ENDPOINTS.ASSETS.GET_ALL),
                    api.get(ENDPOINTS.GALLERY.GET_ALL),
                ]);
                setProfile(profileRes.data?.data || profileRes.data);
                
                const officialsData = officialsRes.data?.data || officialsRes.data || [];
                setOfficials(Array.isArray(officialsData) ? officialsData.slice(0, 4) : []);
                
                const newsData = newsRes.data?.data || newsRes.data || [];
                setNews(Array.isArray(newsData) ? newsData.slice(0, 3) : []);
                
                const productsData = productsRes.data?.data || productsRes.data || [];
                setProducts(Array.isArray(productsData) ? productsData.slice(0, 3) : []);
                
                setDemographics(demoRes.data?.data || demoRes.data);
                setGeography(geoRes.data?.data || geoRes.data);
                
                const jorongsData = jorongRes.data?.data || jorongRes.data || [];
                setJorongs(Array.isArray(jorongsData) ? jorongsData : []);
                
                const potensiData = potensiRes.data?.data || potensiRes.data || [];
                setPotensi(Array.isArray(potensiData) ? potensiData : []);
                
                const tourismData = tourismRes.data?.data || tourismRes.data || [];
                setTourism(Array.isArray(tourismData) ? tourismData.slice(0, 6) : []);
                
                const assetsData = assetsRes.data?.data || assetsRes.data || [];
                setAssets(Array.isArray(assetsData) ? assetsData.slice(0, 6) : []);
                
                const galleryData = galleryRes.data?.data || galleryRes.data || [];
                setGallery(Array.isArray(galleryData) ? galleryData.slice(0, 8) : []);
            } catch (error) {
                console.error('Failed to fetch home data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    };

    // Merge profile with fallbacks - prioritize server data
    const displayProfile = {
        name: profile?.name || 'Nagari Talang Anau',
        kecamatan: profile?.kecamatan || 'Gunuang Omeh',
        kabupaten: profile?.kabupaten || 'Lima Puluh Kota',
        headName: profile?.headName || 'Wali Nagari',
        headPhoto: profile?.headPhoto || '',
        headMessage: profile?.headMessage || 'Selamat datang di website resmi Nagari Talang Anau.'
    };

    const statsData = [
        { label: 'Penduduk', value: demographics?.totalPopulation?.toLocaleString('id-ID') || '-', icon: 'MdPeople' },
        { label: 'Kepala Keluarga', value: demographics?.totalFamilies?.toLocaleString('id-ID') || '-', icon: 'MdFamilyRestroom' },
        { label: 'Luas Wilayah', value: geography?.totalArea ? `${Number(geography.totalArea).toLocaleString('id-ID')} Ha` : '-', icon: 'MdMap' },
        { label: 'Jorong', value: jorongs.length > 0 ? jorongs.length.toString() : '-', icon: 'MdHomeWork' }
    ];
    
    // Hero from server
    const heroBackground = homeHero?.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80';
    const heroTitle = homeHero?.title || displayProfile.name;
    const heroSubtitle = homeHero?.subtitle || `${displayProfile.kecamatan}, ${displayProfile.kabupaten}`;

    return (
        <div>
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroBackground})` }}
                >
                    <div className="absolute inset-0 bg-slate-900/70"></div>
                </div>
                
                <div className="container mx-auto px-4 relative z-10 text-white text-center py-20">
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-3">Selamat Datang di</p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{heroTitle}</h1>
                    <p className="text-slate-300 mb-8 max-w-xl mx-auto text-lg">{heroSubtitle}</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/tentang" className="bg-white text-slate-900 px-8 py-3 font-medium hover:bg-slate-100 transition-colors">
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

            {/* Sambutan Wali Nagari - Photo from server */}
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-auto">
                        <div className="w-52 h-64 bg-slate-200 shrink-0 border border-slate-300 overflow-hidden">
                            <img 
                                src={displayProfile.headPhoto || 'https://placehold.co/300x400?text=Wali+Nagari'} 
                                alt={displayProfile.headName} 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        <div>
                            <p className="text-sm text-blue-600 font-medium uppercase tracking-wider mb-3">Sambutan Wali Nagari</p>
                            <blockquote className="text-xl text-slate-700 italic mb-4 leading-relaxed">
                                "{displayProfile.headMessage || 'Selamat datang di website resmi Nagari Talang Anau.'}"
                            </blockquote>
                            <p className="font-bold text-slate-900">{displayProfile.headName}</p>
                            <p className="text-sm text-slate-500">Wali {displayProfile.name}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Wisata Nagari - Horizontal Scroll Cards */}
            {tourism.length > 0 && (
                <section className="py-24 overflow-hidden">
                    <div className="container mx-auto px-4 mb-8">
                        <div className="flex justify-between items-center">
                            <SectionHeader title="Destinasi Wisata" subtitle="Keindahan alam dan budaya Nagari" align="left" />
                            <Link to="/listing" className="text-blue-600 hover:underline font-medium flex items-center gap-1">
                                Lihat Semua <MdArrowForward />
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-8 pb-4">
                            <div className="shrink-0 w-[calc((100vw-1280px)/2)] hidden xl:block"></div>
                            {tourism.map((item, idx) => (
                                <div key={item.id || idx} className="shrink-0 w-80 snap-start group">
                                    <div className="relative h-56 overflow-hidden mb-4">
                                        <img 
                                            src={item.image || 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80'} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <div className="flex items-center gap-1 text-sm mb-1 opacity-80">
                                                <MdLocationOn size={14} />
                                                <span>{item.location || 'Nagari Talang Anau'}</span>
                                            </div>
                                            <h3 className="font-bold text-lg">{item.name}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="shrink-0 w-[calc((100vw-1280px)/2)] hidden xl:block"></div>
                        </div>
                    </div>
                </section>
            )}

            {/* Perangkat Nagari */}
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto px-4">
                    <SectionHeader title="Perangkat Nagari" subtitle={`Jajaran pemerintahan ${displayProfile.name}`} />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {officials.length > 0 ? officials.map((person) => (
                            <div key={person.id} className="text-center">
                                <div className="w-full aspect-square bg-slate-100 mb-3 border border-slate-200 overflow-hidden">
                                    {person.image && <img src={person.image} alt={person.name} className="w-full h-full object-cover" />}
                                </div>
                                <h3 className="font-medium text-slate-900">{person.name}</h3>
                                <p className="text-sm text-slate-500">{person.position}</p>
                            </div>
                        )) : (
                            <p className="col-span-4 text-center text-slate-500">Belum ada data perangkat</p>
                        )}
                    </div>
                    <div className="text-center mt-8">
                        <Link to="/struktur" className="text-blue-600 hover:underline font-medium">
                            Lihat Struktur Lengkap →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Aset Nagari - List Style with Value & Year */}
            {assets.length > 0 && (
                <section className="py-24">
                    <div className="container mx-auto px-4">
                        <SectionHeader title="Aset Nagari" subtitle="Inventaris dan kekayaan daerah" />
                        <div className="bg-white border border-slate-200 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="text-left px-5 py-3 text-sm font-semibold text-slate-700">Nama Aset</th>
                                        <th className="text-left px-5 py-3 text-sm font-semibold text-slate-700 hidden md:table-cell">Kategori</th>
                                        <th className="text-right px-5 py-3 text-sm font-semibold text-slate-700">Nilai</th>
                                        <th className="text-center px-5 py-3 text-sm font-semibold text-slate-700 hidden sm:table-cell">Tahun</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {assets.map((item, idx) => (
                                        <tr key={item.id || idx} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 flex items-center justify-center shrink-0">
                                                        <MdAccountBalance size={20} className="text-blue-600" />
                                                    </div>
                                                    <span className="font-medium text-slate-900">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-sm text-slate-500 hidden md:table-cell">{item.category || '-'}</td>
                                            <td className="px-5 py-4 text-right font-semibold text-slate-900">
                                                {item.value ? formatPrice(item.value) : '-'}
                                            </td>
                                            <td className="px-5 py-4 text-center text-sm text-slate-500 hidden sm:table-cell">{item.year || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="text-center mt-6">
                            <Link to="/assets" className="text-blue-600 hover:underline font-medium">
                                Lihat Selengkapnya →
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Berita - Cards */}
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <SectionHeader title="Kabar Nagari" subtitle="Berita dan kegiatan terkini" align="left" />
                        <Link to="/news" className="text-blue-600 hover:underline font-medium flex items-center gap-1">
                            Lihat Semua <MdArrowForward />
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {news.length > 0 ? news.map((item) => (
                            <div key={item.id} className="bg-white border border-slate-200">
                                <div className="h-44 bg-slate-100">
                                    {item.image && <img src={item.image} alt={item.title} className="w-full h-44 object-cover" />}
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                        <MdCalendarToday size={12} />
                                        <span>{item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID') : ''}</span>
                                        {item.category && <span className="text-blue-600">• {item.category}</span>}
                                    </div>
                                    <h3 className="font-medium text-slate-900 mb-2 line-clamp-2">
                                        <Link to={`/news/${item.id}`} className="hover:text-blue-600">{item.title}</Link>
                                    </h3>
                                    <p className="text-sm text-slate-600 line-clamp-2">{item.summary}</p>
                                </div>
                            </div>
                        )) : (
                            <p className="col-span-3 text-center text-slate-500">Belum ada berita</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Potensi Nagari - Full Width Carousel */}
            <section className="py-24 overflow-hidden">
                <div className="container mx-auto px-4">
                    <SectionHeader title="Potensi Nagari" subtitle="Keunggulan Daerah" />
                </div>
                <div className="relative">
                    <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-8 pb-4">
                        <div className="shrink-0 w-[calc((100vw-1280px)/2)] hidden xl:block"></div>
                        {(potensi.length > 0 ? potensi : [{ id: 1, title: 'Belum ada data', category: 'Info', image: '' }]).map((item, idx) => (
                            <div key={item.id || idx} className="shrink-0 w-80 h-96 snap-start relative group cursor-pointer">
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                    style={{ backgroundImage: `url(${item.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'})` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <span className="inline-block bg-blue-600 text-white text-xs font-medium uppercase tracking-wider px-3 py-1 mb-3">
                                        {item.category}
                                    </span>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                        <div className="shrink-0 w-[calc((100vw-1280px)/2)] hidden xl:block"></div>
                    </div>
                </div>
            </section>

            {/* Produk Nagari - Cards */}
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto px-4">
                    <SectionHeader title="Produk Nagari" subtitle="Produk unggulan dari masyarakat nagari" />
                    <div className="grid md:grid-cols-3 gap-6">
                        {products.length > 0 ? products.map((product) => (
                            <Link key={product.id} to={`/marketplace/${product.id}`} className="bg-white border border-slate-200 hover:border-slate-300 transition-colors">
                                <div className="h-48 bg-slate-100">
                                    {product.image && <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />}
                                </div>
                                <div className="p-5">
                                    <h3 className="font-medium text-slate-900 mb-2">{product.name}</h3>
                                    <p className="text-lg font-bold text-green-600">{formatPrice(product.price)}</p>
                                </div>
                            </Link>
                        )) : (
                            <p className="col-span-3 text-center text-slate-500">Belum ada produk</p>
                        )}
                    </div>
                    <div className="text-center mt-10">
                        <Link to="/marketplace" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 font-medium hover:bg-slate-800 transition-colors">
                            <Icons.MdStore size={18} />
                            Kunjungi Pasar Nagari
                        </Link>
                    </div>
                </div>
            </section>

            {/* Galeri - Masonry Grid */}
            {gallery.length > 0 && (
                <section className="py-24">
                    <div className="container mx-auto px-4">
                        <SectionHeader title="Galeri Nagari" subtitle="Dokumentasi kegiatan dan keindahan daerah" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {gallery.map((item, idx) => (
                                <div 
                                    key={item.id || idx} 
                                    className={`relative overflow-hidden group cursor-pointer ${idx === 0 || idx === 5 ? 'md:col-span-2 md:row-span-2' : ''}`}
                                >
                                    <div className={`${idx === 0 || idx === 5 ? 'h-80' : 'h-40'} bg-slate-200`}>
                                        <img 
                                            src={item.image || 'https://placehold.co/400x300'} 
                                            alt={item.title || 'Galeri'} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                                        <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="font-medium text-sm">{item.title || item.caption || 'Galeri Nagari'}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            
            <MapSection />
        </div>
    );
};

export default Home;
