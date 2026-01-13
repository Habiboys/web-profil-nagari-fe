import { useState } from 'react';
import { MdArrowBack, MdCheckCircle, MdStore, MdWhatsapp } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { marketplaceData } from '../data/mockData';

const ProductDetail = () => {
    const { id } = useParams();
    const product = marketplaceData.find(p => p.id === parseInt(id));
    const [selectedVariant, setSelectedVariant] = useState(null);

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold uppercase">Produk tidak ditemukan</div>;
    }

    // Mock variants if not present
    const variants = product.variants || ['Satuan', 'Grosir (10+)'];

    const handleBuy = () => {
        const message = `Halo ${product.seller}, saya tertarik membeli ${product.name} (Rp ${product.price.toLocaleString('id-ID')}). Apakah stok masih tersedia?`;
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <Link to="/marketplace" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold uppercase tracking-widest text-xs mb-8 transition-colors">
                <MdArrowBack /> Kembali ke Pasar
            </Link>

            <div className="bg-white border border-gray-200 shadow-sm max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-0 md:border-l border-gray-200">
                    {/* Image Section */}
                    <div className="bg-gray-100 h-[500px] md:h-auto w-full relative group border-b md:border-b-0 md:border-r border-gray-200">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors"></div>
                    </div>

                    {/* Details Section */}
                    <div className="p-8 md:p-12 flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-blue-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">
                                Produk Unggulan
                            </span>
                            <span className="flex items-center gap-1 text-green-700 text-xs font-bold uppercase tracking-wide border border-green-200 bg-green-50 px-2 py-1">
                                <MdCheckCircle /> Tersedia
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 uppercase tracking-tight">{product.name}</h1>
                        <p className="text-4xl font-black text-slate-900 mb-8 border-b-4 border-orange-500 inline-block pb-2">
                            Rp {product.price.toLocaleString('id-ID')}
                        </p>

                        <div className="space-y-8 flex-1">
                            <div>
                                <h3 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest">Pilihan Varian</h3>
                                <div className="flex flex-wrap gap-3">
                                    {variants.map((v, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => setSelectedVariant(v)}
                                            className={`px-6 py-3 text-sm font-bold uppercase tracking-wider border transition-all ${
                                                selectedVariant === v 
                                                ? 'border-slate-900 bg-slate-900 text-white' 
                                                : 'border-gray-200 hover:border-slate-900 text-slate-500 hover:text-slate-900'
                                            }`}
                                        >
                                            {v}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 py-6 border-y border-gray-100">
                                <div className="w-12 h-12 bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                                    <MdStore size={24} />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Penjual</div>
                                    <div className="font-bold text-slate-900 text-lg uppercase tracking-tight">{product.seller}</div>
                                </div>
                            </div>

                            <p className="text-slate-600 leading-relaxed font-medium">
                                Nikmati kualitas terbaik dari produk lokal kami. Dibuat dengan bahan pilihan dan dedikasi tinggi oleh pengrajin desa.
                            </p>
                        </div>

                        <div className="mt-10 pt-6">
                            <button 
                                onClick={handleBuy}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 uppercase tracking-widest transition-all flex items-center justify-center gap-3 border-2 border-transparent hover:border-green-800"
                            >
                                <MdWhatsapp size={24} />
                                Beli via WhatsApp
                            </button>
                            <p className="text-center text-xs text-slate-400 mt-4 font-bold uppercase tracking-wide">
                                Transaksi aman dan langsung terhubung dengan penjual.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
