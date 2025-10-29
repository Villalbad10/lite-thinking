import { useEffect, useState } from 'react';
import http from '../config/axios';

const Empresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState('idEmpresa,desc');

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        setLoading(true);
        const params = {
          page,
          size,
          sort,
        };
        const { data } = await http.get('/api/v1/lite/empresa/list', { params });
        setEmpresas(Array.isArray(data) ? data : data?.items || data?.content || []);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'No se pudo cargar las empresas');
        setEmpresas([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEmpresas();
  }, [page, size, sort]);

  if (loading) {
    return <div className="p-6">Cargando empresas...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Empresas</h1>
        {empresas.length === 0 ? (
          <div className="text-gray-600">No hay empresas para mostrar.</div>
        ) : (
          <div className="bg-white rounded-xl shadow divide-y">
            {empresas.map((e) => (
              <div key={e.id || e._id || e.ruc || Math.random()} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{e.nombre || e.name || 'Empresa'}</div>
                  {e.ruc || e.identificador ? (
                    <div className="text-sm text-gray-500">{e.ruc || e.identificador}</div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Empresas;


