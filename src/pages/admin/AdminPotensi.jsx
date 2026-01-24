import { useEffect, useState } from 'react';
import { MdAdd, MdClose, MdDelete, MdEdit, MdPhotoLibrary } from 'react-icons/md';
import { toast } from 'sonner';
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';
import ConfirmDialog from '../../components/ConfirmDialog';
import MediaPicker from '../../components/MediaPicker';

const AdminPotensi = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [formData, setFormData] = useState({ title: '', category: '', description: '', image: '', order: 0 });

    const fetchData = async () => {
        try {
            const response = await api.get(ENDPOINTS.POTENSI.GET_ALL);
            setData(response.data?.data || response.data || []);
        } catch (error) {
            console.error('Failed to fetch:', error);
            toast.error('Gagal mengambil data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await api.put(ENDPOINTS.POTENSI.UPDATE(editingItem.id), formData);
                toast.success('Data berhasil diperbarui');
            } else {
                await api.post(ENDPOINTS.POTENSI.CREATE, formData);
                toast.success('Data berhasil ditambahkan');
            }
            setModalOpen(false);
            fetchData();
        } catch (error) {
            toast.error('Gagal menyimpan data');
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({ title: item.title || '', category: item.category || '', description: item.description || '', image: item.image || '', order: item.order || 0 });
        setModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(ENDPOINTS.POTENSI.DELETE(deleteId));
            toast.success('Data berhasil dihapus');
            fetchData();
        } catch (error) {
            toast.error('Gagal menghapus data');
        }
    };

    const handleImageSelect = (imagePath) => {
        setFormData({ ...formData, image: imagePath });
    };

    const categories = ['Pariwisata', 'Agrowisata', 'Ekonomi Kreatif', 'Pertanian', 'Industri', 'Budaya'];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Potensi Nagari</h1>
                <button onClick={() => { setEditingItem(null); setFormData({ title: '', category: '', description: '', image: '', order: 0 }); setModalOpen(true); }} className="bg-emerald-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-emerald-700">
                    <MdAdd size={20} /> Tambah
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? <p className="text-slate-500 col-span-3">Loading...</p> :
                data.length === 0 ? <p className="text-slate-500 col-span-3">Tidak ada data</p> :
                data.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-200 overflow-hidden">
                        <div className="h-40 bg-slate-100 relative">
                            {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
                            <span className="absolute top-2 left-2 bg-emerald-600 text-white text-xs px-2 py-1">{item.category}</span>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-slate-500 line-clamp-2 mb-4">{item.description}</p>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(item)} className="flex-1 py-2 border border-slate-300 text-sm hover:bg-slate-50 flex items-center justify-center gap-1"><MdEdit size={16} /> Edit</button>
                                <button onClick={() => handleDeleteClick(item.id)} className="py-2 px-3 border border-red-300 text-red-600 hover:bg-red-50"><MdDelete size={16} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-md">
                        <div className="flex justify-between items-center p-6 border-b border-slate-200"><h2 className="text-lg font-bold">{editingItem ? 'Edit' : 'Tambah'} Potensi</h2><button onClick={() => setModalOpen(false)}><MdClose size={24} /></button></div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div><label className="block text-sm font-medium mb-1">Judul</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-emerald-500 outline-none" required /></div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Kategori</label>
                                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-emerald-500 outline-none" required>
                                    <option value="">Pilih kategori</option>
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Gambar</label>
                                <div className="flex gap-2">
                                    <button type="button" onClick={() => setMediaPickerOpen(true)} className="flex-1 flex items-center gap-2 px-4 py-2 border border-slate-300 hover:bg-slate-50">
                                        <MdPhotoLibrary size={20} className="text-slate-500" />
                                        <span className="text-sm text-slate-600">{formData.image ? 'Ganti gambar' : 'Pilih dari Media'}</span>
                                    </button>
                                    {formData.image && <img src={formData.image} alt="Preview" className="w-10 h-10 object-cover border" />}
                                </div>
                            </div>
                            <div><label className="block text-sm font-medium mb-1">Deskripsi</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-emerald-500 outline-none h-24 resize-none" /></div>
                            <div><label className="block text-sm font-medium mb-1">Urutan</label><input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-slate-300 focus:border-emerald-500 outline-none max-w-[100px]" /></div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50">Batal</button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <MediaPicker 
                isOpen={mediaPickerOpen} 
                onClose={() => setMediaPickerOpen(false)} 
                onSelect={handleImageSelect}
                currentImage={formData.image}
            />

            <ConfirmDialog
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Hapus Data"
                message="Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan."
                confirmText="Ya, Hapus"
                type="danger"
            />
        </div>
    );
};

export default AdminPotensi;


