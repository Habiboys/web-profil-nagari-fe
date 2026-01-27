import { useEffect, useState } from 'react';
import { MdSave } from 'react-icons/md';
import { toast } from 'sonner';
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';
import MediaPicker from '../../components/MediaPicker';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [mediaPickerTarget, setMediaPickerTarget] = useState(null); // 'logo' or 'headPhoto'
    
    const [profile, setProfile] = useState({ 
        name: '', 
        kecamatan: '',
        kabupaten: '',
        vision: '', 
        email: '', 
        phone: '', 
        address: '',
        logo: '',
        headName: '',
        headPhoto: '',
        headMessage: ''
    });
    const [demographics, setDemographics] = useState({ totalPopulation: 0, totalFamilies: 0, maleCount: 0, femaleCount: 0 });
    const [geography, setGeography] = useState({ totalArea: 0, northBoundary: '', southBoundary: '', westBoundary: '', eastBoundary: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, demoRes, geoRes] = await Promise.all([
                    api.get(ENDPOINTS.PROFILE.GET),
                    api.get(ENDPOINTS.DEMOGRAPHICS.GET),
                    api.get(ENDPOINTS.GEOGRAPHY.GET),
                ]);
                
                const p = profileRes.data?.data || profileRes.data || {};
                const d = demoRes.data?.data || demoRes.data || {};
                const g = geoRes.data?.data || geoRes.data || {};
                
                setProfile({ 
                    name: p.name || '', 
                    kecamatan: p.kecamatan || '',
                    kabupaten: p.kabupaten || '',
                    vision: p.vision || '', 
                    email: p.email || '', 
                    phone: p.phone || '', 
                    address: p.address || '',
                    logo: p.logo || '',
                    headName: p.headName || '',
                    headPhoto: p.headPhoto || '',
                    headMessage: p.headMessage || ''
                });
                setDemographics({ totalPopulation: d.totalPopulation || 0, totalFamilies: d.totalFamilies || 0, maleCount: d.maleCount || 0, femaleCount: d.femaleCount || 0 });
                setGeography({ totalArea: g.totalArea || 0, northBoundary: g.northBoundary || '', southBoundary: g.southBoundary || '', westBoundary: g.westBoundary || '', eastBoundary: g.eastBoundary || '' });
            } catch (error) {
                console.error('Failed to fetch:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSaveProfile = async () => {
        setSaving(true);
        try {
            await api.put(ENDPOINTS.PROFILE.UPDATE(1), profile);
            toast.success('Profil berhasil disimpan');
        } catch (error) {
            toast.error('Gagal menyimpan profil');
        } finally {
            setSaving(false);
        }
    };

    const handleSaveDemographics = async () => {
        setSaving(true);
        try {
            await api.put(ENDPOINTS.DEMOGRAPHICS.UPDATE(1), demographics);
            toast.success('Demografi berhasil disimpan');
        } catch (error) {
            toast.error('Gagal menyimpan demografi');
        } finally {
            setSaving(false);
        }
    };

    const handleSaveGeography = async () => {
        setSaving(true);
        try {
            await api.put(ENDPOINTS.GEOGRAPHY.UPDATE(1), geography);
            toast.success('Geografi berhasil disimpan');
        } catch (error) {
            toast.error('Gagal menyimpan geografi');
        } finally {
            setSaving(false);
        }
    };

    const handleMediaSelect = (imageUrl) => {
        if (mediaPickerTarget === 'logo') {
            setProfile({ ...profile, logo: imageUrl });
        } else if (mediaPickerTarget === 'headPhoto') {
            setProfile({ ...profile, headPhoto: imageUrl });
        }
        setShowMediaPicker(false);
        setMediaPickerTarget(null);
    };

    const openMediaPicker = (target) => {
        setMediaPickerTarget(target);
        setShowMediaPicker(true);
    };

    const tabs = [
        { id: 'profile', label: 'Profil Nagari' },
        { id: 'wali', label: 'Wali Nagari' },
        { id: 'demographics', label: 'Demografi' },
        { id: 'geography', label: 'Geografi' },
    ];

    if (loading) return <div className="text-center py-12 text-slate-500">Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Pengaturan</h1>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6 overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
                            activeTab === tab.id 
                                ? 'border-blue-600 text-blue-600' 
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
                <div className="bg-white border border-slate-200 p-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Nagari</label>
                            <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Kecamatan</label>
                            <input type="text" value={profile.kecamatan} onChange={(e) => setProfile({ ...profile, kecamatan: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Kabupaten</label>
                            <input type="text" value={profile.kabupaten} onChange={(e) => setProfile({ ...profile, kabupaten: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Telepon</label>
                            <input type="text" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Alamat</label>
                            <input type="text" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none" />
                        </div>
                    </div>
                    
                    {/* Logo */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Logo Nagari</label>
                        <div className="flex items-center gap-4">
                            {profile.logo && (
                                <img src={profile.logo} alt="Logo" className="h-16 w-auto border border-slate-200" />
                            )}
                            <button 
                                type="button" 
                                onClick={() => openMediaPicker('logo')}
                                className="bg-slate-100 text-slate-700 px-4 py-2 hover:bg-slate-200"
                            >
                                Pilih Logo
                            </button>
                            {profile.logo && (
                                <button 
                                    type="button" 
                                    onClick={() => setProfile({ ...profile, logo: '' })}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                >
                                    Hapus
                                </button>
                            )}
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Visi</label>
                        <textarea value={profile.vision} onChange={(e) => setProfile({ ...profile, vision: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none h-32 resize-none" />
                    </div>
                    <button onClick={handleSaveProfile} disabled={saving} className="bg-blue-600 text-white px-6 py-2 flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50">
                        <MdSave size={18} /> {saving ? 'Menyimpan...' : 'Simpan Profil'}
                    </button>
                </div>
            )}

            {/* Wali Nagari Tab */}
            {activeTab === 'wali' && (
                <div className="bg-white border border-slate-200 p-6">
                    <p className="text-sm text-slate-500 mb-6">Data wali nagari akan ditampilkan di bagian sambutan di halaman beranda.</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Wali Nagari</label>
                            <input 
                                type="text" 
                                value={profile.headName} 
                                onChange={(e) => setProfile({ ...profile, headName: e.target.value })} 
                                className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none" 
                                placeholder="Contoh: H. Ahmad Syafii"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Foto Wali Nagari</label>
                            <div className="flex items-center gap-4">
                                {profile.headPhoto && (
                                    <img src={profile.headPhoto} alt="Foto Wali" className="h-24 w-20 object-cover border border-slate-200" />
                                )}
                                <div className="flex flex-col gap-2">
                                    <button 
                                        type="button" 
                                        onClick={() => openMediaPicker('headPhoto')}
                                        className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
                                    >
                                        Pilih Foto
                                    </button>
                                    {profile.headPhoto && (
                                        <button 
                                            type="button" 
                                            onClick={() => setProfile({ ...profile, headPhoto: '' })}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Hapus Foto
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Pesan / Sambutan</label>
                        <textarea 
                            value={profile.headMessage} 
                            onChange={(e) => setProfile({ ...profile, headMessage: e.target.value })} 
                            className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none h-32 resize-none" 
                            placeholder="Tuliskan pesan sambutan dari wali nagari..."
                        />
                    </div>
                    
                    <button onClick={handleSaveProfile} disabled={saving} className="bg-blue-600 text-white px-6 py-2 flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50">
                        <MdSave size={18} /> {saving ? 'Menyimpan...' : 'Simpan Data Wali Nagari'}
                    </button>
                </div>
            )}

            {/* Demographics Tab */}
            {activeTab === 'demographics' && (
                <div className="bg-white border border-slate-200 p-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Total Penduduk</label>
                            <input type="number" value={demographics.totalPopulation} onChange={(e) => setDemographics({ ...demographics, totalPopulation: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Jumlah KK</label>
                            <input type="number" value={demographics.totalFamilies} onChange={(e) => setDemographics({ ...demographics, totalFamilies: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Laki-laki</label>
                            <input type="number" value={demographics.maleCount} onChange={(e) => setDemographics({ ...demographics, maleCount: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Perempuan</label>
                            <input type="number" value={demographics.femaleCount} onChange={(e) => setDemographics({ ...demographics, femaleCount: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none" />
                        </div>
                    </div>
                    <button onClick={handleSaveDemographics} disabled={saving} className="bg-blue-600 text-white px-6 py-2 flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50">
                        <MdSave size={18} /> {saving ? 'Menyimpan...' : 'Simpan Demografi'}
                    </button>
                </div>
            )}

            {/* Geography Tab */}
            {activeTab === 'geography' && (
                <div className="bg-white border border-slate-200 p-6">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Luas Wilayah (Ha)</label>
                        <input type="number" value={geography.totalArea} onChange={(e) => setGeography({ ...geography, totalArea: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none max-w-xs" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Batas Utara</label>
                            <input type="text" value={geography.northBoundary} onChange={(e) => setGeography({ ...geography, northBoundary: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Batas Selatan</label>
                            <input type="text" value={geography.southBoundary} onChange={(e) => setGeography({ ...geography, southBoundary: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Batas Barat</label>
                            <input type="text" value={geography.westBoundary} onChange={(e) => setGeography({ ...geography, westBoundary: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Batas Timur</label>
                            <input type="text" value={geography.eastBoundary} onChange={(e) => setGeography({ ...geography, eastBoundary: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none" />
                        </div>
                    </div>
                    <button onClick={handleSaveGeography} disabled={saving} className="bg-blue-600 text-white px-6 py-2 flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50">
                        <MdSave size={18} /> {saving ? 'Menyimpan...' : 'Simpan Geografi'}
                    </button>
                </div>
            )}

            <MediaPicker
                isOpen={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={handleMediaSelect}
            />
        </div>
    );
};

export default AdminSettings;
