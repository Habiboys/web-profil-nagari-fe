import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';

const Marketplace = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get(ENDPOINTS.PRODUCTS.GET_ALL);
                setProducts(res.data || []);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div className="bg-slate-900 text-white py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-2">Pasar Nagari</h1>
                    <p className="text-slate-300">Produk unggulan dari Nagari Talang Anau</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                {loading ? (
                    <div className="text-center py-12 text-slate-500">Loading...</div>
                ) : products.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">Belum ada produk</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Link 
                                key={product.id} 
                                to={`/marketplace/${product.id}`}
                                className="bg-white border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors"
                            >
                                <div className="h-48 bg-slate-100">
                                    {product.image && (
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-medium text-slate-900 mb-1 line-clamp-2">{product.name}</h3>
                                    <p className="text-lg font-bold text-green-600">{formatPrice(product.price)}</p>
                                    {product.sellerName && (
                                        <p className="text-xs text-slate-500 mt-2">{product.sellerName}</p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Marketplace;
