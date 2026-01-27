import { useEffect, useState } from 'react';
import { MdAdd, MdDelete, MdEdit, MdSave } from 'react-icons/md';
import { toast } from 'sonner';
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';
import ConfirmDialog from '../../components/ConfirmDialog';
import MediaPicker from '../../components/MediaPicker';

const AdminInfographics = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', image: '', description: '' });
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [showMediaPicker, setShowMediaPicker] = useState(false);

    const fetchData = async () => {
        try {
            const res = await api.get(ENDPOINTS.INFOGRAPHICS.GET_ALL);
            setItems(res.data);
        } catch (error) {
            toast.error('Gagal memuat data infografis');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(ENDPOINTS.INFOGRAPHICS.UPDATE(editingId), formData);
                toast.success('Infografis berhasil diperbarui');
            } else {
                await api.post(ENDPOINTS.INFOGRAPHICS.CREATE, formData);
                toast.success('Infografis berhasil ditambahkan');
            }
            fetchData();
            setShowForm(false);
            setEditingId(null);
            setFormData({ title: '', image: '', description: '' });
        } catch (error) {
            toast.error('Gagal menyimpan data');
        }
    };

    const handleEdit = (item) => {
        setFormData({ title: item.title, image: item.image, description: item.description || '' });
        setEditingId(item.id);
        setShowForm(true);
    };

    const handleDelete = async () => {
        try {
            await api.delete(ENDPOINTS.INFOGRAPHICS.DELETE(confirmDelete));
            toast.success('Infografis berhasil dihapus');
            fetchData();
        } catch (error) {
            toast.error('Gagal menghapus');
        } finally {
            setConfirmDelete(null);
        }
    };

    if (loading) return <div className="text-center py-12 text-slate-500">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Infografis</h1>
                <button
                    onClick={() => { setShowForm(true); setEditingId(null); setFormData({ title: '', image: '', description: '' }); }}
                    className="bg-blue-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-blue-700"
                >
                    <MdAdd size={20} /> Tambah Infografis
                </button>
            </div>

            {showForm && (
                <div className="bg-white border border-slate-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">{editingId ? 'Edit Infografis' : 'Tambah Infografis'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Judul</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Gambar</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="flex-1 px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none"
                                    placeholder="URL gambar"
                                    required
                                />
                                <button type="button" onClick={() => setShowMediaPicker(true)} className="bg-slate-200 text-slate-700 px-4 py-2 hover:bg-slate-300">
                                    Pilih Media
                                </button>
                            </div>
                            {formData.image && (
                                <img src={formData.image} alt="Preview" className="mt-2 h-32 object-cover rounded" />
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi (Opsional)</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none h-24 resize-none"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-blue-700">
                                <MdSave size={18} /> Simpan
                            </button>
                            <button type="button" onClick={() => setShowForm(false)} className="bg-slate-200 text-slate-700 px-4 py-2 hover:bg-slate-300">
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-200 overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="font-semibold text-slate-900">{item.title}</h3>
                            {item.description && <p className="text-sm text-slate-600 mt-1">{item.description}</p>}
                            <div className="flex gap-2 mt-3">
                                <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700">
                                    <MdEdit size={20} />
                                </button>
                                <button onClick={() => setConfirmDelete(item.id)} className="text-red-500 hover:text-red-700">
                                    <MdDelete size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {items.length === 0 && (
                <p className="text-center text-slate-500 py-8">Belum ada data infografis.</p>
            )}

            <ConfirmDialog
                isOpen={!!confirmDelete}
                title="Hapus Infografis"
                message="Apakah Anda yakin ingin menghapus item ini?"
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(null)}
            />

            <MediaPicker
                isOpen={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={(media) => {
                    setFormData({ ...formData, image: media.path });
                    setShowMediaPicker(false);
                }}
            />
        </div>
    );
};

export default AdminInfographics;
