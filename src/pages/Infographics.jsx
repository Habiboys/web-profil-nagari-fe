import { MdChurch, MdFamilyRestroom, MdMan, MdMosque, MdPeople, MdSchool, MdSelfImprovement, MdWoman, MdWork } from 'react-icons/md';
import { demographicsData } from '../data/mockData';

const Infographics = () => {
    return (
        <div className="min-h-screen bg-slate-50 py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16 border-b border-gray-200 pb-8">
                    <span className="text-blue-700 font-bold tracking-widest uppercase text-sm mb-2 block">Data Kependudukan</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">
                        Demografi Desa Tamang
                    </h1>
                    <p className="text-xl text-slate-600 font-medium">
                        Visualisasi data statistik penduduk update tahun 2026.
                    </p>
                </div>

                {/* 1. Hero Stats Cards - Flat Boxy */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Penduduk', val: demographicsData.totalPopulation, icon: MdPeople, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-700' },
                        { label: 'Kepala Keluarga', val: demographicsData.totalFamilies, icon: MdFamilyRestroom, color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-700' },
                        { label: 'Perempuan', val: demographicsData.gender.female, icon: MdWoman, color: 'text-pink-700', bg: 'bg-pink-50', border: 'border-pink-700' },
                        { label: 'Laki-laki', val: demographicsData.gender.male, icon: MdMan, color: 'text-cyan-700', bg: 'bg-cyan-50', border: 'border-cyan-700' },
                    ].map((stat, idx) => (
                        <div key={idx} className={`bg-white p-6 shadow-sm border-b-4 ${stat.border} border-x border-t border-slate-200 hover:shadow-md transition-all group`}>
                            <div className={`w-12 h-12 ${stat.bg} ${stat.color} flex items-center justify-center text-2xl mb-4 border border-slate-100`}>
                                <stat.icon />
                            </div>
                            <div className="text-4xl font-black text-slate-900 mb-1">{stat.val}</div>
                            <div className="text-slate-500 font-bold text-sm uppercase tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* 2. Education - Bar Chart */}
                    <div className="lg:col-span-8 bg-white p-8 shadow-sm border border-slate-200">
                         <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                            <div className="p-2 bg-indigo-50 text-indigo-700 border border-indigo-100">
                                <MdSchool size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Tingkat Pendidikan</h3>
                         </div>
                         
                         <div className="space-y-6">
                            {demographicsData.education.map((item, idx) => (
                                <div key={idx} className="group">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-bold text-slate-700 uppercase">{item.label}</span>
                                        <span className="font-black text-slate-900">{item.value} <span className="text-slate-400 font-normal ml-1">Jiwa</span></span>
                                    </div>
                                    <div className="h-4 w-full bg-slate-100">
                                        <div 
                                            className="h-full bg-indigo-600 transition-all duration-500" 
                                            style={{ width: `${(item.value / 600) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>

                    {/* 3. Religion & Stats */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Religion */}
                        <div className="bg-white p-8 shadow-sm border border-slate-200">
                             <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                                <div className="p-2 bg-emerald-50 text-emerald-700 border border-emerald-100">
                                    <MdMosque size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Agama</h3>
                             </div>
                             <div className="space-y-4">
                                {demographicsData.religion.map((rel, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 hover:border-emerald-300 transition-colors cursor-default">
                                        <div className="flex items-center gap-3">
                                            <div className="text-emerald-700">
                                                {rel.label === "Islam" && <MdMosque />}
                                                {(rel.label === "Katolik" || rel.label === "Kristen") && <MdChurch />}
                                                {rel.label === "Hindu" && <MdSelfImprovement />}
                                            </div>
                                            <span className="font-bold text-slate-700 uppercase text-sm">{rel.label}</span>
                                        </div>
                                        <span className="font-black text-slate-900">{rel.value}</span>
                                    </div>
                                ))}
                             </div>
                        </div>

                         {/* Jobs (Solid Dark) */}
                        <div className="bg-slate-900 p-8 shadow-lg text-white border-b-4 border-blue-600">
                             <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
                                <div className="p-2 bg-white/10 border border-white/20">
                                    <MdWork size={24} />
                                </div>
                                <h3 className="text-xl font-bold uppercase tracking-tight">Pekerjaan Utama</h3>
                             </div>
                             <div className="space-y-4">
                                {demographicsData.jobs.slice(0, 4).map((job, idx) => (
                                    <div key={idx} className="flex items-center justify-between border-b border-slate-700 pb-3 last:border-0 last:pb-0">
                                        <span className="text-slate-300 text-sm font-medium uppercase">{job.label}</span>
                                        <span className="font-bold">{job.value}</span>
                                    </div>
                                ))}
                                <div className="pt-4 mt-2">
                                    <button className="w-full py-2 border border-slate-600 text-slate-400 text-xs font-bold uppercase hover:bg-slate-800 hover:text-white transition-colors">
                                        Lihat Semua Data
                                    </button>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Infographics;
