import { useEffect, useState } from 'react';
import { MdAdd, MdClose, MdDelete, MdEdit, MdPhotoLibrary } from 'react-icons/md';
import { toast } from 'sonner';
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';
import ConfirmDialog from '../../components/ConfirmDialog';
import MediaPicker from '../../components/MediaPicker';
import { getImageUrl } from '../../utils/imageUrl';

const AdminOfficials = () => {
    const [officials, setOfficials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [formData, setFormData] = useState({ name: '', position: '', image: '', order: 0, parentId: '' });

    const fetchData = async () => {
        try {
            const response = await api.get(ENDPOINTS.OFFICIALS.GET_ALL);
            setOfficials(response.data || []);
        } catch (error) {
            console.error('Failed to fetch:', error);
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
            const payload = { 
                ...formData, 
                order: parseInt(formData.order) || 0,
                parentId: formData.parentId ? parseInt(formData.parentId) : null,
            };
            if (editingItem) {
                await api.put(ENDPOINTS.OFFICIALS.UPDATE(editingItem.id), payload);
            } else {
                await api.post(ENDPOINTS.OFFICIALS.CREATE, payload);
            }
            setModalOpen(false);
            fetchData();
            toast.success(editingItem ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan');
        } catch (error) {
            toast.error('Gagal menyimpan data');
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({ 
            name: item.name || '', 
            position: item.position || '', 
            image: item.image || '', 
            order: item.order || 0,
            parentId: item.parentId?.toString() || ''
        });
        setModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(ENDPOINTS.OFFICIALS.DELETE(deleteId));
            fetchData();
            toast.success('Data berhasil dihapus');
        } catch (error) {
            toast.error('Gagal menghapus data');
        }
    };

    // Group officials by hierarchy
    const topLevel = officials.filter(o => !o.parentId);
    const getChildren = (parentId) => officials.filter(o => o.parentId === parentId);

    // Position presets for dropdown
    const positionPresets = [
        'Wali Nagari',
        'LPM',
        'BAMUS',
        'Sekretaris Nagari',
        'Kasi Pemerintahan',
        'Kasi Kesejahteraan',
        'Kasi Pelayanan',
        'Kaur Tata Usaha dan Umum',
        'Kaur Keuangan',
        'Kaur Perencanaan',
        'Staf Kaur Tata Usaha & Umum',
        'Kepala Jorong Talang Anau',
        'Kepala Jorong Simpang Padang',
        'Kepala Jorong Luak Begak',
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Perangkat Nagari</h1>
                <button onClick={() => { setEditingItem(null); setFormData({ name: '', position: '', image: '', order: officials.length, parentId: '' }); setModalOpen(true); }} className="bg-purple-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-purple-700">
                    <MdAdd size={20} /> Tambah
                </button>
            </div>

            <div className="bg-white border border-slate-200">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200"><tr>
                        <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Foto</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Nama</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Jabatan</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Atasan</th>
                        <th className="text-right px-6 py-4 text-sm font-medium text-slate-500">Aksi</th>
                    </tr></thead>
                    <tbody className="divide-y divide-slate-200">
                        {loading ? <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">Loading...</td></tr> :
                        officials.length === 0 ? <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">Tidak ada data</td></tr> :
                        officials.sort((a, b) => a.order - b.order).map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">
                                    {item.image ? <img src={getImageUrl(item.image)} className="w-12 h-12 object-cover bg-slate-100" /> : <div className="w-12 h-12 bg-slate-100" />}
                                </td>
                                <td className="px-6 py-4 font-medium">{item.name}</td>
                                <td className="px-6 py-4 text-slate-600">{item.position}</td>
                                <td className="px-6 py-4 text-slate-500 text-sm">
                                    {item.parent?.name || '-'}
                                </td>
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
                        <div className="flex justify-between items-center p-6 border-b border-slate-200"><h2 className="text-lg font-bold">{editingItem ? 'Edit' : 'Tambah'} Perangkat</h2><button onClick={() => setModalOpen(false)}><MdClose size={24} /></button></div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div><label className="block text-sm font-medium mb-1">Nama</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-purple-500 outline-none" required /></div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Jabatan</label>
                                <select 
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 focus:border-purple-500 outline-none"
                                >
                                    <option value="">-- Pilih atau ketik manual --</option>
                                    {positionPresets.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                                </select>
                                <input type="text" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-purple-500 outline-none mt-2" placeholder="Atau ketik jabatan lain" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Atasan (Parent)</label>
                                <select 
                                    value={formData.parentId}
                                    onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 focus:border-purple-500 outline-none"
                                >
                                    <option value="">-- Tidak ada (Top Level) --</option>
                                    {officials.filter(o => o.id !== editingItem?.id).map(o => (
                                        <option key={o.id} value={o.id}>{o.name} - {o.position}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium mb-1">Urutan</label><input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: e.target.value })} className="w-full px-4 py-2 border border-slate-300 focus:border-purple-500 outline-none" /></div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Foto</label>
                                    <div className="flex gap-2">
                                        <button 
                                            type="button" 
                                            onClick={() => setMediaPickerOpen(true)}
                                            className="flex-1 flex items-center gap-2 px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-600"
                                        >
                                            <MdPhotoLibrary size={20} className="text-slate-500" />
                                            <span className="text-sm truncate">
                                                {formData.image ? 'Ganti' : 'Pilih'}
                                            </span>
                                        </button>
                                        {formData.image && <img src={getImageUrl(formData.image)} alt="Preview" className="w-10 h-10 object-cover border" />}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50">Batal</button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-purple-600 text-white hover:bg-purple-700">Simpan</button>
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
                title="Hapus Data"
                message="Apakah Anda yakin ingin menghapus data ini?"
                confirmText="Ya, Hapus"
                type="danger"
            />
        </div>
    );
};

export default AdminOfficials;
