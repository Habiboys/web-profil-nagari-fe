import { MdChurch, MdFamilyRestroom, MdMan, MdMosque, MdPeople, MdSchool, MdSelfImprovement, MdWoman, MdWork } from 'react-icons/md';
import { demographicsData } from '../data/mockData';

const Infographics = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Header with Background */}
            <div className="relative py-24">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523475496153-3d6cc0f0bf19?w=1920&q=80)' }}
                >
                    <div className="absolute inset-0 bg-slate-900/75"></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-2">Data Kependudukan</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">Demografi Nagari Talang Anau</h1>
                    <p className="text-slate-300">Visualisasi data statistik penduduk tahun 2025</p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Penduduk', val: demographicsData.totalPopulation, icon: MdPeople, color: 'text-blue-600' },
                        { label: 'Kepala Keluarga', val: demographicsData.totalFamilies, icon: MdFamilyRestroom, color: 'text-orange-600' },
                        { label: 'Perempuan', val: demographicsData.gender.female, icon: MdWoman, color: 'text-pink-600' },
                        { label: 'Laki-laki', val: demographicsData.gender.male, icon: MdMan, color: 'text-cyan-600' },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 border border-slate-200">
                            <div className={`${stat.color} mb-4`}>
                                <stat.icon size={28} />
                            </div>
                            <div className="text-3xl font-bold text-slate-900 mb-1">{stat.val}</div>
                            <div className="text-sm text-slate-500">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Education */}
                    <div className="lg:col-span-8 bg-white p-6 border border-slate-200">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                            <MdSchool size={24} className="text-indigo-600" />
                            <h3 className="text-lg font-bold text-slate-900">Tingkat Pendidikan</h3>
                        </div>
                        <div className="space-y-5">
                            {demographicsData.education.map((item, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium text-slate-700">{item.label}</span>
                                        <span className="font-bold text-slate-900">{item.value} Jiwa</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100">
                                        <div 
                                            className="h-full bg-indigo-600" 
                                            style={{ width: `${(item.value / 600) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Religion */}
                        <div className="bg-white p-6 border border-slate-200">
                            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                                <MdMosque size={24} className="text-emerald-600" />
                                <h3 className="text-lg font-bold text-slate-900">Agama</h3>
                            </div>
                            <div className="space-y-3">
                                {demographicsData.religion.map((rel, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50">
                                        <div className="flex items-center gap-3">
                                            <div className="text-emerald-600">
                                                {rel.label === "Islam" && <MdMosque />}
                                                {(rel.label === "Katolik" || rel.label === "Kristen") && <MdChurch />}
                                                {rel.label === "Hindu" && <MdSelfImprovement />}
                                            </div>
                                            <span className="text-sm text-slate-700">{rel.label}</span>
                                        </div>
                                        <span className="font-bold text-slate-900">{rel.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Jobs */}
                        <div className="bg-slate-900 p-6 text-white">
                            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700">
                                <MdWork size={24} />
                                <h3 className="text-lg font-bold">Pekerjaan Utama</h3>
                            </div>
                            <div className="space-y-3">
                                {demographicsData.jobs.slice(0, 4).map((job, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                                        <span className="text-slate-300 text-sm">{job.label}</span>
                                        <span className="font-bold">{job.value}</span>
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

export default Infographics;