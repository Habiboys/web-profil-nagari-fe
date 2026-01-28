import { MdAccessTime, MdClose, MdLocalPhone, MdLocationOn } from 'react-icons/md';

const TourismDetailModal = ({ tourism, isOpen, onClose }) => {
    if (!isOpen || !tourism) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/60 z-50 transition-opacity"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
                <div 
                    className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 transition-colors"
                        aria-label="Close"
                    >
                        <MdClose size={24} className="text-slate-900" />
                    </button>

                    {/* Image */}
                    <div className="relative h-80 bg-slate-200">
                        <img 
                            src={tourism.image || 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&q=80'} 
                            alt={tourism.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <h2 className="text-3xl font-bold mb-2">{tourism.name}</h2>
                            {tourism.location && (
                                <div className="flex items-center gap-2 text-slate-200">
                                    <MdLocationOn size={18} />
                                    <span>{tourism.location}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {/* Description */}
                        {tourism.description && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-slate-900 mb-3">Deskripsi</h3>
                                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                                    {tourism.description}
                                </p>
                            </div>
                        )}

                        {/* Additional Info Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {tourism.openingHours && (
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-3 shrink-0">
                                        <MdAccessTime size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900 mb-1">Jam Buka</h4>
                                        <p className="text-sm text-slate-600">{tourism.openingHours}</p>
                                    </div>
                                </div>
                            )}

                            {tourism.contact && (
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-3 shrink-0">
                                        <MdLocalPhone size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900 mb-1">Kontak</h4>
                                        <p className="text-sm text-slate-600">{tourism.contact}</p>
                                    </div>
                                </div>
                            )}

                            {tourism.ticketPrice && (
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-3 shrink-0">
                                        <span className="text-blue-600 font-bold text-lg">Rp</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900 mb-1">Harga Tiket</h4>
                                        <p className="text-sm text-slate-600">{tourism.ticketPrice}</p>
                                    </div>
                                </div>
                            )}

                            {tourism.facilities && (
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-3 shrink-0">
                                        <span className="text-blue-600 font-bold text-lg">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900 mb-1">Fasilitas</h4>
                                        <p className="text-sm text-slate-600">{tourism.facilities}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TourismDetailModal;
