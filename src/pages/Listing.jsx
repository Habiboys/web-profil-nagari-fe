import MapSection from '../components/MapSection';

const Listing = () => {
    return (
        <div className="flex flex-col h-[calc(100vh-64px)]">
            <div className="py-6 bg-white shadow-sm z-10 shrink-0">
                <div className="container mx-auto px-4">
                     <h1 className="text-2xl font-bold text-gray-900">Peta Wilayah Desa</h1>
                     <p className="text-gray-500 text-sm">Sebaran lokasi penting dan batas wilayah Desa Tamang.</p>
                </div>
            </div>
            
            <div className="flex-1 relative">
                {/* Filter/Sidebar Placeholder */}
                <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-lg w-64 hidden md:block border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider">Filter Lokasi</h3>
                    <div className="space-y-2">
                        {['Kantor Pemerintahan', 'Fasilitas Umum', 'Wisata', 'Tempat Ibadah'].map((item, idx) => (
                            <label key={idx} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                                <span className="text-sm text-gray-700">{item}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <MapSection fullHeight={true} />
            </div>
        </div>
    );
};

export default Listing;
