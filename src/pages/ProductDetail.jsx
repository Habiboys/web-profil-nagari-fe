import { useEffect, useState } from 'react';
import { MdPhone, MdWhatsapp } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(ENDPOINTS.PRODUCTS.GET_ONE(id));
                setProduct(res.data);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-slate-500">Loading...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-slate-500 mb-4">Produk tidak ditemukan</p>
                <Link to="/marketplace" className="text-blue-600 hover:underline">← Kembali ke Pasar</Link>
            </div>
        );
    }

    const waLink = product.sellerPhone 
        ? `https://wa.me/62${product.sellerPhone.replace(/^0/, '')}?text=Halo, saya tertarik dengan produk ${product.name}`
        : '#';

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div className="bg-slate-900 text-white py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <Link to="/marketplace" className="text-slate-300 hover:text-white">← Kembali ke Pasar</Link>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Image */}
                    <div className="bg-white border border-slate-200">
                        {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
                        ) : (
                            <div className="w-full h-96 bg-slate-100 flex items-center justify-center text-slate-400">
                                No Image
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-4">{product.name}</h1>
                        <p className="text-3xl font-bold text-green-600 mb-6">{formatPrice(product.price)}</p>
                        
                        {product.description && (
                            <div className="mb-6">
                                <h3 className="font-medium text-slate-900 mb-2">Deskripsi</h3>
                                <p className="text-slate-600">{product.description}</p>
                            </div>
                        )}

                        {product.sellerName && (
                            <div className="bg-white border border-slate-200 p-4 mb-6">
                                <h3 className="font-medium text-slate-900 mb-2">Penjual</h3>
                                <p className="text-slate-600">{product.sellerName}</p>
                                {product.sellerPhone && (
                                    <p className="text-slate-500 text-sm flex items-center gap-2 mt-1">
                                        <MdPhone size={16} /> {product.sellerPhone}
                                    </p>
                                )}
                            </div>
                        )}

                        {product.sellerPhone && (
                            <a 
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-green-600 text-white py-3 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                            >
                                <MdWhatsapp size={20} />
                                Hubungi via WhatsApp
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
