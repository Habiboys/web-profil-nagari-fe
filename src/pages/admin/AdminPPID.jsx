import { useEffect, useRef, useState } from 'react';
import { MdAdd, MdDelete, MdEdit, MdOpenInNew, MdSave, MdUploadFile } from 'react-icons/md';
import { toast } from 'sonner';
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';
import ConfirmDialog from '../../components/ConfirmDialog';

const PPID_TYPES = ['Berkala', 'Serta Merta', 'Setiap Saat', 'Dikecualikan'];

const AdminPPID = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', file: '', type: 'Berkala' });
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const fetchData = async () => {
        try {
            const res = await api.get(ENDPOINTS.PPID.GET_ALL);
            setItems(res.data);
        } catch (error) {
            toast.error('Gagal memuat data PPID');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formDataUpload = new FormData();
        formDataUpload.append('file', file);

        setUploading(true);
        try {
            const res = await api.post(ENDPOINTS.UPLOAD.SINGLE, formDataUpload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData({ ...formData, file: res.data.url });
            toast.success('File berhasil diupload');
        } catch (error) {
            toast.error('Gagal mengupload file');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(ENDPOINTS.PPID.UPDATE(editingId), formData);
                toast.success('Data PPID berhasil diperbarui');
            } else {
                await api.post(ENDPOINTS.PPID.CREATE, formData);
                toast.success('Data PPID berhasil ditambahkan');
            }
            fetchData();
            setShowForm(false);
            setEditingId(null);
            setFormData({ title: '', description: '', file: '', type: 'Berkala' });
        } catch (error) {
            toast.error('Gagal menyimpan data');
        }
    };

    const handleEdit = (item) => {
        setFormData({ title: item.title, description: item.description || '', file: item.file || '', type: item.type });
        setEditingId(item.id);
        setShowForm(true);
    };

    const handleDelete = async () => {
        try {
            await api.delete(ENDPOINTS.PPID.DELETE(confirmDelete));
            toast.success('Data PPID berhasil dihapus');
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
                <h1 className="text-2xl font-bold text-slate-900">PPID</h1>
                <button
                    onClick={() => { setShowForm(true); setEditingId(null); setFormData({ title: '', description: '', file: '', type: 'Berkala' }); }}
                    className="bg-blue-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-blue-700"
                >
                    <MdAdd size={20} /> Tambah Informasi
                </button>
            </div>

            {showForm && (
                <div className="bg-white border border-slate-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">{editingId ? 'Edit Informasi' : 'Tambah Informasi'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Judul</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Informasi</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none"
                                >
                                    {PPID_TYPES.map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-1">File Dokumen</label>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                className="hidden"
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                            />
                            <div className="flex gap-2 items-center">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="bg-slate-100 border border-slate-300 text-slate-700 px-4 py-2 flex items-center gap-2 hover:bg-slate-200 disabled:opacity-50"
                                >
                                    <MdUploadFile size={18} />
                                    {uploading ? 'Mengupload...' : 'Upload File'}
                                </button>
                                {formData.file && (
                                    <a href={formData.file} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                                        <MdOpenInNew size={16} /> Lihat File
                                    </a>
                                )}
                            </div>
                            {formData.file && (
                                <p className="text-sm text-slate-500 mt-1 truncate">{formData.file}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
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

            <div className="bg-white border border-slate-200">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Judul</th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Jenis</th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Deskripsi</th>
                            <th className="text-center px-4 py-3 text-sm font-medium text-slate-600">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="px-4 py-3 text-sm text-slate-900">
                                    {item.title}
                                    {item.file && (
                                        <a href={item.file} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                                            <MdOpenInNew size={16} className="inline" />
                                        </a>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-sm text-slate-600">{item.type}</td>
                                <td className="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">{item.description}</td>
                                <td className="px-4 py-3 text-center">
                                    <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700 mx-1">
                                        <MdEdit size={18} />
                                    </button>
                                    <button onClick={() => setConfirmDelete(item.id)} className="text-red-500 hover:text-red-700 mx-1">
                                        <MdDelete size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {items.length === 0 && (
                    <p className="text-center text-slate-500 py-8">Belum ada data PPID.</p>
                )}
            </div>

            <ConfirmDialog
                isOpen={!!confirmDelete}
                title="Hapus Data PPID"
                message="Apakah Anda yakin ingin menghapus item ini?"
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(null)}
            />
        </div>
    );
};

export default AdminPPID;
