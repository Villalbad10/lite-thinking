const EmpresaCard = ({ empresa }) => {
  const id = empresa.id || empresa._id || empresa.ruc;
  const nombre = empresa.nombre || empresa.name || 'Empresa';
  const identificador = empresa.ruc || empresa.identificador || empresa.codigo;

  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
      <div>
        <div className="font-semibold">{nombre}</div>
        {identificador ? (
          <div className="text-sm text-gray-500">{identificador}</div>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700">Ver</button>
      </div>
    </div>
  );
};

export default EmpresaCard;


