import { MdEmail, MdLocationOn } from 'react-icons/md';
import { economyData, facilitiesData, geographyData, nagariHistory, profileData, villageStructure } from '../data/mockData';

const Profile = () => {
    const waliNagari = villageStructure.find(p => p.position === 'Wali Nagari');
    const staff = villageStructure.filter(p => p.position !== 'Wali Nagari');

    return (
        <div className="bg-white">
            {/* Hero Header */}
            <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80)' }}
                >
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <span className="inline-block py-1 px-3 border border-white/30 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest mb-4">Profil Wilayah</span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{profileData.name}</h1>
                    <p className="text-xl text-slate-200 max-w-2xl mx-auto">{profileData.vision}</p>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-blue-600 text-white py-12 relative z-20 -mt-10 mx-4 md:mx-auto max-w-5xl rounded-xl shadow-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-blue-500">
                    {[
                        { value: "1.854", label: "Luas Hektar" },
                        { value: "2.037", label: "Penduduk (Jiwa)" },
                        { value: "748", label: "Kepala Keluarga" },
                        { value: "3", label: "Jorong" }
                    ].map((stat, idx) => (
                        <div key={idx} className="text-center px-4">
                            <p className="text-3xl font-bold mb-1">{stat.value}</p>
                            <p className="text-sm text-blue-100 font-medium uppercase tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* SECTION 1: TENTANG & KONTAK */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2 block">Sekilas Tentang</span>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Mengenal {profileData.name} Lebih Dekat</h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                {profileData.name} merupakan salah satu nagari eksotis yang terletak di {profileData.kecamatan}, {profileData.kabupaten}. 
                                Dengan luas wilayah {geographyData.area.total} Ha, nagari ini terbagi menjadi 3 Jorong: 
                                <span className="font-semibold text-slate-900"> Jorong Talang Anau, Jorong Simpang Padang, dan Jorong Luak Begak</span>.
                            </p>
                            
                            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center text-blue-600 shrink-0">
                                        <MdLocationOn size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Alamat Kantor</h4>
                                        <p className="text-slate-600 text-sm">{profileData.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center text-blue-600 shrink-0">
                                        <MdEmail size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Email Resmi</h4>
                                        <p className="text-slate-600 text-sm">{profileData.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-blue-100 rounded-full -z-10 blur-3xl opacity-50"></div>
                            <img 
                                src="https://images.unsplash.com/photo-1541603958933-5c2250284489?w=800&q=80" 
                                alt="Kantor Nagari" 
                                className="w-full rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: SEJARAH (Gray Background) */}
            <section className="py-24 md:py-32 bg-slate-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2 block">Latar Belakang</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Sejarah Nagari</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="prose prose-lg mx-auto text-slate-600 mb-12 text-center">
                        <p>{nagariHistory.intro}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {nagariHistory.versions.map((version, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 font-bold text-xl mb-6">
                                    {idx + 1}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{version.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">{version.content}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-slate-900 text-slate-300 p-8 md:p-12 rounded-2xl">
                        <h4 className="text-white font-bold text-lg uppercase tracking-wider mb-8 text-center border-b border-slate-700 pb-4">Proses & Syarat Terbentuknya Nagari</h4>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h5 className="text-blue-400 font-bold mb-4 text-sm">Tahapan Pembentukan</h5>
                                <ol className="space-y-4">
                                    {nagariHistory.formation.steps.map((step, idx) => (
                                        <li key={idx} className="flex gap-4">
                                            <span className="font-mono text-slate-500">0{idx + 1}</span>
                                            <span className="italic">"{step}"</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                            <div>
                                <h5 className="text-blue-400 font-bold mb-4 text-sm">Syarat Adat</h5>
                                <ul className="grid grid-cols-1 gap-2">
                                    {nagariHistory.requirements.items.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: GEOGRAFIS */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Kiri: Judul & Batas */}
                        <div className="lg:col-span-4">
                            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2 block">Kewilayahan</span>
                            <h2 className="text-3xl font-bold text-slate-900 mb-8">Kondisi Geografis</h2>
                            
                            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-8">
                                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 font-bold text-slate-900">Batas Wilayah</div>
                                <div className="divide-y divide-slate-100">
                                    <div className="p-4 flex flex-col">
                                        <span className="text-xs uppercase text-slate-400 font-bold mb-1">Utara</span>
                                        <span className="text-slate-800 text-sm font-medium">{geographyData.boundaries.north}</span>
                                    </div>
                                    <div className="p-4 flex flex-col">
                                        <span className="text-xs uppercase text-slate-400 font-bold mb-1">Selatan</span>
                                        <span className="text-slate-800 text-sm font-medium">{geographyData.boundaries.south}</span>
                                    </div>
                                    <div className="p-4 flex flex-col">
                                        <span className="text-xs uppercase text-slate-400 font-bold mb-1">Barat</span>
                                        <span className="text-slate-800 text-sm font-medium">{geographyData.boundaries.west}</span>
                                    </div>
                                    <div className="p-4 flex flex-col">
                                        <span className="text-xs uppercase text-slate-400 font-bold mb-1">Timur</span>
                                        <span className="text-slate-800 text-sm font-medium">{geographyData.boundaries.east}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Kanan: Jorong & Lahan */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Jorong Cards */}
                            <div className="grid md:grid-cols-3 gap-6">
                                {geographyData.jorong.map((jorong, idx) => (
                                    <div key={idx} className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:border-blue-200 transition-colors">
                                        <h4 className="font-bold text-slate-900 text-lg mb-2">{jorong.name}</h4>
                                        <p className="text-blue-600 font-bold text-2xl mb-4">{jorong.area} <span className="text-sm text-slate-500 font-normal">Ha</span></p>
                                        <p className="text-xs text-slate-500 bg-white p-3 rounded border border-slate-100">{jorong.description || jorong.distance}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Table */}
                            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 font-bold text-slate-900">Penggunaan Lahan (Hektar)</div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-white">
                                            <tr>
                                                <th className="px-6 py-4 text-left font-bold text-slate-400 uppercase tracking-wider text-xs">Jorong</th>
                                                <th className="px-6 py-4 text-center font-bold text-slate-400 uppercase tracking-wider text-xs">Kering</th>
                                                <th className="px-6 py-4 text-center font-bold text-slate-400 uppercase tracking-wider text-xs">Basah</th>
                                                <th className="px-6 py-4 text-center font-bold text-slate-400 uppercase tracking-wider text-xs">Hutan</th>
                                                <th className="px-6 py-4 text-center font-bold text-slate-900 uppercase tracking-wider text-xs">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {geographyData.landUse.map((row, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-slate-900">{row.jorong}</td>
                                                    <td className="px-6 py-4 text-center text-slate-600">{row.dry}</td>
                                                    <td className="px-6 py-4 text-center text-slate-600">{row.wet}</td>
                                                    <td className="px-6 py-4 text-center text-slate-600">{row.forest}</td>
                                                    <td className="px-6 py-4 text-center font-bold text-slate-900 bg-slate-50">{row.total}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-slate-900 text-white">
                                            <tr>
                                                <td className="px-6 py-4 font-bold">Total Wilayah</td>
                                                <td className="px-6 py-4 text-center opacity-80">1.360</td>
                                                <td className="px-6 py-4 text-center opacity-80">165</td>
                                                <td className="px-6 py-4 text-center opacity-80">313</td>
                                                <td className="px-6 py-4 text-center font-bold text-blue-300">1.854 Ha</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: SOSIAL BUDAYA (Gray Background) */}
            <section className="py-24 md:py-32 bg-slate-100">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2 block">Demografi & Fasilitas</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Kondisi Sosial Budaya</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-600">
                            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-600"></span> Agama
                            </h4>
                            <div className="flex justify-between items-end">
                                <span className="text-4xl font-bold text-slate-900">100%</span>
                                <span className="text-slate-500 text-sm mb-1">Islam</span>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-green-600">
                            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-600"></span> Mata Pencaharian
                            </h4>
                            <div className="flex justify-between items-end">
                                <span className="text-4xl font-bold text-slate-900">50.2%</span>
                                <span className="text-slate-500 text-sm mb-1">Petani</span>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-orange-600">
                            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orange-600"></span> Pendidikan SD
                            </h4>
                            <div className="flex justify-between items-end">
                                <span className="text-4xl font-bold text-slate-900">47.5%</span>
                                <span className="text-slate-500 text-sm mb-1">Tamat SD</span>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-purple-600">
                            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-600"></span> Usia Produktif
                            </h4>
                            <div className="flex justify-between items-end">
                                <span className="text-4xl font-bold text-slate-900">39%</span>
                                <span className="text-slate-500 text-sm mb-1">26-55 Thn</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Fasilitas */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Sarana & Prasarana</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-slate-600">Sarana Ibadah</span>
                                        <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold">13 unit</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                    <div className="flex gap-4 mt-2 text-xs text-slate-400">
                                        <span>5 Masjid</span>
                                        <span>7 Surau</span>
                                        <span>1 Mushalla</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-slate-600">Sarana Pendidikan</span>
                                        <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold">7 unit</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-slate-600">Sarana Kesehatan</span>
                                        <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold">7 unit</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500 rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                    <div className="flex gap-4 mt-2 text-xs text-slate-400">
                                        <span>3 Posyandu</span>
                                        <span>2 Poskesri</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Kesenian */}
                        <div className="bg-slate-900 text-white p-8 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[60px] opacity-20"></div>
                            <h3 className="text-xl font-bold mb-6 relative z-10">Seni & Budaya</h3>
                            <div className="space-y-4 relative z-10">
                                {facilitiesData.arts.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">S</div>
                                        <div>
                                            <h4 className="font-bold">{item.type}</h4>
                                            <p className="text-xs text-slate-400">{item.note}</p>
                                        </div>
                                        <div className="ml-auto font-bold text-2xl opacity-30">0{item.count}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: EKONOMI */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2 block">Potensi Ekonomi</span>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Komoditi Unggulan</h2>
                            <p className="text-slate-600 leading-relaxed mb-8">
                                {economyData.description}
                            </p>
                            
                            <div className="space-y-6">
                                {economyData.mainCommodities.map((item, idx) => (
                                    <div key={idx} className="group">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{item.name}</h4>
                                            <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded text-sm">{item.production}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-slate-500 pl-4 border-l-2 border-slate-100 group-hover:border-blue-500 transition-colors">
                                            <span>Luas: {item.area} Ha</span>
                                            <span>•</span>
                                            <span>Harga: {item.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 translate-y-8">
                                <img src="https://images.unsplash.com/photo-1625246333195-5842bca984eb?w=500&q=80" alt="Pertanian" className="w-full h-64 object-cover rounded-2xl shadow-lg" />
                                <div className="bg-slate-900 text-white p-6 rounded-2xl">
                                    <span className="text-3xl font-bold block mb-1">10rb</span>
                                    <span className="text-xs uppercase tracking-widest text-slate-400">Ton Jeruk/Thn</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-blue-600 text-white p-6 rounded-2xl">
                                    <span className="text-3xl font-bold block mb-1">200+</span>
                                    <span className="text-xs uppercase tracking-widest text-blue-200">Hektar Kebun</span>
                                </div>
                                <img src="https://images.unsplash.com/photo-1589923188900-85dae523342b?w=500&q=80" alt="Gula Aren" className="w-full h-64 object-cover rounded-2xl shadow-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6: STRUKTUR ORGANISASI (Dark Background) */}
            <section className="py-24 md:py-32 bg-slate-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-2 block">Pemerintahan</span>
                        <h2 className="text-3xl md:text-4xl font-bold">Struktur Organisasi</h2>
                        <p className="text-slate-400 mt-4">Periode 2022 - 2030</p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        {/* Wali Nagari */}
                        {waliNagari && (
                            <div className="flex flex-col items-center mb-12">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                    <div className="relative w-48 h-64 bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                                        <img src={waliNagari.image} alt={waliNagari.name} className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="mt-6 text-center">
                                    <h3 className="text-2xl font-bold">{waliNagari.name}</h3>
                                    <p className="text-blue-400 font-medium uppercase tracking-widest text-sm mt-1">{waliNagari.position}</p>
                                </div>
                            </div>
                        )}

                        {/* Connector */}
                        <div className="w-px h-16 bg-gradient-to-b from-slate-700 to-transparent mx-auto mb-12"></div>

                        {/* Staff Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                            {staff.map((person, idx) => (
                                <div key={idx} className="group text-center">
                                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-slate-700 group-hover:border-blue-500 transition-colors bg-slate-800">
                                        <img src={person.image} alt={person.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <h4 className="font-bold text-sm text-slate-200 group-hover:text-white">{person.name}</h4>
                                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wide group-hover:text-blue-400 transition-colors">{person.position}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;
