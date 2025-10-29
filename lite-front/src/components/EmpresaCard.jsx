import useAuthStore from '../store/authStore';

const EmpresaCard = ({ empresa, onEdit, onDelete }) => {
  const id = empresa.id || empresa._id || empresa.ruc;
  const nombre = empresa.nombre || empresa.name || 'Empresa';
  const identificador = empresa.ruc || empresa.identificador || empresa.codigo;
  const user = useAuthStore((s) => s.user);

  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
      <div>
        <div className="font-semibold">{nombre} - {empresa.nit}</div>
        {identificador ? (
          <div className="text-sm text-gray-500">{identificador}</div>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700">Ver</button>
        {user?.admin === true ? (
          <>
            <button
              className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
              onClick={() => onEdit?.(empresa)}
            >
              Editar
            </button>
            <button
              className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
              onClick={() => onDelete?.(empresa)}
            >
              Eliminar
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default EmpresaCard;


