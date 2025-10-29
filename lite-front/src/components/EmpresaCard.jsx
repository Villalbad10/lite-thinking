import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const EmpresaCard = ({ empresa, onEdit, onDelete }) => {
  const id = empresa.idEmpresa;
  const nombre = empresa.nombre || empresa.name || 'Empresa';
  const identificador = empresa.ruc || empresa.identificador || empresa.codigo;
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50" onClick={() => navigate(`/empresas/${id}/productos`)}>
      <div>
        <div className="font-semibold">{nombre} - {empresa.nit}</div>
        {identificador ? (
          <div className="text-sm text-gray-500">{identificador}</div>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        {user?.admin === true ? (
          <>
            <button
              className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
              onClick={(e) => { e.stopPropagation(); onEdit?.(empresa); }}
            >
              Editar
            </button>
            <button
              className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
              onClick={(e) => { e.stopPropagation(); onDelete?.(empresa); }}
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


