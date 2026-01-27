import { useEffect, useState } from 'react';
import { MdAdd, MdClose, MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'sonner';
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';
import ConfirmDialog from '../../components/ConfirmDialog';

const AdminJorongs = () => {
    const [jorongs, setJorongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({ name: '', area: '', distance: '', description: '' });
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchData = async () => {
        try {
            const res = await api.get(ENDPOINTS.JORONGS.GET_ALL);
            setJorongs(res.data || []);
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
            const payload = { ...formData, area: parseFloat(formData.area) || 0 };
            if (editingItem) {
                await api.put(ENDPOINTS.JORONGS.UPDATE(editingItem.id), payload);
                toast.success('Data jorong berhasil diperbarui');
            } else {
                await api.post(ENDPOINTS.JORONGS.CREATE, payload);
                toast.success('Data jorong berhasil ditambahkan');
            }
            setModalOpen(false);
            setEditingItem(null);
            setFormData({ name: '', area: '', distance: '', description: '' });
            fetchData();
        } catch (error) {
            toast.error('Gagal menyimpan data');
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({ 
            name: item.name || '', 
            area: item.area?.toString() || '', 
            distance: item.distance || '', 
            description: item.description || '' 
        });
        setModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try { 
            await api.delete(ENDPOINTS.JORONGS.DELETE(deleteId)); 
            fetchData(); 
            toast.success('Data jorong berhasil dihapus');
        } catch { 
            toast.error('Gagal menghapus data'); 
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Data Jorong</h1>
                <button onClick={() => { setEditingItem(null); setFormData({ name: '', area: '', distance: '', description: '' }); setModalOpen(true); }} className="bg-teal-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-teal-700">
                    <MdAdd size={20} /> Tambah Jorong
                </button>
            </div>

            <div className="bg-white border border-slate-200">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Nama Jorong</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Luas (Ha)</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Jarak ke Pusat</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-slate-500">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {loading ? (
                            <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">Loading...</td></tr>
                        ) : jorongs.length === 0 ? (
                            <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">Tidak ada data</td></tr>
                        ) : jorongs.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                                <td className="px-6 py-4 text-slate-600">{item.area} Ha</td>
                                <td className="px-6 py-4 text-slate-600">{item.distance || '-'}</td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleEdit(item)} className="p-2 hover:bg-blue-50 text-slate-600 hover:text-blue-600"><MdEdit size={18} /></button>
                                    <button onClick={() => handleDeleteClick(item.id)} className="p-2 hover:bg-red-50 text-slate-600 hover:text-red-600"><MdDelete size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-md">
                        <div className="flex justify-between items-center p-6 border-b border-slate-200"><h2 className="text-lg font-bold">{editingItem ? 'Edit' : 'Tambah'} Jorong</h2><button onClick={() => setModalOpen(false)}><MdClose size={24} /></button></div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div><label className="block text-sm font-medium mb-1">Nama Jorong</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-teal-500 outline-none" required /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium mb-1">Luas (Ha)</label><input type="number" step="0.01" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-teal-500 outline-none" required /></div>
                                <div><label className="block text-sm font-medium mb-1">Jarak ke Pusat</label><input type="text" value={formData.distance} onChange={(e) => setFormData({ ...formData, distance: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-teal-500 outline-none" placeholder="2 km" /></div>
                            </div>
                            <div><label className="block text-sm font-medium mb-1">Deskripsi</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-teal-500 outline-none h-20 resize-none" /></div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50">Batal</button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-teal-600 text-white hover:bg-teal-700">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmDialog
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Hapus Jorong"
                message="Apakah Anda yakin ingin menghapus data jorong ini?"
                confirmText="Ya, Hapus"
                type="danger"
            />
        </div>
    );
};

export default AdminJorongs;
