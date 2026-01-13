import { MdDescription, MdDownload } from 'react-icons/md';

const Ppid = () => {
    const documents = [
        { title: "APBDes Tahun Anggaran 2025", type: "PDF", size: "2.4 MB", date: "10 Jan 2025" },
        { title: "RPJMDes 2020-2026", type: "PDF", size: "5.1 MB", date: "15 Des 2024" },
        { title: "Laporan Realisasi Anggaran 2024", type: "PDF", size: "1.8 MB", date: "05 Jan 2025" },
        { title: "Peraturan Nagari No. 1 Tahun 2025", type: "PDF", size: "850 KB", date: "20 Jan 2025" },
    ];

    const categories = [
        "Informasi Berkala",
        "Informasi Serta Merta",
        "Informasi Setiap Saat",
        "Informasi Dikecualikan"
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Header with Background */}
            <div className="relative py-24">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80)' }}
                >
                    <div className="absolute inset-0 bg-slate-900/75"></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-2">Transparansi Publik</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">PPID Nagari</h1>
                    <p className="text-slate-300">Pejabat Pengelola Informasi dan Dokumentasi</p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Categories */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-50 p-6 sticky top-24">
                            <h3 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200 text-sm uppercase tracking-wider">Kategori Informasi</h3>
                            <ul className="space-y-2">
                                {categories.map((cat, idx) => (
                                    <li key={idx}>
                                        <a href="#" className="block px-4 py-2 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors text-sm">
                                            {cat}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Documents List */}
                    <div className="lg:col-span-3">
                        <div className="border border-slate-200">
                            <div className="p-5 border-b border-slate-200 bg-slate-50">
                                <h3 className="font-bold text-slate-900">Dokumen Publik Terbaru</h3>
                            </div>
                            <div className="divide-y divide-slate-200">
                                {documents.map((doc, idx) => (
                                    <div key={idx} className="p-5 hover:bg-slate-50 transition-colors flex items-start gap-5">
                                        <div className="p-3 bg-red-50 text-red-600 shrink-0">
                                            <MdDescription size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-slate-900 mb-2">{doc.title}</h4>
                                            <div className="flex gap-4 text-xs text-slate-500">
                                                <span className="bg-slate-100 px-2 py-1">{doc.type}</span>
                                                <span className="py-1">{doc.size}</span>
                                                <span className="py-1">{doc.date}</span>
                                            </div>
                                        </div>
                                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                            <MdDownload size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ppid;
