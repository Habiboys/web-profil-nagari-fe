import { useEffect, useState } from 'react';
import { MdAdd, MdClose, MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'sonner';
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';
import ConfirmDialog from '../../components/ConfirmDialog';

const AdminMissions = () => {
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({ content: '', order: 0 });
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchData = async () => {
        try {
            const res = await api.get(ENDPOINTS.MISSIONS.GET_ALL);
            setMissions(res.data || []);
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
                await api.put(ENDPOINTS.MISSIONS.UPDATE(editingItem.id), formData);
                toast.success('Misi berhasil diperbarui');
            } else {
                await api.post(ENDPOINTS.MISSIONS.CREATE, formData);
                toast.success('Misi berhasil ditambahkan');
            }
            setModalOpen(false);
            setEditingItem(null);
            setFormData({ content: '', order: 0 });
            fetchData();
        } catch (error) {
            toast.error('Gagal menyimpan data');
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({ content: item.content || '', order: item.order || 0 });
        setModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try { 
            await api.delete(ENDPOINTS.MISSIONS.DELETE(deleteId)); 
            fetchData(); 
            toast.success('Misi berhasil dihapus');
        } catch { 
            toast.error('Gagal menghapus misi'); 
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Misi Nagari</h1>
                <button onClick={() => { setEditingItem(null); setFormData({ content: '', order: missions.length + 1 }); setModalOpen(true); }} className="bg-indigo-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-indigo-700">
                    <MdAdd size={20} /> Tambah Misi
                </button>
            </div>

            <div className="bg-white border border-slate-200">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading...</div>
                ) : missions.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">Belum ada data misi</div>
                ) : (
                    <div className="divide-y divide-slate-200">
                        {missions.sort((a, b) => a.order - b.order).map((item, idx) => (
                            <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-slate-50">
                                <div className="w-8 h-8 bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                                    {idx + 1}
                                </div>
                                <p className="flex-1 text-slate-700">{item.content}</p>
                                <div className="flex gap-1">
                                    <button onClick={() => handleEdit(item)} className="p-2 hover:bg-blue-50 text-slate-600 hover:text-blue-600"><MdEdit size={18} /></button>
                                    <button onClick={() => handleDeleteClick(item.id)} className="p-2 hover:bg-red-50 text-slate-600 hover:text-red-600"><MdDelete size={18} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-lg">
                        <div className="flex justify-between items-center p-6 border-b border-slate-200"><h2 className="text-lg font-bold">{editingItem ? 'Edit' : 'Tambah'} Misi</h2><button onClick={() => setModalOpen(false)}><MdClose size={24} /></button></div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Urutan</label>
                                <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} className="w-full px-4 py-2 border border-slate-300 focus:border-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Isi Misi</label>
                                <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-indigo-500 outline-none h-32 resize-none" required />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50">Batal</button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmDialog
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Hapus Misi"
                message="Apakah Anda yakin ingin menghapus misi ini?"
                confirmText="Ya, Hapus"
                type="danger"
            />
        </div>
    );
};

export default AdminMissions;
