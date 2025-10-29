const Modal = ({ open, title, children, onClose, footer }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>✕</button>
        </div>
        <div className="px-5 py-4">{children}</div>
        <div className="px-5 py-4 border-t bg-gray-50 rounded-b-xl flex justify-end gap-2">
          {footer}
        </div>
      </div>
    </div>
  );
};

export default Modal;


