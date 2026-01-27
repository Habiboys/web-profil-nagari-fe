import { useEffect, useState } from 'react';
import { MdEdit, MdSave } from 'react-icons/md';
import { toast } from 'sonner';
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';
import MediaPicker from '../../components/MediaPicker';
import { getImagePath, getImageUrl } from '../../utils/imageUrl';

// Mapping page keys to Indonesian labels - matches actual routes in App.jsx
const PAGE_NAMES = {
    home: 'Beranda',
    tentang: 'Tentang Nagari',
    'visi-misi': 'Visi & Misi',
    struktur: 'Struktur Nagari',
    infographics: 'Infografis',
    idm: 'IDM',
    listing: 'Wisata & Potensi',
    ppid: 'PPID',
    news: 'Berita',
    marketplace: 'Marketplace',
};

const AdminPageSettings = () => {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingPage, setEditingPage] = useState(null);
    const [formData, setFormData] = useState({ image: '', title: '', subtitle: '' });
    const [showMediaPicker, setShowMediaPicker] = useState(false);

    const fetchData = async () => {
        try {
            const res = await api.get(ENDPOINTS.PAGE_HEROES.GET_ALL);
            setHeroes(res.data);
        } catch (error) {
            console.error('Failed to fetch page heroes:', error);
            toast.error('Gagal memuat data tampilan halaman');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleEdit = (hero) => {
        setFormData({ image: hero.image || '', title: hero.title || '', subtitle: hero.subtitle || '' });
        setEditingPage(hero.page);
    };

    const handleCreateNew = (pageKey) => {
        setFormData({ image: '', title: PAGE_NAMES[pageKey] || pageKey, subtitle: '' });
        setEditingPage(pageKey);
    };

    const handleSave = async () => {
        try {
            await api.put(ENDPOINTS.PAGE_HEROES.UPDATE(editingPage), formData);
            toast.success('Tampilan halaman berhasil diperbarui');
            fetchData();
            setEditingPage(null);
        } catch (error) {
            toast.error('Gagal menyimpan');
        }
    };

    const handleMediaSelect = (imageUrl) => {
        // Convert full URL to relative path for storage
        const relativePath = getImagePath(imageUrl);
        setFormData({ ...formData, image: relativePath });
        setShowMediaPicker(false);
    };

    if (loading) return <div className="text-center py-12 text-slate-500">Loading...</div>;

    // Merge existing heroes with all possible pages
    const allPages = Object.keys(PAGE_NAMES);
    const existingPages = heroes.map(h => h.page);
    const heroesMap = {};
    heroes.forEach(h => { heroesMap[h.page] = h; });

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Tampilan Halaman (Hero)</h1>
            <p className="text-slate-600 mb-6">Kelola gambar header dan judul untuk setiap halaman publik website.</p>

            {editingPage && (
                <div className="bg-white border border-slate-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">Edit Hero: {PAGE_NAMES[editingPage] || editingPage}</h2>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Judul</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
                            <input
                                type="text"
                                value={formData.subtitle}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Gambar Hero</label>
                        <div className="flex gap-2 items-center">
                            <button 
                                type="button" 
                                onClick={() => setShowMediaPicker(true)} 
                                className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
                            >
                                Pilih dari Media
                            </button>
                            {formData.image && (
                                <span className="text-sm text-slate-500 truncate max-w-xs">{formData.image.split('/').pop()}</span>
                            )}
                        </div>
                        {formData.image && (
                            <img src={getImageUrl(formData.image)} alt="Preview" className="mt-3 h-40 object-cover rounded border border-slate-200" />
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-blue-700">
                            <MdSave size={18} /> Simpan
                        </button>
                        <button onClick={() => setEditingPage(null)} className="bg-slate-200 text-slate-700 px-4 py-2 hover:bg-slate-300">
                            Batal
                        </button>
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allPages.map((pageKey) => {
                    const hero = heroesMap[pageKey];
                    return (
                        <div key={pageKey} className="bg-white border border-slate-200 overflow-hidden">
                            <div className="h-32 bg-slate-200 relative">
                                {hero?.image ? (
                                    <img src={getImageUrl(hero.image)} alt={pageKey} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                        Belum ada gambar
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4">
                                    <h3 className="font-bold text-lg">{hero?.title || PAGE_NAMES[pageKey]}</h3>
                                    <p className="text-sm opacity-80">{hero?.subtitle || ''}</p>
                                </div>
                            </div>
                            <div className="p-4 flex justify-between items-center">
                                <span className="font-medium text-slate-900">{PAGE_NAMES[pageKey]}</span>
                                <button 
                                    onClick={() => hero ? handleEdit(hero) : handleCreateNew(pageKey)} 
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <MdEdit size={20} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <MediaPicker
                isOpen={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={handleMediaSelect}
            />
        </div>
    );
};

export default AdminPageSettings;
