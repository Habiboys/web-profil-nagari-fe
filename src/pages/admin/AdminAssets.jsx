import { useEffect, useState } from 'react';
import { MdAdd, MdClose, MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'sonner';
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';
import ConfirmDialog from '../../components/ConfirmDialog';

const AdminAssets = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({ name: '', category: '', value: '', year: new Date().getFullYear() });
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchData = async () => {
        try {
            const res = await api.get(ENDPOINTS.ASSETS.GET_ALL);
            setAssets(res.data || []);
        } catch (error) {
            console.error('Failed to fetch:', error);
            toast.error('Gagal mengambil data aset');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { 
                name: formData.name,
                category: formData.category,
                value: parseInt(formData.value.toString().replace(/\D/g, '')) || 0,
                year: parseInt(formData.year) 
            };
            if (editingItem) {
                await api.put(ENDPOINTS.ASSETS.UPDATE(editingItem.id), payload);
                toast.success('Aset berhasil diperbarui');
            } else {
                await api.post(ENDPOINTS.ASSETS.CREATE, payload);
                toast.success('Aset berhasil ditambahkan');
            }
            setModalOpen(false);
            setEditingItem(null);
            setFormData({ name: '', category: '', value: '', year: new Date().getFullYear() });
            fetchData();
        } catch (error) {
            toast.error('Gagal menyimpan aset');
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({ 
            name: item.name || '',
            category: item.category || '', 
            value: item.value?.toString() || '', 
            year: item.year || new Date().getFullYear()
        });
        setModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try { 
            await api.delete(ENDPOINTS.ASSETS.DELETE(deleteId)); 
            fetchData(); 
            toast.success('Aset berhasil dihapus');
        } catch { 
            toast.error('Gagal menghapus aset'); 
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
    };

    const categories = [
        'Tanah',
        'Peralatan dan Mesin',
        'Gedung dan Bangunan',
        'Jalan, Irigasi dan Jaringan',
        'Aset Tetap Lainnya',
        'Aset Lainnya'
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Aset Infrastruktur</h1>
                <button onClick={() => { setEditingItem(null); setFormData({ name: '', category: '', value: '', year: new Date().getFullYear() }); setModalOpen(true); }} className="bg-emerald-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-emerald-700">
                    <MdAdd size={20} /> Tambah Aset
                </button>
            </div>

            <div className="bg-white border border-slate-200">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Nama Aset</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Kategori</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Nilai</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Tahun</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-slate-500">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {loading ? (
                            <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">Loading...</td></tr>
                        ) : assets.length === 0 ? (
                            <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">Tidak ada data</td></tr>
                        ) : assets.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                                <td className="px-6 py-4 text-slate-600">{item.category}</td>
                                <td className="px-6 py-4 text-emerald-600 font-medium">{formatCurrency(item.value)}</td>
                                <td className="px-6 py-4 text-slate-600">{item.year}</td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleEdit(item)} className="p-2 hover:bg-blue-50 text-slate-600 hover:text-blue-600"><MdEdit size={18} /></button>
                                    <button onClick={() => handleDeleteClick(item.id)} className="p-2 hover:bg-red-50 text-slate-600 hover:text-red-600"><MdDelete size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Summary */}
            {assets.length > 0 && (
                <div className="mt-6 bg-emerald-50 border border-emerald-200 p-6">
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-slate-700">Total Nilai Aset</span>
                        <span className="text-2xl font-bold text-emerald-600">
                            {formatCurrency(assets.reduce((sum, a) => sum + Number(a.value || 0), 0))}
                        </span>
                    </div>
                </div>
            )}

            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-md">
                        <div className="flex justify-between items-center p-6 border-b border-slate-200"><h2 className="text-lg font-bold">{editingItem ? 'Edit' : 'Tambah'} Aset</h2><button onClick={() => setModalOpen(false)}><MdClose size={24} /></button></div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nama Aset</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-emerald-500 outline-none" placeholder="Contoh: Gedung Balai Nagari" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Kategori</label>
                                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-emerald-500 outline-none" required>
                                    <option value="">-- Pilih Kategori --</option>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Nilai (Rp)</label>
                                <input type="text" value={formData.value} onChange={(e) => setFormData({ ...formData, value: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-emerald-500 outline-none" placeholder="1000000000" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Tahun</label>
                                <input type="number" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-emerald-500 outline-none" required />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50">Batal</button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmDialog
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Hapus Aset"
                message="Apakah Anda yakin ingin menghapus aset ini?"
                confirmText="Ya, Hapus"
                type="danger"
            />
        </div>
    );
};

export default AdminAssets;
