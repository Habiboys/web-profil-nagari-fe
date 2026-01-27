import { useEffect, useState } from 'react';
import { MdAdd, MdDelete, MdEdit, MdSave } from 'react-icons/md';
import { toast } from 'sonner';
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';
import ConfirmDialog from '../../components/ConfirmDialog';

const AdminHistory = () => {
    const [historyList, setHistoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [confirmDelete, setConfirmDelete] = useState(null);

    const fetchData = async () => {
        try {
            const res = await api.get(ENDPOINTS.HISTORY.GET_ALL);
            setHistoryList(res.data);
        } catch (error) {
            toast.error('Gagal memuat data sejarah');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(ENDPOINTS.HISTORY.UPDATE(editingId), formData);
                toast.success('Sejarah berhasil diperbarui');
            } else {
                await api.post(ENDPOINTS.HISTORY.CREATE, formData);
                toast.success('Sejarah berhasil ditambahkan');
            }
            fetchData();
            setShowForm(false);
            setEditingId(null);
            setFormData({ title: '', content: '' });
        } catch (error) {
            toast.error('Gagal menyimpan data');
        }
    };

    const handleEdit = (item) => {
        setFormData({ title: item.title, content: item.content });
        setEditingId(item.id);
        setShowForm(true);
    };

    const handleDelete = async () => {
        try {
            await api.delete(ENDPOINTS.HISTORY.DELETE(confirmDelete));
            toast.success('Sejarah berhasil dihapus');
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
                <h1 className="text-2xl font-bold text-slate-900">Sejarah Nagari</h1>
                <button
                    onClick={() => { setShowForm(true); setEditingId(null); setFormData({ title: '', content: '' }); }}
                    className="bg-blue-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-blue-700"
                >
                    <MdAdd size={20} /> Tambah Sejarah
                </button>
            </div>

            {showForm && (
                <div className="bg-white border border-slate-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">{editingId ? 'Edit Sejarah' : 'Tambah Sejarah'}</h2>
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
                            <label className="block text-sm font-medium text-slate-700 mb-1">Konten</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none h-40 resize-none"
                                required
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

            <div className="space-y-4">
                {historyList.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-200 p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                                <p className="text-sm text-slate-600 mt-1 whitespace-pre-wrap">{item.content}</p>
                            </div>
                            <div className="flex gap-2 ml-4">
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
                {historyList.length === 0 && (
                    <p className="text-center text-slate-500 py-8">Belum ada data sejarah.</p>
                )}
            </div>

            <ConfirmDialog
                isOpen={!!confirmDelete}
                title="Hapus Sejarah"
                message="Apakah Anda yakin ingin menghapus item ini?"
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(null)}
            />
        </div>
    );
};

export default AdminHistory;
