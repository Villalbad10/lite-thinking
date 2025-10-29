import Modal from './Modal';

const AlertModal = ({ 
  open, 
  title = 'Alerta', 
  message, 
  onClose, 
  variant = 'info' 
}) => {
  const variantStyles = {
    info: 'bg-blue-600 hover:bg-blue-700',
    success: 'bg-green-600 hover:bg-green-700',
    warning: 'bg-yellow-600 hover:bg-yellow-700',
    error: 'bg-red-600 hover:bg-red-700',
  };

  const iconColors = {
    info: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <button
          className={`px-4 py-2 rounded text-white text-sm font-medium ${variantStyles[variant] || variantStyles.info}`}
          onClick={onClose}
        >
          Aceptar
        </button>
      }
    >
      <div className="py-2">
        <p className="text-gray-700">{message}</p>
      </div>
    </Modal>
  );
};

export default AlertModal;

