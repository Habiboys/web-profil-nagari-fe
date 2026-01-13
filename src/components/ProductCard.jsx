import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white border border-gray-200 flex flex-col h-full group hover:border-slate-800 transition-colors duration-200">
            <div className="relative h-64 bg-gray-100 overflow-hidden">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                />
                <span className="absolute top-0 right-0 bg-slate-900 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    {product.seller.split(' ')[0]}
                </span>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors uppercase">
                    <Link to={`/marketplace/${product.id}`}>
                        {product.name}
                    </Link>
                </h3>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-3">
                    <span className="text-xl font-black text-orange-600">
                        Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    <Link 
                        to={`/marketplace/${product.id}`} 
                        className="w-full text-center py-2 border border-slate-900 text-slate-900 text-sm font-bold uppercase tracking-wide hover:bg-slate-900 hover:text-white transition-all"
                    >
                        Lihat Detail
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
