import { useCallback, useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import { MdCheck, MdClose, MdCrop, MdDelete, MdEdit, MdSearch, MdUpload } from 'react-icons/md';
import { toast } from 'sonner';
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';
import ConfirmDialog from '../../components/ConfirmDialog';
import { getImageUrl } from '../../utils/imageUrl';

// Helper to create cropped image
const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.src = url;
    });

const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
    return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.95);
    });
};

const AdminMedia = () => {
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editAlt, setEditAlt] = useState('');
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmType, setConfirmType] = useState('single');
    const [deleteId, setDeleteId] = useState(null);
    
    // Crop states
    const [cropMode, setCropMode] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const fetchMedia = async (page = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ page, limit: 20 });
            if (search) params.append('search', search);
            const response = await api.get(`${ENDPOINTS.MEDIA.GET_ALL}?${params}`);
            const data = response.data?.data || response.data || [];
            setMedia(Array.isArray(data) ? data : []);
            if (response.data?.pagination) {
                setPagination(response.data.pagination);
            }
        } catch (error) {
            console.error('Failed to fetch media:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMedia(); }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchMedia(1);
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setOriginalFile(file);
        const reader = new FileReader();
        reader.onload = () => {
            setImageToCrop(reader.result);
            setCropMode(true);
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    const handleCropConfirm = async () => {
        if (!imageToCrop || !croppedAreaPixels || !originalFile) return;
        setUploading(true);
        try {
            const croppedBlob = await getCroppedImg(imageToCrop, croppedAreaPixels);
            const formData = new FormData();
            formData.append('file', croppedBlob, originalFile.name);
            formData.append('alt', originalFile.name.replace(/\.[^/.]+$/, ''));
            await api.post(ENDPOINTS.MEDIA.UPLOAD, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Gambar berhasil diupload');
            fetchMedia();
        } catch (error) {
            toast.error('Gagal upload gambar');
        } finally {
            setUploading(false);
            handleCropCancel();
        }
    };

    const handleCropCancel = () => {
        setCropMode(false);
        setImageToCrop(null);
        setOriginalFile(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
    };

    const handleUpdateAlt = async (id) => {
        try {
            await api.put(ENDPOINTS.MEDIA.UPDATE(id), { alt: editAlt });
            setEditingId(null);
            toast.success('Alt text berhasil diperbarui');
            fetchMedia();
        } catch (error) {
            toast.error('Gagal update alt text');
        }
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setConfirmType('single');
        setConfirmOpen(true);
    };

    const handleBulkDeleteClick = () => {
        if (selectedIds.length === 0) return;
        setConfirmType('bulk');
        setConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            if (confirmType === 'bulk') {
                await api.post(ENDPOINTS.MEDIA.BULK_DELETE, { ids: selectedIds });
                toast.success(`${selectedIds.length} media berhasil dihapus`);
                setSelectedIds([]);
            } else {
                await api.delete(ENDPOINTS.MEDIA.DELETE(deleteId));
                toast.success('Media berhasil dihapus');
            }
            fetchMedia();
        } catch (error) {
            toast.error('Gagal menghapus media');
        }
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const toggleSelectAll = () => {
        setSelectedIds(selectedIds.length === media.length ? [] : media.map(m => m.id));
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    // Crop mode UI
    if (cropMode && imageToCrop) {
        return (
            <div className="fixed inset-0 bg-black/90 flex flex-col z-[60]">
                <div className="flex justify-between items-center p-4 bg-slate-900 text-white">
                    <h2 className="text-lg font-bold flex items-center gap-2"><MdCrop size={24} /> Crop Gambar</h2>
                    <button onClick={handleCropCancel}><MdClose size={24} /></button>
                </div>
                <div className="flex-1 relative">
                    <Cropper image={imageToCrop} crop={crop} zoom={zoom} aspect={16/9} onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} />
                </div>
                <div className="p-4 bg-slate-900">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-white text-sm">Zoom:</span>
                        <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(parseFloat(e.target.value))} className="flex-1" />
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleCropCancel} className="flex-1 py-3 border border-slate-600 text-white hover:bg-slate-800">Batal</button>
                        <button onClick={handleCropConfirm} disabled={uploading} className="flex-1 py-3 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">
                            {uploading ? 'Uploading...' : <><MdCheck size={20} /> Simpan & Upload</>}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Media Library</h1>
                <div className="flex gap-3">
                    {selectedIds.length > 0 && (
                        <button onClick={handleBulkDeleteClick} className="bg-red-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-red-700">
                            <MdDelete size={20} /> Hapus ({selectedIds.length})
                        </button>
                    )}
                    <label className="bg-blue-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-blue-700 cursor-pointer">
                        <MdUpload size={20} /> Upload
                        <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                    </label>
                </div>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <div className="relative flex-1 max-w-sm">
                    <MdSearch size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari media..." className="w-full pl-10 pr-4 py-2 border border-slate-300 focus:border-blue-500 outline-none" />
                </div>
                <button type="submit" className="bg-slate-900 text-white px-4 py-2 hover:bg-slate-800">Cari</button>
            </form>

            {/* Select All */}
            {media.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                    <button onClick={toggleSelectAll} className="text-sm text-blue-600 hover:underline">
                        {selectedIds.length === media.length ? 'Batal pilih semua' : 'Pilih semua'}
                    </button>
                    <span className="text-sm text-slate-500">({pagination.total} media)</span>
                </div>
            )}

            {/* Media Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {loading ? (
                    <p className="col-span-6 text-center py-12 text-slate-500">Loading...</p>
                ) : media.length === 0 ? (
                    <p className="col-span-6 text-center py-12 text-slate-500">Tidak ada media</p>
                ) : (
                    media.map((item) => (
                        <div key={item.id} className={`relative bg-white border ${selectedIds.includes(item.id) ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200'} group`}>
                            <button onClick={() => toggleSelect(item.id)} className={`absolute top-2 left-2 z-10 w-6 h-6 border ${selectedIds.includes(item.id) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'} flex items-center justify-center`}>
                                {selectedIds.includes(item.id) && <MdCheck size={16} />}
                            </button>
                            <div className="aspect-square bg-slate-100 overflow-hidden">
                                <img src={getImageUrl(item.path)} alt={item.alt || item.filename} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-2">
                                {editingId === item.id ? (
                                    <div className="flex gap-1">
                                        <input type="text" value={editAlt} onChange={(e) => setEditAlt(e.target.value)} className="flex-1 text-xs px-2 py-1 border border-slate-300" onKeyDown={(e) => e.key === 'Enter' && handleUpdateAlt(item.id)} />
                                        <button onClick={() => handleUpdateAlt(item.id)} className="text-green-600"><MdCheck size={16} /></button>
                                        <button onClick={() => setEditingId(null)} className="text-red-600"><MdClose size={16} /></button>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-xs text-slate-700 truncate" title={item.alt || item.filename}>{item.alt || item.filename}</p>
                                        <p className="text-xs text-slate-400">{formatSize(item.size)}</p>
                                    </>
                                )}
                            </div>
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <button onClick={() => { setEditingId(item.id); setEditAlt(item.alt || ''); }} className="bg-white border border-slate-200 p-1 hover:bg-slate-50"><MdEdit size={14} /></button>
                                <button onClick={() => handleDeleteClick(item.id)} className="bg-white border border-slate-200 p-1 hover:bg-red-50 text-red-600"><MdDelete size={14} /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                        <button key={page} onClick={() => fetchMedia(page)} className={`px-3 py-1 border ${pagination.page === page ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300 hover:bg-slate-50'}`}>{page}</button>
                    ))}
                </div>
            )}

            <ConfirmDialog
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                title={confirmType === 'bulk' ? `Hapus ${selectedIds.length} Media` : 'Hapus Media'}
                message="Apakah Anda yakin ingin menghapus media ini? File akan dihapus permanen."
                confirmText="Ya, Hapus"
                type="danger"
            />
        </div>
    );
};

export default AdminMedia;
