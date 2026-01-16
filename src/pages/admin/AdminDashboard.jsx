import { useEffect, useState } from 'react';
import { MdArticle, MdGroup, MdImage, MdLandscape, MdStore, MdTrendingUp } from 'react-icons/md';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        news: 0,
        products: 0,
        officials: 0,
        tourism: 0,
        gallery: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [newsRes, productsRes, officialsRes, tourismRes, galleryRes] = await Promise.all([
                    api.get(ENDPOINTS.NEWS.GET_ALL),
                    api.get(ENDPOINTS.PRODUCTS.GET_ALL),
                    api.get(ENDPOINTS.OFFICIALS.GET_ALL),
                    api.get(ENDPOINTS.TOURISM.GET_ALL),
                    api.get(ENDPOINTS.GALLERY.GET_ALL),
                ]);
                
                setStats({
                    news: newsRes.data?.data?.length || newsRes.data?.length || 0,
                    products: productsRes.data?.data?.length || productsRes.data?.length || 0,
                    officials: officialsRes.data?.data?.length || officialsRes.data?.length || 0,
                    tourism: tourismRes.data?.data?.length || tourismRes.data?.length || 0,
                    gallery: galleryRes.data?.data?.length || galleryRes.data?.length || 0,
                });
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { label: 'Berita', value: stats.news, icon: MdArticle, color: 'bg-blue-600', path: '/admin/news' },
        { label: 'Produk', value: stats.products, icon: MdStore, color: 'bg-green-600', path: '/admin/products' },
        { label: 'Perangkat', value: stats.officials, icon: MdGroup, color: 'bg-purple-600', path: '/admin/officials' },
        { label: 'Wisata', value: stats.tourism, icon: MdLandscape, color: 'bg-orange-600', path: '/admin/tourism' },
        { label: 'Galeri', value: stats.gallery, icon: MdImage, color: 'bg-pink-600', path: '/admin/gallery' },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500 mt-1">Selamat datang di Admin Panel Nagari Talang Anau</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                {statCards.map((stat) => (
                    <Link 
                        key={stat.label} 
                        to={stat.path}
                        className="bg-white border border-slate-200 p-6 hover:border-slate-300 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color} text-white p-3`}>
                                <stat.icon size={24} />
                            </div>
                            <MdTrendingUp className="text-green-500" size={20} />
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">
                            {loading ? '...' : stat.value}
                        </div>
                        <div className="text-sm text-slate-500">{stat.label}</div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Aksi Cepat</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link 
                        to="/admin/news" 
                        className="p-4 border border-slate-200 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                        <MdArticle size={24} className="mx-auto mb-2 text-blue-600" />
                        <span className="text-sm font-medium">Tambah Berita</span>
                    </Link>
                    <Link 
                        to="/admin/products" 
                        className="p-4 border border-slate-200 text-center hover:border-green-500 hover:bg-green-50 transition-colors"
                    >
                        <MdStore size={24} className="mx-auto mb-2 text-green-600" />
                        <span className="text-sm font-medium">Tambah Produk</span>
                    </Link>
                    <Link 
                        to="/admin/gallery" 
                        className="p-4 border border-slate-200 text-center hover:border-pink-500 hover:bg-pink-50 transition-colors"
                    >
                        <MdImage size={24} className="mx-auto mb-2 text-pink-600" />
                        <span className="text-sm font-medium">Upload Galeri</span>
                    </Link>
                    <Link 
                        to="/admin/settings" 
                        className="p-4 border border-slate-200 text-center hover:border-slate-400 hover:bg-slate-50 transition-colors"
                    >
                        <MdGroup size={24} className="mx-auto mb-2 text-slate-600" />
                        <span className="text-sm font-medium">Edit Profil</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
