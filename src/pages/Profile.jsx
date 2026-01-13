import { MdEmail, MdLocationOn } from 'react-icons/md';
import { demographicsData, economyData, facilitiesData, geographyData, nagariHistory, profileData, tourismData, villageStructure } from '../data/mockData';

const Profile = () => {
    const waliNagari = villageStructure.find(p => p.position === 'Wali Nagari');
    const staff = villageStructure.filter(p => p.position !== 'Wali Nagari');

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Header with Background */}
            <div className="relative py-24">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80)' }}
                >
                    <div className="absolute inset-0 bg-slate-900/75"></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-2">Profil Nagari</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">{profileData.name}</h1>
                    <p className="text-slate-300">{profileData.kecamatan}, {profileData.kabupaten}</p>
                </div>
            </div>

            {/* Stats Row */}
            <div className="border-b border-slate-200">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-4 divide-x divide-slate-200">
                        {[
                            { value: "1.854", label: "Hektar" },
                            { value: "2.037", label: "Jiwa" },
                            { value: "748", label: "KK" },
                            { value: "3", label: "Jorong" }
                        ].map((stat, idx) => (
                            <div key={idx} className="py-6 text-center">
                                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                <p className="text-sm text-slate-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Tentang & Kontak */}
                <section className="mb-16">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Tentang Nagari</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                {profileData.name} merupakan salah satu nagari di {profileData.kecamatan}, {profileData.kabupaten}. 
                                Nagari ini memiliki luas wilayah {geographyData.area.total} Ha dengan 3 Jorong yaitu 
                                Jorong Talang Anau, Jorong Simpang Padang, dan Jorong Luak Begak.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <MdLocationOn className="text-slate-400" />
                                    <span className="text-sm">{profileData.address}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <MdEmail className="text-slate-400" />
                                    <span className="text-sm">{profileData.email}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-6">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Visi</h3>
                            <p className="text-slate-600 text-sm italic mb-6">"{profileData.vision}"</p>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Misi</h3>
                            <ul className="space-y-2">
                                {profileData.mission.slice(0, 5).map((item, idx) => (
                                    <li key={idx} className="text-slate-600 text-sm flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">{idx + 1}.</span>
                                        {item}
                                    </li>
                                ))}
                                {profileData.mission.length > 5 && (
                                    <li className="text-slate-400 text-sm">...dan {profileData.mission.length - 5} misi lainnya</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Sejarah */}
                <section className="mb-16">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">Sejarah Nagari</h2>
                    <p className="text-slate-600 mb-6">{nagariHistory.intro}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {nagariHistory.versions.map((version, idx) => (
                            <div key={idx} className="bg-slate-50 p-6">
                                <h3 className="font-bold text-slate-900 mb-3">{version.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{version.content}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-900 text-white p-6">
                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Proses Terbentuknya Nagari</h4>
                            <ol className="space-y-2">
                                {nagariHistory.formation.steps.map((step, idx) => (
                                    <li key={idx} className="text-slate-300 text-sm italic">{idx + 1}. {step}</li>
                                ))}
                            </ol>
                        </div>
                        <div className="border border-slate-200 p-6">
                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Syarat Berdirinya Nagari</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {nagariHistory.requirements.items.map((item, idx) => (
                                    <span key={idx} className="text-slate-600 text-sm">• {item}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Geografis */}
                <section className="mb-16">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">Kondisi Geografis</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="font-bold text-slate-900 mb-4">Batas Wilayah</h3>
                            <table className="w-full text-sm">
                                <tbody>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-2 text-slate-500 w-24">Utara</td>
                                        <td className="py-2 text-slate-700">{geographyData.boundaries.north}</td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-2 text-slate-500">Selatan</td>
                                        <td className="py-2 text-slate-700">{geographyData.boundaries.south}</td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-2 text-slate-500">Barat</td>
                                        <td className="py-2 text-slate-700">{geographyData.boundaries.west}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 text-slate-500">Timur</td>
                                        <td className="py-2 text-slate-700">{geographyData.boundaries.east}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 mb-4">Pembagian Jorong</h3>
                            <div className="space-y-3">
                                {geographyData.jorong.map((jorong, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-100">
                                        <div>
                                            <p className="font-medium text-slate-900">{jorong.name}</p>
                                            <p className="text-xs text-slate-500">{jorong.description || jorong.distance}</p>
                                        </div>
                                        <span className="text-sm font-bold text-blue-600">{jorong.area} Ha</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Land Use Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-100">
                                    <th className="p-3 text-left font-bold text-slate-700">Jorong</th>
                                    <th className="p-3 text-center font-bold text-slate-700">Kering</th>
                                    <th className="p-3 text-center font-bold text-slate-700">Basah</th>
                                    <th className="p-3 text-center font-bold text-slate-700">Perumahan</th>
                                    <th className="p-3 text-center font-bold text-slate-700">Hutan</th>
                                    <th className="p-3 text-center font-bold text-slate-700">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {geographyData.landUse.map((row, idx) => (
                                    <tr key={idx} className="border-b border-slate-100">
                                        <td className="p-3 font-medium text-slate-900">{row.jorong}</td>
                                        <td className="p-3 text-center text-slate-600">{row.dry}</td>
                                        <td className="p-3 text-center text-slate-600">{row.wet}</td>
                                        <td className="p-3 text-center text-slate-600">{row.housing}</td>
                                        <td className="p-3 text-center text-slate-600">{row.forest}</td>
                                        <td className="p-3 text-center font-bold text-slate-900">{row.total}</td>
                                    </tr>
                                ))}
                                <tr className="bg-slate-900 text-white">
                                    <td className="p-3 font-bold">Total</td>
                                    <td className="p-3 text-center">1.360</td>
                                    <td className="p-3 text-center">165</td>
                                    <td className="p-3 text-center">16</td>
                                    <td className="p-3 text-center">313</td>
                                    <td className="p-3 text-center font-bold">1.854</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Sosial Budaya */}
                <section className="mb-16">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">Kondisi Sosial Budaya</h2>
                    
                    {/* Demo Stats */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        <div className="text-center p-4 bg-slate-50">
                            <p className="text-2xl font-bold text-slate-900">{demographicsData.totalPopulation.toLocaleString()}</p>
                            <p className="text-sm text-slate-500">Jiwa</p>
                        </div>
                        <div className="text-center p-4 bg-slate-50">
                            <p className="text-2xl font-bold text-slate-900">{demographicsData.totalFamilies}</p>
                            <p className="text-sm text-slate-500">KK</p>
                        </div>
                        <div className="text-center p-4 bg-slate-50">
                            <p className="text-2xl font-bold text-slate-900">{demographicsData.gender.male}</p>
                            <p className="text-sm text-slate-500">Laki-laki</p>
                        </div>
                        <div className="text-center p-4 bg-slate-50">
                            <p className="text-2xl font-bold text-slate-900">{demographicsData.gender.female}</p>
                            <p className="text-sm text-slate-500">Perempuan</p>
                        </div>
                    </div>

                    {/* Facilities */}
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm mb-3">Sarana Ibadah</h4>
                            {facilitiesData.worship.map((item, idx) => (
                                <div key={idx} className="flex justify-between py-1 text-sm">
                                    <span className="text-slate-600">{item.type}</span>
                                    <span className="font-medium text-slate-900">{item.count}</span>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm mb-3">Sarana Pendidikan</h4>
                            {facilitiesData.education.map((item, idx) => (
                                <div key={idx} className="flex justify-between py-1 text-sm">
                                    <span className="text-slate-600">{item.type}</span>
                                    <span className="font-medium text-slate-900">{item.count}</span>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm mb-3">Sarana Kesehatan</h4>
                            {facilitiesData.health.map((item, idx) => (
                                <div key={idx} className="flex justify-between py-1 text-sm">
                                    <span className="text-slate-600">{item.type}</span>
                                    <span className="font-medium text-slate-900">{item.count}</span>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm mb-3">Kesenian</h4>
                            {facilitiesData.arts.map((item, idx) => (
                                <div key={idx} className="flex justify-between py-1 text-sm">
                                    <span className="text-slate-600">{item.type}</span>
                                    <span className="font-medium text-slate-900">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tourism */}
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-4">Destinasi Wisata</h4>
                        <div className="grid md:grid-cols-4 gap-4">
                            {tourismData.map((item) => (
                                <div key={item.id} className="border border-slate-200 p-4">
                                    <h5 className="font-medium text-slate-900 mb-1">{item.name}</h5>
                                    <p className="text-sm text-slate-500">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Ekonomi */}
                <section className="mb-16">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">Kondisi Ekonomi</h2>
                    
                    <p className="text-slate-600 mb-6">{economyData.description}</p>
                    
                    <h4 className="font-bold text-slate-900 text-sm mb-4">Komoditi Unggulan</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                        {economyData.mainCommodities.map((item, idx) => (
                            <div key={idx} className="bg-slate-50 p-6">
                                <h5 className="font-bold text-slate-900 mb-4">{item.name}</h5>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Luas Tanam</span>
                                        <span className="font-medium text-slate-900">{item.area} Ha</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Produksi/tahun</span>
                                        <span className="font-medium text-slate-900">{item.production}</span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t border-slate-200">
                                        <span className="text-slate-500">Harga</span>
                                        <span className="font-bold text-blue-600">{item.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Struktur Organisasi */}
                <section className="bg-slate-50 -mx-4 px-4 py-12 mt-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-1 text-center">Struktur Organisasi</h2>
                    <p className="text-sm text-slate-500 text-center mb-10">Pemerintahan {profileData.name} Periode 2022-2030</p>

                    <div className="max-w-4xl mx-auto">
                        {/* Wali Nagari - Top */}
                        {waliNagari && (
                            <div className="flex justify-center mb-6">
                                <div className="bg-white border border-slate-200 p-6 text-center w-64">
                                    <div className="w-20 h-20 mx-auto mb-3 bg-slate-100 border border-slate-200">
                                        <img src={waliNagari.image} alt={waliNagari.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="font-bold text-slate-900">{waliNagari.name}</h3>
                                    <span className="inline-block mt-1 text-xs bg-blue-600 text-white px-2 py-0.5">{waliNagari.position}</span>
                                </div>
                            </div>
                        )}

                        {/* Connector Line */}
                        <div className="flex justify-center mb-6">
                            <div className="w-px h-8 bg-slate-300"></div>
                        </div>

                        {/* Sekretaris */}
                        {staff.find(p => p.position === 'Sekretaris Nagari') && (
                            <div className="flex justify-center mb-6">
                                <div className="bg-white border border-slate-200 p-4 text-center w-56">
                                    <div className="w-14 h-14 mx-auto mb-2 bg-slate-100 border border-slate-200">
                                        <img src={staff.find(p => p.position === 'Sekretaris Nagari').image} alt="Sekretaris" className="w-full h-full object-cover" />
                                    </div>
                                    <h4 className="font-medium text-slate-900 text-sm">{staff.find(p => p.position === 'Sekretaris Nagari').name}</h4>
                                    <span className="text-xs text-slate-500">Sekretaris Nagari</span>
                                </div>
                            </div>
                        )}

                        {/* Connector */}
                        <div className="flex justify-center mb-6">
                            <div className="w-px h-6 bg-slate-300"></div>
                        </div>

                        {/* Horizontal Line with drops */}
                        <div className="hidden md:block relative mb-6">
                            <div className="absolute left-1/2 -translate-x-1/2 w-3/4 h-px bg-slate-300"></div>
                        </div>

                        {/* Staff Row */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {staff.filter(p => p.position !== 'Sekretaris Nagari').map((person, idx) => (
                                <div key={idx} className="bg-white border border-slate-200 p-4 text-center">
                                    <div className="w-12 h-12 mx-auto mb-2 bg-slate-100 border border-slate-200">
                                        <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h4 className="font-medium text-slate-900 text-xs">{person.name}</h4>
                                    <span className="text-xs text-slate-500 block mt-1">{person.position}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Profile;
