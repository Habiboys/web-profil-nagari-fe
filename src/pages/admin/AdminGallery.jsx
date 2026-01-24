import { useEffect, useState } from 'react';
import { MdAdd, MdClose, MdDelete, MdPhotoLibrary } from 'react-icons/md';
import { toast } from 'sonner';
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';
import ConfirmDialog from '../../components/ConfirmDialog';
import MediaPicker from '../../components/MediaPicker';
import { getImageUrl } from '../../utils/imageUrl';

const AdminGallery = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', image: '', description: '' });
    const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchData = async () => {
        try {
            const response = await api.get(ENDPOINTS.GALLERY.GET_ALL);
            setData(response.data?.data || response.data || []);
        } catch (error) {
            console.error('Failed to fetch:', error);
            toast.error('Gagal mengambil data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleImageSelect = (imagePath) => {
        setFormData({ ...formData, image: imagePath });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.image) {
            toast.error('Silakan pilih gambar terlebih dahulu');
            return;
        }
        try {
            await api.post(ENDPOINTS.GALLERY.CREATE, formData);
            setModalOpen(false);
            setFormData({ title: '', image: '', description: '' });
            fetchData();
            toast.success('Galeri berhasil ditambahkan');
        } catch (error) {
            toast.error('Gagal menyimpan data');
        }
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(ENDPOINTS.GALLERY.DELETE(deleteId));
            toast.success('Galeri berhasil dihapus');
            fetchData();
        } catch (error) {
            toast.error('Gagal menghapus galeri');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Galeri</h1>
                <button onClick={() => { setFormData({ title: '', image: '', description: '' }); setModalOpen(true); }} className="bg-pink-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-pink-700">
                    <MdAdd size={20} /> Tambah
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {loading ? <p className="text-slate-500 col-span-4">Loading...</p> :
                data.length === 0 ? <p className="text-slate-500 col-span-4">Tidak ada data</p> :
                data.map((item) => (
                    <div key={item.id} className="relative group">
                        <div className="aspect-square bg-slate-100 overflow-hidden">
                            {item.image && <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover" />}
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button onClick={() => handleDeleteClick(item.id)} className="p-3 bg-red-600 text-white hover:bg-red-700"><MdDelete size={20} /></button>
                        </div>
                        {item.title && <p className="text-sm text-slate-600 mt-2 truncate">{item.title}</p>}
                    </div>
                ))}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-md">
                        <div className="flex justify-between items-center p-6 border-b border-slate-200"><h2 className="text-lg font-bold">Tambah Galeri</h2><button onClick={() => setModalOpen(false)}><MdClose size={24} /></button></div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div><label className="block text-sm font-medium mb-1">Judul</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-pink-500 outline-none" /></div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Gambar</label>
                                <div className="flex gap-2">
                                    <button 
                                        type="button" 
                                        onClick={() => setMediaPickerOpen(true)}
                                        className="flex-1 flex items-center gap-2 px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-600"
                                    >
                                        <MdPhotoLibrary size={20} className="text-slate-500" />
                                        <span className="text-sm truncate">
                                            {formData.image ? 'Ganti gambar' : 'Pilih dari Media'}
                                        </span>
                                    </button>
                                    {formData.image && (
                                        <img src={getImageUrl(formData.image)} alt="Preview" className="w-10 h-10 object-cover border" />
                                    )}
                                </div>
                            </div>
                            <div><label className="block text-sm font-medium mb-1">Deskripsi</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-pink-500 outline-none h-20 resize-none" /></div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50">Batal</button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-pink-600 text-white hover:bg-pink-700">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <MediaPicker 
                isOpen={mediaPickerOpen} 
                onClose={() => setMediaPickerOpen(false)} 
                onSelect={handleImageSelect}
            />

            <ConfirmDialog
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Hapus Galeri"
                message="Apakah Anda yakin ingin menghapus galeri ini?"
                confirmText="Ya, Hapus"
                type="danger"
            />
        </div>
    );
};

export default AdminGallery;
