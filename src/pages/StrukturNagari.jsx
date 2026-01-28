import { useEffect, useState } from 'react';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { getImageUrl } from '../utils/imageUrl';

const StrukturNagari = () => {
    const [officials, setOfficials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(ENDPOINTS.OFFICIALS.GET_ALL);
                const data = res.data?.data || res.data || [];
                setOfficials(Array.isArray(data) ? data : []);
                console.log('Officials Data:', data); // Debug
            } catch (error) {
                console.error('Failed to fetch officials:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Loose Filtering Helper
    const checkRole = (pos, keyword) => pos?.toLowerCase().includes(keyword.toLowerCase());

    const waliNagari = officials.filter(o => checkRole(o.position, 'wali nagari'));
    const sekretaris = officials.filter(o => checkRole(o.position, 'sekretaris'));
    const kasi = officials.filter(o => checkRole(o.position, 'kasi'));
    const jorong = officials.filter(o => checkRole(o.position, 'jorong'));

    // Manual Specific Mapping for Kaur
    // We try to find specific Kaurs first
    const kaurTU = officials.filter(o => 
        checkRole(o.position, 'kaur') && 
        (checkRole(o.position, 'tata usaha') || checkRole(o.position, 'tu') || checkRole(o.position, 'umum')) &&
        !checkRole(o.position, 'staf') && !checkRole(o.position, 'staff')
    );
    const kaurKeuangan = officials.filter(o => checkRole(o.position, 'kaur') && checkRole(o.position, 'keuangan'));
    const kaurPerencanaan = officials.filter(o => checkRole(o.position, 'kaur') && checkRole(o.position, 'perencanaan'));

    // Broad Staf Filter: Catch ANY staff. 
    // User specifically wants Staff under Kaur TU.
    // If we filter too strictly we miss it. Let's act as if ALL staff go under TU unless specified otherwise.
    // Or try to match specific staff first.
    let stafTU = officials.filter(o => 
        (checkRole(o.position, 'staf') || checkRole(o.position, 'staff')) && 
        (checkRole(o.position, 'tata usaha') || checkRole(o.position, 'tu') || checkRole(o.position, 'umum'))
    );

    // FALLBACK: If strict filter returns 0, take ANY staff that is NOT assigned elsewhere
    // Assuming for this specific request, the missing staff IS the TU staff.
    if (stafTU.length === 0) {
        stafTU = officials.filter(o => checkRole(o.position, 'staf') || checkRole(o.position, 'staff'));
    }

    // Remaining Kaurs that are not TU, Keuangan, or Perencanaan
    const otherKaurs = officials.filter(o => 
        checkRole(o.position, 'kaur') && 
        !kaurTU.includes(o) &&
        !kaurKeuangan.includes(o) &&
        !kaurPerencanaan.includes(o) &&
        !checkRole(o.position, 'staf') && !checkRole(o.position, 'staff')
    );

    const OfficialCard = ({ item, isMain = false }) => (
        <div className={`bg-white border border-slate-200 flex-shrink-0 relative z-20 ${isMain ? 'w-56' : 'w-44'}`}>
            <div className={`${isMain ? 'h-72' : 'h-56'} bg-slate-100 overflow-hidden relative`}>
                {item.image ? (
                    <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                        <span className="text-xs">No Photo</span>
                    </div>
                )}
            </div>
            <div className="p-3 text-center border-t border-slate-100">
                <h3 className={`font-bold text-slate-900 mb-1 uppercase leading-snug ${isMain ? 'text-sm' : 'text-[10px]'}`}>{item.position}</h3>
                <p className={`text-slate-600 font-medium ${isMain ? 'text-sm' : 'text-xs'}`}>{item.name}</p>
            </div>
        </div>
    );

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div className="relative py-24">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80)' }}>
                    <div className="absolute inset-0 bg-slate-900/75"></div>
                </div>
                <div className="max-w-6xl mx-auto px-4 relative z-10 text-white text-center">
                    <p className="text-blue-300 font-medium uppercase tracking-widest text-sm mb-2">Pemerintahan</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">Struktur Organisasi</h1>
                    <p className="text-slate-300">Pemerintahan Nagari Talang Anau</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <style>{`
                    .line-v { width: 1px; background: #94a3b8; position: absolute; }
                    .line-h { height: 1px; background: #94a3b8; position: absolute; }
                `}</style>
                
                {/* 1. WALI NAGARI (CENTER TOP) */}
                <div className="flex justify-center mb-12 relative z-20">
                    {waliNagari.map(item => <OfficialCard key={item.id} item={item} isMain={true} />)}
                </div>

                {/* Structure Container - WRAPS ALL CONTENT INCLUDING JORONG FOR CONTINUOUS LINES */}
                <div className="relative pb-12">
                     
                     {/* === LINES === */}
                     
                     {/* 1. Top Vertical (Wali Down) */}
                     <div className="line-v h-12 left-1/2 -top-12 bg-slate-400"></div>
                     
                     {/* 2. Horizontal Bar (Split Left/Right) */}
                     <div className="line-h w-1/2 left-1/4 top-0 bg-slate-400"></div>

                     {/* 3. CENTRAL LINE (Wali to before Jorong) - Extended height to reach bottom */}
                     {/* Increased to 920px to accomodate tall content in Kasi/Kaur sections */}
                     {/* Branch Drops */}
                     {/* Left Drop to Kasi */}
                     <div className="line-v h-40 left-1/4 top-0 bg-slate-400"></div>

                     {/* Right Drop to Sekre */}
                     <div className="line-v h-12 right-1/4 top-0 bg-slate-400"></div>

                     {/* === CONTENT GRID === */}
                     <div className="grid grid-cols-2 gap-8 relative z-10 pb-16">
                        {/* Central Line scoped to this grid's height */}
                        <div className="line-v top-0 left-1/2 bottom-0 bg-slate-300 z-0"></div>

                        {/* LEFT COLUMN: KASI */}
                        <div className="pt-40 flex flex-col items-center">
                             <div className="bg-slate-100 px-3 py-1 rounded text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 z-10 relative border border-slate-200 shadow-sm">
                                Pelaksana Teknis
                            </div>
                            <div className="flex flex-wrap justify-center gap-4 relative z-10">
                                {kasi.map(item => <OfficialCard key={item.id} item={item} />)}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: SEKRE -> KAUR -> STAF */}
                        <div className="flex flex-col items-center pt-12">
                            {/* Row 2: Sekretaris */}
                            <div className="mb-16 flex flex-col items-center relative z-10">
                                {sekretaris.map(item => <OfficialCard key={item.id} item={item} />)}
                                {/* Line Sekre to Kaur Group */}
                                <div className="line-v h-16 -bottom-16 left-1/2 bg-slate-400"></div>
                            </div>
                            
                            {/* Row 3: Kaur Group */}
                            <div className="flex flex-col items-center relative z-10 w-full">
                                <div className="bg-slate-100 px-3 py-1 rounded text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 border border-slate-200 shadow-sm">
                                    Urusan Tata Usaha
                                </div>
                                <div className="flex flex-wrap justify-center gap-8 items-start">
                                    {/* Kaur TU & Staff Pair */}
                                    <div className="flex flex-col items-center">
                                        {kaurTU.length > 0 ? (
                                            kaurTU.map(item => <OfficialCard key={item.id} item={item} />)
                                        ) : (
                                            /* If no specific Kaur TU found, show others? No, just keep layout stable */
                                            null
                                        )}
                                        
                                        {/* Connector to Staf TU */}
                                        {stafTU.length > 0 && (
                                            <>
                                                <div className="h-8 w-px bg-slate-400 my-0"></div>
                                                {stafTU.map(item => <OfficialCard key={item.id} item={item} />)}
                                            </>
                                        )}
                                    </div>

                                    {/* Kaur Keuangan */}
                                    {kaurKeuangan.map(item => <OfficialCard key={item.id} item={item} />)}

                                    {/* Kaur Perencanaan */}
                                    {kaurPerencanaan.map(item => <OfficialCard key={item.id} item={item} />)}

                                    {/* Other Kaurs */}
                                    {otherKaurs.map(item => <OfficialCard key={item.id} item={item} />)}
                                </div>
                            </div>
                        </div>
                     </div>

                     {/* BOTTOM: JORONG (Inside Relative Container) */}
                     <div className="relative z-10">
                        <div className="text-center mb-8 relative bg-slate-50 pt-4"> {/* Added bg-slate-50 to mask line */}
                             {/* Small Connector from Central Line to Badge */}
                            <span className="bg-blue-50 text-blue-700 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100 relative z-20">
                                Kepala Kewilayahan (Jorong)
                            </span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-8 relative z-20 bg-slate-50"> {/* Added bg-slate-50 to grid too just in case */}
                            {jorong.map(item => <OfficialCard key={item.id} item={item} />)}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StrukturNagari;
