import { useEffect, useState } from 'react';
import { MdAccountBalance, MdSearch } from 'react-icons/md';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import usePageHero from '../hooks/usePageHero';

const Assets = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    
    const { hero } = usePageHero('assets');

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const res = await api.get(ENDPOINTS.ASSETS.GET_ALL);
                const data = res.data?.data || res.data || [];
                setAssets(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to fetch assets:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAssets();
    }, []);

    const filteredAssets = assets.filter(item =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase())
    );

    const formatPrice = (price) => {
        if (!price) return '-';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    };

    // Group by category
    const groupedAssets = filteredAssets.reduce((acc, item) => {
        const cat = item.category || 'Lainnya';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
    }, {});

    const heroBackground = hero?.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80';

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
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-2">Inventaris Nagari</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">{hero?.title || 'Aset Nagari'}</h1>
                    <p className="text-slate-300">{hero?.subtitle || 'Daftar kekayaan dan inventaris Nagari Talang Anau'}</p>
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
                            placeholder="Cari aset..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-slate-200 bg-white focus:border-blue-500 outline-none"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-slate-500">Loading...</div>
                ) : filteredAssets.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        {search ? 'Tidak ada aset yang cocok.' : 'Belum ada data aset.'}
                    </div>
                ) : (
                    <div className="space-y-8">
                        {Object.entries(groupedAssets).map(([category, items]) => (
                            <div key={category}>
                                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <MdAccountBalance className="text-blue-600" />
                                    {category}
                                    <span className="text-sm font-normal text-slate-500">({items.length} item)</span>
                                </h2>
                                <div className="bg-white border border-slate-200 overflow-hidden">
                                    <table className="w-full">
                                        <thead className="bg-slate-50 border-b border-slate-200">
                                            <tr>
                                                <th className="text-left px-5 py-3 text-sm font-semibold text-slate-700">Nama Aset</th>
                                                <th className="text-right px-5 py-3 text-sm font-semibold text-slate-700">Nilai</th>
                                                <th className="text-center px-5 py-3 text-sm font-semibold text-slate-700 hidden sm:table-cell">Tahun</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {items.map((item, idx) => (
                                                <tr key={item.id || idx} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-5 py-4">
                                                        <span className="font-medium text-slate-900">{item.name}</span>
                                                    </td>
                                                    <td className="px-5 py-4 text-right font-semibold text-green-600">
                                                        {formatPrice(item.value)}
                                                    </td>
                                                    <td className="px-5 py-4 text-center text-sm text-slate-500 hidden sm:table-cell">
                                                        {item.year || '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}

                        {/* Summary */}
                        <div className="bg-slate-900 text-white p-6 mt-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-slate-400">Total Aset</p>
                                    <p className="text-2xl font-bold">{filteredAssets.length} Item</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-slate-400">Total Nilai</p>
                                    <p className="text-2xl font-bold text-green-400">
                                        {formatPrice(filteredAssets.reduce((sum, item) => sum + (Number(item.value) || 0), 0))}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Assets;
