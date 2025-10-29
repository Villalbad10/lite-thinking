import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../config/axios';
import Paginator from '../components/Paginator';

const Productos = () => {
  const { idEmpresa } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState('idProducto,desc');
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const params = { page, size, sort, idEmpresa };
        const { data } = await http.get('/api/v1/lite/producto/list', { params });
        const items = Array.isArray(data) ? data : data?.items || data?.content || [];
        setProductos(items);
        const tp = data?.totalPages ?? data?.page?.totalPages ?? data?.total_pages ?? 1;
        const te = data?.totalElements ?? data?.page?.totalElements ?? data?.total ?? items.length;
        setTotalPages(tp || 1);
        setTotalElements(typeof te === 'number' ? te : items.length);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'No se pudo cargar los productos');
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, [idEmpresa, page, size, sort]);

  if (loading) return <div className="p-6">Cargando productos...</div>;
  if (error) return (
    <div className="p-6">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Productos</h1>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(0); }}
          >
            <option value="idProducto,desc">Recientes</option>
            <option value="idProducto,asc">Antiguos</option>
            <option value="nombre,asc">Nombre A-Z</option>
            <option value="nombre,desc">Nombre Z-A</option>
          </select>
        </div>

        {productos.length === 0 ? (
          <div className="text-gray-600">No hay productos para mostrar.</div>
        ) : (
          <div className="bg-white rounded-xl shadow divide-y">
            {productos.map((p) => (
              <div key={p.idProducto || p.id || p._id} className="p-4">
                <div className="font-semibold">{p.nombre || p.name || 'Producto'}</div>
              </div>
            ))}
          </div>
        )}

        <Paginator
          currentPage={page}
          pageSize={size}
          totalPages={totalPages}
          totalElements={totalElements}
          onPageChange={(p) => setPage(p)}
          onPageSizeChange={(s) => { setSize(s); setPage(0); }}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default Productos;


