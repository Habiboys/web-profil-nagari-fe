import { useEffect, useState } from 'react';
import { MdAdd, MdClose, MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'sonner'; // Added toast
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';
import ConfirmDialog from '../../components/ConfirmDialog'; // Added ConfirmDialog

const AdminFacilities = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({ type: '', category: 'worship', count: 1, description: '' });
    const [confirmOpen, setConfirmOpen] = useState(false); // Added state
    const [deleteId, setDeleteId] = useState(null); // Added state

    const fetchData = async () => {
        try {
            const response = await api.get(ENDPOINTS.FACILITIES.GET_ALL);
            setData(response.data?.data || response.data || []);
        } catch (error) {
            console.error('Failed to fetch:', error);
            toast.error('Gagal mengambil data'); // Updated alert
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData, count: parseInt(formData.count) || 1 };
            if (editingItem) {
                await api.put(ENDPOINTS.FACILITIES.UPDATE(editingItem.id), payload);
                toast.success('Fasilitas berhasil diperbarui'); // Added toast
            } else {
                await api.post(ENDPOINTS.FACILITIES.CREATE, payload);
                toast.success('Fasilitas berhasil ditambahkan'); // Added toast
            }
            setModalOpen(false);
            fetchData();
        } catch (error) {
            toast.error('Gagal menyimpan fasilitas'); // Updated alert
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({ type: item.type || '', category: item.category || 'worship', count: item.count || 1, description: item.description || '' });
        setModalOpen(true);
    };

    const handleDeleteClick = (id) => { // Renamed and updated logic
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => { // Added confirm logic
        try { 
            await api.delete(ENDPOINTS.FACILITIES.DELETE(deleteId)); 
            fetchData(); 
            toast.success('Fasilitas berhasil dihapus');
        } catch { 
            toast.error('Gagal menghapus fasilitas'); 
        }
    };

    const categories = [
        { value: 'worship', label: 'Sarana Ibadah' },
        { value: 'education', label: 'Pendidikan' },
        { value: 'health', label: 'Kesehatan' },
        { value: 'sports', label: 'Olahraga' },
        { value: 'arts', label: 'Kesenian/Budaya' }
    ];

    return (
        <div>
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Fasilitas</h1>
                <button onClick={() => { setEditingItem(null); setFormData({ type: '', category: 'worship', count: 1, description: '' }); setModalOpen(true); }} className="bg-teal-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-teal-700">
                    <MdAdd size={20} /> Tambah
                </button>
            </div>

            <div className="bg-white border border-slate-200">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200"><tr>
                        <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Jenis</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Kategori</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Jumlah</th>
                        <th className="text-right px-6 py-4 text-sm font-medium text-slate-500">Aksi</th>
                    </tr></thead>
                    <tbody className="divide-y divide-slate-200">
                        {loading ? <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">Loading...</td></tr> :
                        data.length === 0 ? <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">Tidak ada data</td></tr> :
                        data.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium">{item.type}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1">
                                        {categories.find(c => c.value === item.category)?.label || item.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{item.count}</td>
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
                        <div className="flex justify-between items-center p-6 border-b border-slate-200"><h2 className="text-lg font-bold">{editingItem ? 'Edit' : 'Tambah'} Fasilitas</h2><button onClick={() => setModalOpen(false)}><MdClose size={24} /></button></div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div><label className="block text-sm font-medium mb-1">Jenis</label><input type="text" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-teal-500 outline-none" required placeholder="Masjid, SD, Posyandu..." /></div>
                            <div><label className="block text-sm font-medium mb-1">Kategori</label>
                                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-teal-500 outline-none">
                                    {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                </select>
                            </div>
                            <div><label className="block text-sm font-medium mb-1">Jumlah</label><input type="number" min="1" value={formData.count} onChange={(e) => setFormData({ ...formData, count: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-teal-500 outline-none" required /></div>
                            
                            {/* Note / Description is in state but not in form? The user had description in state. Adding it back if needed, or keeping as is if user code didn't use it. 
                                Checking original code: used 'description', wait, the file I read had description in handleEdit but NOT in the JSX form. 
                                Ah, wait, checking file again... 
                                Line 44: setFormData({ ... description: item.description || '' })
                                JSX: NO description input! 
                                Use `note` in backend? The backend schema has `note String?`. Frontend state used `description`. 
                                I will add the input for description/note to be complete. 
                            */}
                            <div><label className="block text-sm font-medium mb-1">Keterangan</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-teal-500 outline-none" /></div>

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
                title="Hapus Fasilitas"
                message="Apakah Anda yakin ingin menghapus fasilitas ini?"
                confirmText="Ya, Hapus"
                type="danger"
            />
        </div>
    );
};

export default AdminFacilities;
