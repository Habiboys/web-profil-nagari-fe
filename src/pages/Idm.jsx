import { MdTrendingUp } from 'react-icons/md';

const Idm = () => {
    const idmScore = 0.8286;
    const idmStatus = "MANDIRI";
    
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Header with Background */}
            <div className="relative py-24">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504418456623-1e32de4e6a03?w=1920&q=80)' }}
                >
                    <div className="absolute inset-0 bg-slate-900/75"></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-2">Data Tahun 2025</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">Indeks Desa Membangun</h1>
                    <p className="text-slate-300">Pengukuran kemandirian dan pembangunan Nagari Talang Anau</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Main Score */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="border border-slate-200 p-8">
                        <p className="text-sm text-slate-500 uppercase tracking-wider mb-2">Status IDM</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{idmStatus}</h2>
                        <p className="text-sm text-slate-500">Terverifikasi Kemendes PDTT</p>
                    </div>
                    <div className="bg-slate-50 p-8">
                        <p className="text-sm text-slate-500 uppercase tracking-wider mb-2">Skor Indeks</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">{idmScore}</h2>
                        <p className="text-sm text-green-600 flex items-center gap-1">
                            <MdTrendingUp /> +0.024 dari tahun sebelumnya
                        </p>
                    </div>
                </div>

                {/* Detailed Scores */}
                <h3 className="text-lg font-bold text-slate-900 mb-6">Komponen Indeks</h3>
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {[
                        { title: "Ketahanan Sosial", code: "IKS", score: 0.8656 },
                        { title: "Ketahanan Ekonomi", code: "IKE", score: 0.6667 },
                        { title: "Ketahanan Lingkungan", code: "IKL", score: 0.9333 }
                    ].map((item, idx) => (
                        <div key={idx} className="border border-slate-200 p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm text-slate-500">{item.code}</p>
                                    <h4 className="font-medium text-slate-900">{item.title}</h4>
                                </div>
                                <span className="text-2xl font-bold text-slate-900">{item.score}</span>
                            </div>
                            <div className="h-2 bg-slate-100 w-full">
                                <div className="h-full bg-blue-600" style={{ width: `${item.score * 100}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Analysis */}
                <div className="bg-slate-50 p-8">
                    <h3 className="font-bold text-slate-900 mb-4">Analisis</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        Nagari Talang Anau telah mencapai status <strong>MANDIRI</strong> dengan skor 0.8286. 
                        Kekuatan utama terletak pada aspek Lingkungan (0.9333) dan Sosial (0.8656). 
                        Fokus pengembangan selanjutnya pada penguatan sektor Ekonomi (0.6667).
                    </p>
                    <button className="bg-slate-900 text-white px-6 py-2 text-sm font-medium hover:bg-slate-800 transition-colors">
                        Unduh Laporan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Idm;
