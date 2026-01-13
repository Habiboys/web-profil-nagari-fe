import { MdSearch, MdShoppingBag } from 'react-icons/md';
import ProductCard from '../components/ProductCard';
import { marketplaceData } from '../data/mockData';

const Marketplace = () => {
    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Marketplace Header / Hero - Flat */}
            <div className="bg-slate-50 border-b border-gray-200 pt-16 pb-20 px-4">
                <div className="container mx-auto max-w-6xl text-center">
                    <span className="inline-block py-1 px-4 bg-orange-600 text-white text-xs font-bold mb-6 tracking-widest uppercase">
                        <MdShoppingBag className="inline mr-2" /> UMKM & Produk Lokal
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter uppercase">
                        Pasar Desa <span className="text-orange-600">Tamang</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Dukung perekonomian lokal dengan membeli produk asli berkualitas dari pengrajin dan petani desa kami.
                    </p>

                    {/* Search Bar - Square */}
                    <div className="max-w-xl mx-auto relative flex shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <MdSearch className="h-6 w-6 text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all font-medium rounded-none" 
                            placeholder="Cari produk (kopi, anyaman, madu...)" 
                        />
                        <button className="px-8 bg-slate-900 text-white font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors border border-slate-900">
                            Cari
                        </button>
                    </div>
                </div>
            </div>

            {/* Categories & Filter - Square Tags */}
            <div className="sticky top-[72px] z-30 bg-white/95 border-b border-gray-200 py-4 mb-12">
                <div className="container mx-auto px-4 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
                    <div className="flex gap-2">
                        {['Semua Produk', 'Pertanian', 'Kerajinan', 'Olahan Makanan', 'Peternakan'].map((cat, idx) => (
                            <button 
                                key={idx} 
                                className={`px-6 py-2 text-sm font-bold whitespace-nowrap uppercase tracking-wide transition-all border ${
                                    idx === 0 
                                    ? 'bg-slate-900 text-white border-slate-900' 
                                    : 'bg-white border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-600'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    {marketplaceData.map((product, idx) => (
                        <div key={product.id} className="animate-in fade-in zoom-in duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
