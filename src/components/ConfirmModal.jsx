import PropTypes from 'prop-types';
import { MdClose, MdWarning } from 'react-icons/md';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText, variant }) => {
    if (!isOpen) return null;

    const variants = {
        danger: {
            icon: 'text-red-500',
            button: 'bg-red-600 hover:bg-red-700'
        },
        warning: {
            icon: 'text-yellow-500',
            button: 'bg-yellow-600 hover:bg-yellow-700'
        },
        info: {
            icon: 'text-blue-500',
            button: 'bg-blue-600 hover:bg-blue-700'
        }
    };

    const currentVariant = variants[variant] || variants.danger;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-slate-200">
                    <h3 className="font-bold text-lg text-slate-900">{title || 'Konfirmasi'}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <MdClose size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className={`p-3 bg-slate-100 rounded-full ${currentVariant.icon}`}>
                            <MdWarning size={24} />
                        </div>
                        <div>
                            <p className="text-slate-700">
                                {message || 'Apakah Anda yakin ingin melanjutkan?'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-4 border-t border-slate-200 bg-slate-50">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                        {cancelText || 'Batal'}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`flex-1 px-4 py-2 text-white transition-colors ${currentVariant.button}`}
                    >
                        {confirmText || 'Ya, Lanjutkan'}
                    </button>
                </div>
            </div>
        </div>
    );
};

ConfirmModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    variant: PropTypes.oneOf(['danger', 'warning', 'info'])
};

ConfirmModal.defaultProps = {
    variant: 'danger'
};

export default ConfirmModal;
