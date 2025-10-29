import Modal from './Modal';

const ConfirmModal = ({ 
  open, 
  title = 'Confirmar', 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = 'Confirmar', 
  cancelText = 'Cancelar', 
  variant = 'default' 
}) => {
  const isDanger = variant === 'danger';

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      footer={
        <>
          <button
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm font-medium"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className={`px-4 py-2 rounded text-white text-sm font-medium ${
              isDanger
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </>
      }
    >
      <div className="py-2">
        <p className="text-gray-700">{message}</p>
      </div>
    </Modal>
  );
};

export default ConfirmModal;

