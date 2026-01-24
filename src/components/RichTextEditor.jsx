import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import MediaPicker from './MediaPicker';

const RichTextEditor = ({ value, onChange, placeholder = 'Tulis konten di sini...' }) => {
    const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
    const [quillInstance, setQuillInstance] = useState(null);
    const [selectedImageSrc, setSelectedImageSrc] = useState(null);
    const [imageSize, setImageSize] = useState({ width: '', height: '' });
    const [showResizeModal, setShowResizeModal] = useState(false);

    const handleImageSelect = (imagePath) => {
        if (quillInstance) {
            const editor = quillInstance.getEditor();
            const range = editor.getSelection(true);
            editor.insertEmbed(range.index, 'image', imagePath);
            editor.setSelection(range.index + 1);
        }
    };

    // Event delegation - detect clicks on images inside editor container
    const handleContainerClick = (e) => {
        const target = e.target;
        // Check if clicked element is an image inside the editor
        if (target.tagName === 'IMG' && target.closest('.ql-editor')) {
            e.preventDefault();
            e.stopPropagation();
            setSelectedImageSrc(target.src);
            setImageSize({ 
                width: target.style.width || '100%',
                height: target.style.height || 'auto'
            });
            setShowResizeModal(true);
        }
    };

    const applyImageSize = () => {
        if (selectedImageSrc && quillInstance) {
            const editor = quillInstance.getEditor();
            const editorRoot = editor.root;
            
            // Find the image by src and update its style
            const images = editorRoot.querySelectorAll('img');
            images.forEach(img => {
                if (img.src === selectedImageSrc) {
                    img.style.width = imageSize.width;
                    img.style.height = imageSize.height === 'auto' ? 'auto' : imageSize.height;
                }
            });
            
            // Trigger onChange with updated HTML
            const html = editorRoot.innerHTML;
            onChange(html);
        }
        setShowResizeModal(false);
        setSelectedImageSrc(null);
    };

    const setPresetSize = (width) => {
        setImageSize({ width: width, height: 'auto' });
    };

    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['link', 'image'],
                ['blockquote', 'code-block'],
                ['clean']
            ],
            handlers: {
                image: () => setMediaPickerOpen(true)
            }
        },
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list',
        'align',
        'link', 'image',
        'blockquote', 'code-block'
    ];

    return (
        <div className="rich-text-editor" onClick={handleContainerClick}>
            <style>{`
                .rich-text-editor .ql-container {
                    min-height: 200px;
                    font-size: 16px;
                }
                .rich-text-editor .ql-editor {
                    min-height: 200px;
                }
                .rich-text-editor .ql-editor img {
                    max-width: 100%;
                    cursor: pointer;
                    transition: outline 0.2s;
                }
                .rich-text-editor .ql-editor img:hover {
                    outline: 3px solid #3b82f6;
                }
                .rich-text-editor .ql-toolbar {
                    background: #f8fafc;
                    border-color: #e2e8f0;
                }
                .rich-text-editor .ql-container {
                    border-color: #e2e8f0;
                }
            `}</style>

            <p className="text-xs text-slate-500 mb-1">💡 Klik gambar di editor untuk mengatur ukurannya</p>
            
            <ReactQuill
                ref={(el) => el && setQuillInstance(el)}
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
            />

            <MediaPicker
                isOpen={mediaPickerOpen}
                onClose={() => setMediaPickerOpen(false)}
                onSelect={handleImageSelect}
            />

            {/* Image Resize Modal */}
            {showResizeModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]" onClick={(e) => { e.stopPropagation(); setShowResizeModal(false); }}>
                    <div className="bg-white p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-bold mb-4">Atur Ukuran Gambar</h3>
                        
                        {selectedImageSrc && (
                            <div className="mb-4 p-2 bg-slate-100 text-center">
                                <img src={selectedImageSrc} alt="" className="max-h-24 mx-auto" />
                            </div>
                        )}
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Ukuran Preset:</label>
                            <div className="flex gap-2 flex-wrap">
                                <button type="button" onClick={() => setPresetSize('100%')} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-sm">100%</button>
                                <button type="button" onClick={() => setPresetSize('75%')} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-sm">75%</button>
                                <button type="button" onClick={() => setPresetSize('50%')} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-sm">50%</button>
                                <button type="button" onClick={() => setPresetSize('25%')} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-sm">25%</button>
                                <button type="button" onClick={() => setPresetSize('300px')} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-sm">300px</button>
                                <button type="button" onClick={() => setPresetSize('500px')} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-sm">500px</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Lebar:</label>
                                <input 
                                    type="text" 
                                    value={imageSize.width} 
                                    onChange={(e) => setImageSize({...imageSize, width: e.target.value})}
                                    placeholder="contoh: 300px, 50%"
                                    className="w-full px-3 py-2 border border-slate-300 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Tinggi:</label>
                                <input 
                                    type="text" 
                                    value={imageSize.height} 
                                    onChange={(e) => setImageSize({...imageSize, height: e.target.value})}
                                    placeholder="auto"
                                    className="w-full px-3 py-2 border border-slate-300 text-sm"
                                />
                            </div>
                        </div>

                        <p className="text-xs text-slate-500 mb-4">Tips: Gunakan "auto" untuk tinggi agar proporsional</p>

                        <div className="flex gap-3">
                            <button type="button" onClick={() => setShowResizeModal(false)} className="flex-1 py-2 border border-slate-300 hover:bg-slate-50">Batal</button>
                            <button type="button" onClick={applyImageSize} className="flex-1 py-2 bg-blue-600 text-white hover:bg-blue-700">Terapkan</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RichTextEditor;
