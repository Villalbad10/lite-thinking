const formatCurrency = (value) => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '-';
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(Number(value));
  } catch (_) {
    return `${value}`;
  }
};

const ProductoCard = ({ producto }) => {
  const id = producto.idProducto ;
  const codigo = producto.codigo || '-';
  const nombre = producto.nombre;
  const descripcion = producto.descripcion;
  const precio = producto.precio;
  const stock = producto.stock;

  return (
    <div className="p-4 flex items-start justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <div className="font-semibold text-slate-900 truncate">{nombre}</div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{codigo}</span>
        </div>
        {descripcion ? (
          <div className="text-sm text-gray-600 mt-1 break-words">{descripcion}</div>
        ) : null}
        <div className="text-sm text-gray-500 mt-2">ID: {id}</div>
      </div>
      <div className="flex flex-col items-end gap-1 ml-4">
        <div className="text-base font-semibold text-emerald-700">{formatCurrency(precio)}</div>
        <div className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">Stock: {Number.isFinite(Number(stock)) ? Number(stock) : '-'}</div>
      </div>
    </div>
  );
};

export default ProductoCard;


