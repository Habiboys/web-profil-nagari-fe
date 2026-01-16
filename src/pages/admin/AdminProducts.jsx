import { useEffect, useState } from 'react';
import { MdAdd, MdClose, MdDelete, MdEdit, MdSearch, MdUpload } from 'react-icons/md';
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        seller: '',
        image: '',
    });

    const fetchProducts = async () => {
        try {
            const response = await api.get(ENDPOINTS.PRODUCTS.GET_ALL);
            setProducts(response.data?.data || response.data || []);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formDataUpload = new FormData();
        formDataUpload.append('file', file);

        setUploading(true);
        try {
            const response = await api.post(ENDPOINTS.UPLOAD.SINGLE, formDataUpload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const imageUrl = response.data?.file?.url || response.data?.url;
            setFormData({ ...formData, image: imageUrl });
        } catch (error) {
            console.error('Failed to upload image:', error);
            alert('Gagal upload gambar');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData, price: parseInt(formData.price) || 0 };
            if (editingItem) {
                await api.put(ENDPOINTS.PRODUCTS.UPDATE(editingItem.id), payload);
            } else {
                await api.post(ENDPOINTS.PRODUCTS.CREATE, payload);
            }
            setModalOpen(false);
            setEditingItem(null);
            setFormData({ name: '', description: '', price: '', seller: '', image: '' });
            fetchProducts();
        } catch (error) {
            console.error('Failed to save product:', error);
            alert('Gagal menyimpan produk');
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            name: item.name || '',
            description: item.description || '',
            price: item.price?.toString() || '',
            seller: item.seller || '',
            image: item.image || '',
        });
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin ingin menghapus produk ini?')) return;
        try {
            await api.delete(ENDPOINTS.PRODUCTS.DELETE(id));
            fetchProducts();
        } catch (error) {
            console.error('Failed to delete product:', error);
            alert('Gagal menghapus produk');
        }
    };

    const openAddModal = () => {
        setEditingItem(null);
        setFormData({ name: '', description: '', price: '', seller: '', image: '' });
        setModalOpen(true);
    };

    const filteredProducts = products.filter(item => 
        item.name?.toLowerCase().includes(search.toLowerCase())
    );

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Kelola Produk</h1>
                <button
                    onClick={openAddModal}
                    className="bg-green-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-green-700 transition-colors"
                >
                    <MdAdd size={20} />
                    Tambah Produk
                </button>
            </div>

            {/* Search */}
            <div className="bg-white border border-slate-200 p-4 mb-6">
                <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Cari produk..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 focus:border-green-500 outline-none"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Produk</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Penjual</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Harga</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-slate-500">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-slate-500">Loading...</td>
                            </tr>
                        ) : filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-slate-500">Tidak ada data</td>
                            </tr>
                        ) : (
                            filteredProducts.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover bg-slate-100" />
                                            ) : (
                                                <div className="w-10 h-10 bg-slate-100" />
                                            )}
                                            <div className="font-medium text-slate-900">{item.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{item.seller || '-'}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                                        {item.price ? formatPrice(item.price) : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                                        >
                                            <MdEdit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
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
                    <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-auto">
                        <div className="flex justify-between items-center p-6 border-b border-slate-200">
                            <h2 className="text-lg font-bold">{editingItem ? 'Edit Produk' : 'Tambah Produk'}</h2>
                            <button onClick={() => setModalOpen(false)} className="text-slate-500 hover:text-slate-700">
                                <MdClose size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Produk</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 focus:border-green-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Penjual</label>
                                <input
                                    type="text"
                                    value={formData.seller}
                                    onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 focus:border-green-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Harga (Rp)</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 focus:border-green-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Gambar</label>
                                <div className="flex gap-2">
                                    <label className="flex-1 flex items-center gap-2 px-4 py-2 border border-slate-300 cursor-pointer hover:bg-slate-50">
                                        <MdUpload size={20} className="text-slate-500" />
                                        <span className="text-sm text-slate-600 truncate">
                                            {uploading ? 'Uploading...' : formData.image ? 'Ganti gambar' : 'Pilih gambar'}
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            disabled={uploading}
                                        />
                                    </label>
                                    {formData.image && (
                                        <img src={formData.image} alt="Preview" className="w-10 h-10 object-cover" />
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 focus:border-green-500 outline-none h-24 resize-none"
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
                                    className="flex-1 px-4 py-2 bg-green-600 text-white hover:bg-green-700"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
