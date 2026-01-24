import { useEffect, useState } from 'react';
import { MdAdd, MdClose, MdDelete, MdEdit, MdPhotoLibrary } from 'react-icons/md';
import { toast } from 'sonner';
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';
import ConfirmDialog from '../../components/ConfirmDialog';
import MediaPicker from '../../components/MediaPicker';
import { getImageUrl } from '../../utils/imageUrl';

const AdminTourism = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '', image: '', location: '' });
    const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchData = async () => {
        try {
            const response = await api.get(ENDPOINTS.TOURISM.GET_ALL);
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
        try {
            if (editingItem) {
                await api.put(ENDPOINTS.TOURISM.UPDATE(editingItem.id), formData);
            } else {
                await api.post(ENDPOINTS.TOURISM.CREATE, formData);
            }
            setModalOpen(false);
            fetchData();
            toast.success('Data berhasil disimpan');
        } catch (error) {
            toast.error('Gagal menyimpan data');
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({ name: item.name || '', description: item.description || '', image: item.image || '', location: item.location || '' });
        setModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(ENDPOINTS.TOURISM.DELETE(deleteId));
            toast.success('Data berhasil dihapus');
            fetchData();
        } catch (error) {
            toast.error('Gagal menghapus data');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Wisata</h1>
                <button onClick={() => { setEditingItem(null); setFormData({ name: '', description: '', image: '', location: '' }); setModalOpen(true); }} className="bg-orange-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-orange-700">
                    <MdAdd size={20} /> Tambah
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? <p className="text-slate-500 col-span-3">Loading...</p> :
                data.length === 0 ? <p className="text-slate-500 col-span-3">Tidak ada data</p> :
                data.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-200 overflow-hidden">
                        <div className="h-40 bg-slate-100">
                            {item.image && <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />}
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-slate-900 mb-1">{item.name}</h3>
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
                        <div className="flex justify-between items-center p-6 border-b border-slate-200"><h2 className="text-lg font-bold">{editingItem ? 'Edit' : 'Tambah'} Wisata</h2><button onClick={() => setModalOpen(false)}><MdClose size={24} /></button></div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div><label className="block text-sm font-medium mb-1">Nama</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-orange-500 outline-none" required /></div>
                            <div><label className="block text-sm font-medium mb-1">Lokasi</label><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-orange-500 outline-none" /></div>
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
                            <div><label className="block text-sm font-medium mb-1">Deskripsi</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-orange-500 outline-none h-24 resize-none" /></div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50">Batal</button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-orange-600 text-white hover:bg-orange-700">Simpan</button>
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
                title="Hapus Wisata"
                message="Apakah Anda yakin ingin menghapus data wisata ini?"
                confirmText="Ya, Hapus"
                type="danger"
            />
        </div>
    );
};

export default AdminTourism;
