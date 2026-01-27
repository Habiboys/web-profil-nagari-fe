import { useEffect, useState } from 'react';
import { MdAdd, MdClose, MdDelete, MdEdit, MdPhotoLibrary, MdSearch } from 'react-icons/md';
import { toast } from 'sonner';
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';
import ConfirmDialog from '../../components/ConfirmDialog';
import MediaPicker from '../../components/MediaPicker';
import RichTextEditor from '../../components/RichTextEditor';

const AdminNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        image: '',
    });

    const fetchNews = async () => {
        try {
            const response = await api.get(ENDPOINTS.NEWS.GET_ALL);
            setNews(response.data?.data || response.data || []);
        } catch (error) {
            console.error('Failed to fetch news:', error);
            toast.error('Gagal mengambil berita');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleImageSelect = (imagePath) => {
        setFormData({ ...formData, image: imagePath });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await api.put(ENDPOINTS.NEWS.UPDATE(editingItem.id), formData);
                toast.success('Berita berhasil diperbarui');
            } else {
                await api.post(ENDPOINTS.NEWS.CREATE, formData);
                toast.success('Berita berhasil ditambahkan');
            }
            setModalOpen(false);
            setEditingItem(null);
            setFormData({ title: '', content: '', category: '', image: '' });
            fetchNews();
        } catch (error) {
            console.error('Failed to save news:', error);
            toast.error('Gagal menyimpan berita');
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            title: item.title || '',
            content: item.content || '',
            category: item.category || '',
            image: item.image || '',
        });
        setModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(ENDPOINTS.NEWS.DELETE(deleteId));
            fetchNews();
            toast.success('Berita berhasil dihapus');
        } catch (error) {
            console.error('Failed to delete news:', error);
            toast.error('Gagal menghapus berita');
        }
    };

    const openAddModal = () => {
        setEditingItem(null);
        setFormData({ title: '', content: '', category: '', image: '' });
        setModalOpen(true);
    };

    const filteredNews = news.filter(item => 
        item.title?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Kelola Berita</h1>
                <button
                    onClick={openAddModal}
                    className="bg-blue-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    <MdAdd size={20} />
                    Tambah Berita
                </button>
            </div>

            {/* Search */}
            <div className="bg-white border border-slate-200 p-4 mb-6">
                <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Cari berita..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 focus:border-blue-500 outline-none"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Gambar</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Judul</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Kategori</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Tanggal</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-slate-500">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">Loading...</td>
                            </tr>
                        ) : filteredNews.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">Tidak ada data</td>
                            </tr>
                        ) : (
                            filteredNews.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        {item.image ? (
                                            <img src={item.image} alt="" className="w-16 h-12 object-cover bg-slate-100" />
                                        ) : (
                                            <div className="w-16 h-12 bg-slate-100 flex items-center justify-center text-slate-400 text-xs">No img</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-900 line-clamp-1">{item.title}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1">
                                            {item.category || '-'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID') : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                                        >
                                            <MdEdit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(item.id)}
                                            className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50"
                                        >
                                            <MdDelete size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-auto">
                        <div className="flex justify-between items-center p-6 border-b border-slate-200">
                            <h2 className="text-lg font-bold">{editingItem ? 'Edit Berita' : 'Tambah Berita'}</h2>
                            <button onClick={() => setModalOpen(false)} className="text-slate-500 hover:text-slate-700">
                                <MdClose size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none"
                                        placeholder="Pemerintahan, Pertanian, dll"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Gambar Cover</label>
                                    <div className="flex gap-2">
                                        <button 
                                            type="button" 
                                            onClick={() => setMediaPickerOpen(true)} 
                                            className="flex-1 flex items-center gap-2 px-4 py-2 border border-slate-300 hover:bg-slate-50"
                                        >
                                            <MdPhotoLibrary size={20} className="text-slate-500" />
                                            <span className="text-sm text-slate-600 truncate">
                                                {formData.image ? 'Ganti gambar' : 'Pilih dari Media'}
                                            </span>
                                        </button>
                                        {formData.image && (
                                            <img src={formData.image} alt="Preview" className="w-10 h-10 object-cover border" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Konten</label>
                                <RichTextEditor
                                    value={formData.content}
                                    onChange={(value) => setFormData({ ...formData, content: value })}
                                    placeholder="Tulis isi berita..."
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <MediaPicker 
                isOpen={mediaPickerOpen} 
                onClose={() => setMediaPickerOpen(false)} 
                onSelect={handleImageSelect}
                currentImage={formData.image}
            />

            <ConfirmDialog
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Hapus Berita"
                message="Apakah Anda yakin ingin menghapus berita ini?"
                confirmText="Ya, Hapus"
                type="danger"
            />
        </div>
    );
};

export default AdminNews;
