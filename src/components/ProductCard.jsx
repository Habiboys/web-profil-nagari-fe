import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/marketplace/${product.id}`} className="group block">
            {/* Image */}
            <div className="aspect-square bg-slate-100 overflow-hidden mb-4">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
            </div>
            
            {/* Info */}
            <div>
                <p className="text-xs text-slate-400 mb-1">{product.seller}</p>
                <h3 className="font-medium text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                </h3>
                <p className="text-lg font-bold text-slate-900">
                    Rp {product.price.toLocaleString('id-ID')}
                </p>
            </div>
        </Link>
    );
};

export default ProductCard;
