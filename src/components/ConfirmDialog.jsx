import { MdClose, MdWarning } from 'react-icons/md';

const ConfirmDialog = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = 'Konfirmasi', 
    message = 'Apakah Anda yakin?',
    confirmText = 'Ya, Lanjutkan',
    cancelText = 'Batal',
    type = 'warning' // 'warning' | 'danger' | 'info'
}) => {
    if (!isOpen) return null;

    const colors = {
        warning: { bg: 'bg-yellow-100', icon: 'text-yellow-600', btn: 'bg-yellow-600 hover:bg-yellow-700' },
        danger: { bg: 'bg-red-100', icon: 'text-red-600', btn: 'bg-red-600 hover:bg-red-700' },
        info: { bg: 'bg-blue-100', icon: 'text-blue-600', btn: 'bg-blue-600 hover:bg-blue-700' }
    };

    const color = colors[type] || colors.warning;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
            <div className="bg-white w-full max-w-sm animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-start p-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${color.bg}`}>
                            <MdWarning size={20} className={color.icon} />
                        </div>
                        <h3 className="font-bold text-slate-900">{title}</h3>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <MdClose size={20} />
                    </button>
                </div>
                <div className="p-4">
                    <p className="text-slate-600">{message}</p>
                </div>
                <div className="flex gap-3 p-4 border-t border-slate-200 bg-slate-50">
                    <button 
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button 
                        onClick={handleConfirm}
                        className={`flex-1 px-4 py-2 text-white transition-colors ${color.btn}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
