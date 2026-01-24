import { useCallback, useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import { MdCheck, MdClose, MdCrop, MdPhotoLibrary, MdUpload } from 'react-icons/md';
import { toast } from 'sonner';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { getImageUrl } from '../utils/imageUrl';

// Helper to create cropped image area
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

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob);
        }, 'image/jpeg', 0.95);
    });
};

const MediaPicker = ({ isOpen, onClose, onSelect, currentImage, aspectRatio = 16/9 }) => {
    const [activeTab, setActiveTab] = useState('library');
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    
    // Crop states
    const [cropMode, setCropMode] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const response = await api.get(`${ENDPOINTS.MEDIA.GET_ALL}?limit=50`);
            const data = response.data?.data || response.data || [];
            setMedia(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch media:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchMedia();
            setSelectedMedia(null);
            setCropMode(false);
            setImageToCrop(null);
        }
    }, [isOpen]);

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
            // Get cropped blob
            const croppedBlob = await getCroppedImg(imageToCrop, croppedAreaPixels);
            
            // Create form data
            const formData = new FormData();
            formData.append('file', croppedBlob, originalFile.name);
            formData.append('alt', originalFile.name.replace(/\.[^/.]+$/, ''));
            
            const response = await api.post(ENDPOINTS.MEDIA.UPLOAD, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const newMedia = response.data;
            toast.success('Gambar berhasil diupload');
            onSelect(getImageUrl(newMedia.path));
            onClose();
        } catch (error) {
            toast.error('Gagal upload gambar');
            console.error(error);
        } finally {
            setUploading(false);
            setCropMode(false);
            setImageToCrop(null);
            setOriginalFile(null);
        }
    };

    const handleCropCancel = () => {
        setCropMode(false);
        setImageToCrop(null);
        setOriginalFile(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
    };

    const handleSelect = () => {
        if (selectedMedia) {
            onSelect(getImageUrl(selectedMedia.path));
            onClose();
        }
    };

    if (!isOpen) return null;

    // Crop mode UI
    if (cropMode && imageToCrop) {
        return (
            <div className="fixed inset-0 bg-black/90 flex flex-col z-[60]">
                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-slate-900 text-white">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <MdCrop size={24} /> Crop Gambar
                    </h2>
                    <button onClick={handleCropCancel}><MdClose size={24} /></button>
                </div>

                {/* Cropper */}
                <div className="flex-1 relative">
                    <Cropper
                        image={imageToCrop}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspectRatio}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>

                {/* Controls */}
                <div className="p-4 bg-slate-900">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-white text-sm">Zoom:</span>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(parseFloat(e.target.value))}
                            className="flex-1"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={handleCropCancel}
                            className="flex-1 py-3 border border-slate-600 text-white hover:bg-slate-800"
                        >
                            Batal
                        </button>
                        <button 
                            onClick={handleCropConfirm}
                            disabled={uploading}
                            className="flex-1 py-3 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {uploading ? 'Uploading...' : <><MdCheck size={20} /> Simpan & Upload</>}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Normal picker UI
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-slate-200">
                    <h2 className="text-lg font-bold">Pilih Gambar</h2>
                    <button onClick={onClose}><MdClose size={24} /></button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-200">
                    <button 
                        onClick={() => setActiveTab('library')}
                        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 -mb-px ${activeTab === 'library' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
                    >
                        <MdPhotoLibrary size={18} /> Library
                    </button>
                    <button 
                        onClick={() => setActiveTab('upload')}
                        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 -mb-px ${activeTab === 'upload' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
                    >
                        <MdUpload size={18} /> Upload Baru
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-4">
                    {activeTab === 'library' ? (
                        <div>
                            {loading ? (
                                <div className="text-center py-12 text-slate-500">Loading...</div>
                            ) : media.length === 0 ? (
                                <div className="text-center py-12 text-slate-500">
                                    Belum ada media. Upload gambar terlebih dahulu.
                                </div>
                            ) : (
                                <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                                    {media.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setSelectedMedia(item)}
                                            className={`relative aspect-square border-2 overflow-hidden ${selectedMedia?.id === item.id ? 'border-blue-600 ring-2 ring-blue-200' : 'border-slate-200 hover:border-slate-300'}`}
                                        >
                                            <img src={getImageUrl(item.path)} alt={item.alt} className="w-full h-full object-cover" />
                                            {selectedMedia?.id === item.id && (
                                                <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                                                    <div className="bg-blue-600 text-white p-1 rounded-full">
                                                        <MdCheck size={20} />
                                                    </div>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                            <label className="flex flex-col items-center justify-center w-full max-w-sm h-48 border-2 border-dashed border-slate-300 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                                <MdUpload size={48} className="text-slate-400 mb-2" />
                                <span className="text-slate-600">Klik untuk pilih gambar</span>
                                <span className="text-sm text-slate-400 mt-1">PNG, JPG, GIF, WEBP (max 10MB)</span>
                                <span className="text-xs text-blue-500 mt-2">Akan di-convert ke WebP & dikompres</span>
                                <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                            </label>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {activeTab === 'library' && (
                    <div className="flex justify-between items-center p-4 border-t border-slate-200 bg-slate-50">
                        <div className="text-sm text-slate-500">
                            {selectedMedia ? `Dipilih: ${selectedMedia.alt || selectedMedia.filename}` : 'Pilih gambar dari library'}
                        </div>
                        <div className="flex gap-3">
                            <button onClick={onClose} className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100">
                                Batal
                            </button>
                            <button 
                                onClick={handleSelect} 
                                disabled={!selectedMedia}
                                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Pilih Gambar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MediaPicker;
