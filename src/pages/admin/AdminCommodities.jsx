import { useEffect, useState } from 'react';
import { MdAdd, MdClose, MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'sonner'; // Added toast
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';
import ConfirmDialog from '../../components/ConfirmDialog'; // Added ConfirmDialog

const AdminCommodities = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({ name: '', area: '', production: '', price: '' });
    const [confirmOpen, setConfirmOpen] = useState(false); // Added state
    const [deleteId, setDeleteId] = useState(null); // Added state

    const fetchData = async () => {
        try {
            const response = await api.get(ENDPOINTS.COMMODITIES.GET_ALL);
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
            if (editingItem) {
                await api.put(ENDPOINTS.COMMODITIES.UPDATE(editingItem.id), formData);
                toast.success('Komoditi berhasil diperbarui'); // Added toast
            } else {
                await api.post(ENDPOINTS.COMMODITIES.CREATE, formData);
                toast.success('Komoditi berhasil ditambahkan'); // Added toast
            }
            setModalOpen(false);
            fetchData();
        } catch (error) {
            toast.error('Gagal menyimpan komoditi'); // Updated alert
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({ name: item.name || '', area: item.area || '', production: item.production || '', price: item.price || '' });
        setModalOpen(true);
    };

    const handleDeleteClick = (id) => { // Renamed
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => { // Added confirm logic
        try { 
            await api.delete(ENDPOINTS.COMMODITIES.DELETE(deleteId)); 
            fetchData(); 
            toast.success('Komoditi berhasil dihapus');
        } catch { 
            toast.error('Gagal menghapus komoditi'); 
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Komoditi</h1>
                <button onClick={() => { setEditingItem(null); setFormData({ name: '', area: '', production: '', price: '' }); setModalOpen(true); }} className="bg-amber-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-amber-700">
                    <MdAdd size={20} /> Tambah
                </button>
            </div>

            <div className="bg-white border border-slate-200">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200"><tr>
                        <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Nama</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Luas dan Produksi</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Harga</th>
                        <th className="text-right px-6 py-4 text-sm font-medium text-slate-500">Aksi</th>
                    </tr></thead>
                    <tbody className="divide-y divide-slate-200">
                        {loading ? <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">Loading...</td></tr> :
                        data.length === 0 ? <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">Tidak ada data</td></tr> :
                        data.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium">{item.name}</td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-slate-900">Luas: {item.area} Ha</div>
                                    <div className="text-xs text-slate-500">Prod: {item.production}</div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">{item.price}</td>
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
                        <div className="flex justify-between items-center p-6 border-b border-slate-200"><h2 className="text-lg font-bold">{editingItem ? 'Edit' : 'Tambah'} Komoditi</h2><button onClick={() => setModalOpen(false)}><MdClose size={24} /></button></div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div><label className="block text-sm font-medium mb-1">Nama</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-amber-500 outline-none" required /></div>
                            <div><label className="block text-sm font-medium mb-1">Luas Lahan (Ha)</label><input type="number" step="0.01" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-amber-500 outline-none" placeholder="50.5" /></div>
                            <div><label className="block text-sm font-medium mb-1">Produksi</label><input type="text" value={formData.production} onChange={(e) => setFormData({ ...formData, production: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-amber-500 outline-none" placeholder="10.000 Ton/tahun" /></div>
                            <div><label className="block text-sm font-medium mb-1">Harga</label><input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-amber-500 outline-none" placeholder="Rp 10.000/kg" /></div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50">Batal</button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-amber-600 text-white hover:bg-amber-700">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmDialog
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Hapus Komoditi"
                message="Apakah Anda yakin ingin menghapus data ini?"
                confirmText="Ya, Hapus"
                type="danger"
            />
        </div>
    );
};

export default AdminCommodities;
