import { MdInfo, MdTrendingUp, MdVerified } from 'react-icons/md';

const Idm = () => {
    const idmScore = 0.8286;
    const idmStatus = "MANDIRI";
    
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Header - Flat Solid Color */}
            <div className="bg-slate-900 text-white py-20 border-b-4 border-orange-500">
                <div className="container mx-auto px-4 text-center">
                    <span className="bg-white/10 border border-white/20 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                        Data Tahun 2026
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-tight">Indeks Desa Membangun</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
                        Mengukur pencapaian kemandirian dan keberlanjutan pembangunan Desa Tamang secara objektif.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 pb-20 relative z-10">
                {/* Main Score Card - Boxy */}
                <div className="bg-white shadow-lg p-0 flex flex-col md:flex-row border border-slate-200 mb-12">
                    <div className="p-8 md:p-12 flex-1 border-b md:border-b-0 md:border-r border-slate-200">
                        <h2 className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Status IDM Saat Ini</h2>
                        <div className="text-5xl md:text-7xl font-black text-slate-900 mb-4 tracking-tighter">
                            {idmStatus}
                        </div>
                        <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 border border-green-200 inline-block font-bold text-sm uppercase">
                            <MdVerified /> Terverifikasi Kemendes PDTT
                        </div>
                    </div>

                    <div className="p-8 md:p-12 w-full md:w-1/3 bg-blue-50 flex flex-col justify-center items-center text-center">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Total Skor Indeks</span>
                        <span className="text-6xl font-black text-blue-800">{idmScore}</span>
                        <span className="text-green-600 text-sm font-bold mt-2 flex items-center gap-1 uppercase">
                            <MdTrendingUp /> +0.024 (Naik)
                        </span>
                    </div>
                </div>

                {/* Detailed Scores - Flat Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {[
                        { title: "Ketahanan Sosial (IKS)", score: 0.8656, color: "text-emerald-700", bg: "bg-emerald-100", border: "border-emerald-600", icon: "S" },
                        { title: "Ketahanan Ekonomi (IKE)", score: 0.6667, color: "text-amber-700", bg: "bg-amber-100", border: "border-amber-600", icon: "E" },
                        { title: "Ketahanan Lingkungan (IKL)", score: 0.9333, color: "text-cyan-700", bg: "bg-cyan-100", border: "border-cyan-600", icon: "L" }
                    ].map((item, idx) => (
                        <div key={idx} className={`bg-white p-8 shadow-sm border-t-4 ${item.border} border-x border-b border-slate-200 group hover:shadow-md transition-shadow`}>
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-12 h-12 ${item.bg} flex items-center justify-center text-xl font-black ${item.color}`}>
                                    {item.icon}
                                </div>
                                <div className={`text-3xl font-black ${item.color}`}>{item.score}</div>
                            </div>
                            <h3 className="text-slate-900 font-bold text-lg mb-4 uppercase tracking-tight">{item.title}</h3>
                            <div className="relative pt-2">
                                <div className="h-3 bg-slate-100 w-full">
                                    <div 
                                        className={`h-full ${item.bg.replace('bg-', 'bg-').replace('100', '600')} transition-all duration-1000 ease-out`} 
                                        style={{ width: `${item.score * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Analysis Section - Dark Flat */}
                <div className="bg-slate-800 p-8 md:p-12 text-white border-l-8 border-blue-600 shadow-lg">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="bg-white/10 p-4 backdrop-blur-none border border-white/10 shrink-0">
                            <MdInfo size={32} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide text-white">Analisis Perkembangan</h3>
                            <p className="text-slate-300 leading-relaxed text-lg mb-8 max-w-4xl text-justify">
                                Secara umum, Desa Tamang telah mencapai status <strong className="text-white bg-blue-700 px-1">MANDIRI</strong>. 
                                Kekuatan utama terletak pada aspek <span className="text-cyan-400 font-bold uppercase">Lingkungan (0.9333)</span> dan <span className="text-emerald-400 font-bold uppercase">Sosial (0.8656)</span>. 
                                Fokus pembangunan selanjutnya disarankan pada penguatan sektor <span className="text-amber-400 font-bold uppercase">Ekonomi (0.6667)</span> untuk mencapai keseimbangan pembangunan yang berkelanjutan.
                            </p>
                            <button className="bg-white text-slate-900 hover:bg-slate-200 px-8 py-3 font-bold uppercase tracking-wider transition-colors text-sm">
                                Unduh Laporan PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Idm;
