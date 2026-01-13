import { MdEmail, MdLocationOn } from 'react-icons/md';
import { profileData, villageStructure } from '../data/mockData';

const Profile = () => {
    // Separate Head of Village from others for the tree structure
    const kepalaDesa = villageStructure.find(p => p.position === 'Kepala Desa');
    const staff = villageStructure.filter(p => p.position !== 'Kepala Desa');

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header / Hero */}
            <div className="bg-white border-b border-gray-200 pb-16 pt-20 px-4 text-center mb-16">
                <div className="max-w-4xl mx-auto">
                    <span className="text-blue-700 font-bold tracking-widest uppercase text-sm mb-3 block border-b-2 border-orange-500 inline-block pb-1">Profil Pemerintahan</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">
                        Mengenal {profileData.name}
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Membangun desa yang mandiri, transparan, dan sejahtera melalui inovasi dan pelayanan prima.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl">
                {/* About & Contact Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    <div className="bg-white p-8 md:p-10 border border-slate-200 shadow-sm flex flex-col justify-center">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-wide border-l-4 border-blue-700 pl-4">
                             Tentang Desa
                        </h2>
                        <p className="text-slate-700 leading-relaxed text-lg mb-8 text-justify">
                            {profileData.name} merupakan salah satu desa yang terletak di {profileData.kabupaten}. 
                            Kami berkomitmen untuk memberikan pelayanan terbaik bagi masyarakat dan memajukan potensi desa 
                            melalui transparansi dan inovasi digital yang berkelanjutan.
                        </p>
                        <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
                             <div className="flex items-center gap-4 text-slate-800">
                                 <div className="w-10 h-10 bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                                     <MdLocationOn size={20} />
                                 </div>
                                 <span className="font-bold">{profileData.address}</span>
                             </div>
                             <div className="flex items-center gap-4 text-slate-800">
                                 <div className="w-10 h-10 bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                                     <MdEmail size={20} />
                                 </div>
                                 <span className="font-bold">{profileData.email}</span>
                             </div>
                        </div>
                    </div>

                    <div className="bg-slate-800 p-8 md:p-10 text-white shadow-lg border-t-4 border-orange-500">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 uppercase tracking-wide">
                            Visi & Misi
                        </h2>
                        
                        <div className="mb-8 border-b border-slate-600 pb-8">
                            <h3 className="text-orange-400 font-bold text-sm uppercase mb-2 tracking-wider">Visi</h3>
                            <p className="text-xl font-medium italic text-slate-200">"{profileData.vision}"</p>
                        </div>

                        <div>
                            <h3 className="text-orange-400 font-bold text-sm uppercase mb-4 tracking-wider">Misi Utama</h3>
                            <ul className="space-y-4">
                                {profileData.mission.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="mt-1.5 w-2 h-2 bg-blue-500 rotate-45 shrink-0"></div>
                                        <span className="text-slate-200 leading-snug">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Organizational Structure */}
                <div className="mb-20">
                    <div className="text-center mb-16">
                         <h2 className="text-3xl font-bold text-slate-900 mb-4 uppercase tracking-tight">Struktur Organisasi</h2>
                         <div className="w-24 h-1 bg-blue-700 mx-auto mb-4"></div>
                         <p className="text-slate-600 font-medium uppercase tracking-widest text-sm">Pemerintahan Desa {profileData.name} Periode 2020-2026</p>
                    </div>

                    <div className="relative">
                        {/* Tree Connector Line (Vertical from Top) */}
                        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-slate-300 hidden md:block"></div>

                        {/* Top Node: Kepala Desa */}
                        <div className="flex justify-center mb-16 relative z-10">
                            {kepalaDesa && (
                                <div className="bg-white p-0 shadow-lg border border-slate-200 text-center w-72 group relative overflow-hidden">
                                    <div className="h-2 bg-blue-700 w-full top-0"></div>
                                    <div className="p-6">
                                        <div className="w-32 h-32 mx-auto mb-4 relative">
                                            <img 
                                                src={kepalaDesa.image} 
                                                alt={kepalaDesa.name} 
                                                className="w-full h-full object-cover border-4 border-slate-100 shadow-sm" // Removed rounded-full
                                            />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-1 uppercase">{kepalaDesa.name}</h3>
                                        <span className="inline-block px-4 py-1 bg-blue-700 text-white text-xs font-bold uppercase tracking-wider mb-3">
                                            {kepalaDesa.position}
                                        </span>
                                        <p className="text-slate-500 text-sm italic border-t border-slate-100 pt-3 mt-1">
                                            "{profileData.headOfVillage.message.substring(0, 50)}..."
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Horizontal Connector Line */}
                         <div className="hidden md:block absolute top-40 left-[10%] right-[10%] h-0.5 bg-slate-300 -z-10"></div>

                        {/* Staff Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {staff.map((person, idx) => (
                                <div key={idx} className="relative pt-8 group">
                                    {/* Vertical Connector for each item */}
                                    <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-300"></div>
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-300 rotate-45 hidden md:block"></div>

                                    <div className="bg-white p-6 shadow-sm border border-slate-200 text-center hover:shadow-md transition-all duration-200 h-full flex flex-col items-center hover:border-blue-300">
                                        <div className="w-24 h-24 mb-4">
                                            <img 
                                                src={person.image} 
                                                alt={person.name} 
                                                className="w-full h-full object-cover border-2 border-slate-100 grayscale group-hover:grayscale-0 transition-all duration-300" 
                                            />
                                        </div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-1 uppercase tracking-tight">{person.name}</h4>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{person.position}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
