import { useState } from 'react';
import { MdArrowBack, MdWhatsapp } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { marketplaceData } from '../data/mockData';

const ProductDetail = () => {
    const { id } = useParams();
    const product = marketplaceData.find(p => p.id === parseInt(id));
    const [selectedVariant, setSelectedVariant] = useState(0);

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center text-slate-500">Produk tidak ditemukan</div>;
    }

    const variants = product.variants || ['Satuan', 'Grosir'];

    const handleBuy = () => {
        const message = `Halo ${product.seller}, saya tertarik membeli ${product.name} (Rp ${product.price.toLocaleString('id-ID')}). Apakah stok masih tersedia?`;
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Mini Hero Header */}
            <div className="bg-slate-900 pt-28 pb-8">
                <div className="container mx-auto px-4">
                    <Link to="/marketplace" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
                        <MdArrowBack size={18} />
                        <span>Kembali ke Pasar</span>
                    </Link>
                </div>
            </div>

            {/* Product Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Image */}
                        <div className="aspect-square bg-slate-100">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Details */}
                        <div className="flex flex-col">
                            <div className="mb-6">
                                <p className="text-sm text-blue-600 font-medium mb-2">{product.seller}</p>
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>
                                <p className="text-3xl font-bold text-slate-900">
                                    Rp {product.price.toLocaleString('id-ID')}
                                </p>
                            </div>

                            {/* Variants */}
                            <div className="mb-8">
                                <p className="text-sm font-medium text-slate-700 mb-3">Pilihan</p>
                                <div className="flex gap-2">
                                    {variants.map((v, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => setSelectedVariant(i)}
                                            className={`px-4 py-2 text-sm transition-colors ${
                                                selectedVariant === i 
                                                    ? 'bg-slate-900 text-white' 
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                        >
                                            {v}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8 pb-8 border-b border-slate-200">
                                <p className="text-sm font-medium text-slate-700 mb-3">Deskripsi</p>
                                <p className="text-slate-600 leading-relaxed">
                                    Produk berkualitas dari masyarakat Nagari Talang Anau. Dibuat dengan bahan pilihan dan proses produksi yang terjaga kualitasnya. Cocok untuk kebutuhan sehari-hari maupun oleh-oleh khas daerah.
                                </p>
                            </div>

                            {/* Action */}
                            <div className="mt-auto">
                                <button 
                                    onClick={handleBuy}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 transition-colors flex items-center justify-center gap-3"
                                >
                                    <MdWhatsapp size={22} />
                                    Hubungi Penjual
                                </button>
                                <p className="text-center text-xs text-slate-400 mt-3">
                                    Transaksi langsung dengan penjual via WhatsApp
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
