import { MdSearch } from 'react-icons/md';
import ProductCard from '../components/ProductCard';
import { marketplaceData } from '../data/mockData';

const Marketplace = () => {
    const categories = ['Semua', 'Pertanian', 'Kerajinan', 'Olahan Makanan'];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero with Background */}
            <div className="relative py-28">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&q=80)' }}
                >
                    <div className="absolute inset-0 bg-slate-900/75"></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-2">UMKM & Produk Lokal</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Pasar Nagari</h1>
                    <p className="text-slate-300 max-w-lg mx-auto mb-8">
                        Dukung perekonomian lokal dengan membeli produk berkualitas dari masyarakat nagari.
                    </p>

                    {/* Search */}
                    <div className="max-w-md mx-auto relative">
                        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                            type="text" 
                            className="w-full pl-12 pr-4 py-3 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Cari produk..." 
                        />
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="border-b border-slate-200 bg-white sticky top-20 z-30">
                <div className="container mx-auto px-4">
                    <div className="flex gap-1 py-4 overflow-x-auto scrollbar-hide">
                        {categories.map((cat, idx) => (
                            <button 
                                key={idx} 
                                className={`px-5 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                                    idx === 0 
                                        ? 'bg-slate-900 text-white' 
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {marketplaceData.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
