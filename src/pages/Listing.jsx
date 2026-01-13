import MapSection from '../components/MapSection';

const Listing = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Header */}
            <div className="relative py-24">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&q=80)' }}
                >
                    <div className="absolute inset-0 bg-slate-900/75"></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-2">Visualisasi Wilayah</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">Peta Nagari</h1>
                    <p className="text-slate-300">Lokasi penting dan batas wilayah Nagari Talang Anau</p>
                </div>
            </div>

            {/* Map Content */}
            <div className="relative" style={{ height: 'calc(100vh - 200px)' }}>
                {/* Filter Sidebar */}
                <div className="absolute top-4 left-4 z-10 bg-white p-4 shadow-lg w-56 hidden md:block border border-slate-200">
                    <h3 className="font-medium text-slate-900 mb-3 text-sm">Filter Lokasi</h3>
                    <div className="space-y-2">
                        {['Kantor Pemerintahan', 'Fasilitas Umum', 'Wisata', 'Tempat Ibadah'].map((item, idx) => (
                            <label key={idx} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 transition-colors">
                                <input type="checkbox" className="text-blue-600" defaultChecked />
                                <span className="text-sm text-slate-600">{item}</span>
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
