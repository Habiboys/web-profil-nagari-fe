import { MdDescription, MdDownload } from 'react-icons/md';
import SectionHeader from '../components/SectionHeader';

const Ppid = () => {
    const documents = [
        { title: "APBDes Tahun Anggaran 2026", type: "PDF", size: "2.4 MB", date: "10 Jan 2026" },
        { title: "RPJMDes 2020-2026", type: "PDF", size: "5.1 MB", date: "15 Des 2025" },
        { title: "Laporan Realisasi Anggaran 2025", type: "PDF", size: "1.8 MB", date: "05 Jan 2026" },
        { title: "Peraturan Desa No. 1 Tahun 2026", type: "PDF", size: "850 KB", date: "20 Jan 2026" },
    ];

    const categories = [
        "Informasi Berkala",
        "Informasi Serta Merta",
        "Informasi Setiap Saat",
        "Informasi Dikecualikan"
    ];

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <SectionHeader 
                title="PPID Desa" 
                subtitle="Pejabat Pengelola Informasi dan Dokumentasi. Akses transparansi informasi publik desa." 
            />

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Sidebar Categories */}
                <div className="lg:col-span-1">
                    <div className="bg-white shadow-sm border border-gray-200 p-6 sticky top-24">
                        <h3 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-900 uppercase tracking-wider text-sm">Kategori Informasi</h3>
                        <ul className="space-y-2">
                            {categories.map((cat, idx) => (
                                <li key={idx}>
                                    <a href="#" className="block px-4 py-2 bg-gray-50 text-slate-700 hover:bg-slate-900 hover:text-white transition-colors text-sm font-bold uppercase tracking-wide border border-transparent hover:border-slate-900">
                                        {cat}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Documents List */}
                <div className="lg:col-span-3">
                    <div className="bg-white shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-lg text-slate-900 uppercase tracking-tight">Dokumen Publik Terbaru</h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {documents.map((doc, idx) => (
                                <div key={idx} className="p-6 hover:bg-blue-50 transition-colors flex items-start gap-6 group">
                                    <div className="p-3 bg-red-100 text-red-600 border border-red-200 shrink-0">
                                        <MdDescription size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 text-lg uppercase tracking-tight">{doc.title}</h4>
                                        <div className="flex gap-4 text-xs text-slate-500 font-medium">
                                            <span className="bg-slate-100 px-2 py-1 uppercase tracking-wider border border-slate-200">{doc.type}</span>
                                            <span className="py-1">{doc.size}</span>
                                            <span className="py-1">{doc.date}</span>
                                        </div>
                                    </div>
                                    <button className="p-3 border border-slate-300 text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                                        <MdDownload size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ppid;
