import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import http from '../config/axios';
import Paginator from '../components/Paginator';
import EmpresaCard from '../components/EmpresaCard';
import EmpresaCreateModal from '../components/EmpresaCreateModal';
import ConfirmModal from '../components/ConfirmModal';
import AlertModal from '../components/AlertModal';
import useAuthStore from '../store/authStore';

const Empresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState('idEmpresa,desc');
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [editEmpresa, setEditEmpresa] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        setLoading(true);
        const params = { page, size, sort };
        const { data } = await http.get('/api/v1/lite/empresa/list', { params });
        const items = data?.content || [];
        setEmpresas(items);
        setTotalPages(data?.totalPages ?? 0);
        setTotalElements(data?.totalElements ?? 0);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'No se pudo cargar las empresas');
        setEmpresas([]);
        setTotalPages(0);
        setTotalElements(0);
      } finally {
        setLoading(false);
      }
    };
    fetchEmpresas();
  }, [page, size, sort, reloadKey]);

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
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Empresas</h1>
          <div className="flex items-center gap-2">
            <select
              className="border rounded px-2 py-1 text-sm"
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(0); }}
            >
              <option value="idEmpresa,desc">Recientes</option>
              <option value="idEmpresa,asc">Antiguas</option>
              <option value="nombre,asc">Nombre A-Z</option>
              <option value="nombre,desc">Nombre Z-A</option>
            </select>
            {user?.admin === true ? (
              <button
                className="px-3 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                onClick={() => setShowCreate(true)}
              >
                Agregar empresa
              </button>
            ) : null}
          </div>
        </div>

        {empresas.length === 0 ? (
          <div className="text-gray-600">No hay empresas para mostrar.</div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {empresas.map((empresa) => (
              <EmpresaCard
                key={empresa.idEmpresa}
                empresa={empresa}
                onEdit={(emp) => setEditEmpresa(emp)}
                onDelete={(emp) => {
                  const name = emp.nombre || emp.name || emp.razonSocial || '';
                  setDeleteConfirm({
                    empresa: emp,
                    message: `¿Seguro que deseas eliminar la empresa "${name}"? Esta acción no se puede deshacer.`,
                  });
                }}
              />
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
      <EmpresaCreateModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={() => {
          setShowCreate(false);
          setPage(0);
          setReloadKey((k) => k + 1);
          toast.success('Empresa creada exitosamente');
        }}
      />
      <EmpresaCreateModal
        open={Boolean(editEmpresa)}
        empresa={editEmpresa || undefined}
        onClose={() => setEditEmpresa(null)}
        onUpdated={() => {
          setEditEmpresa(null);
          setReloadKey((k) => k + 1);
          toast.success('Empresa actualizada exitosamente');
        }}
      />
      <ConfirmModal
        open={Boolean(deleteConfirm)}
        title="Eliminar empresa"
        message={deleteConfirm?.message || ''}
        variant="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={async () => {
          if (!deleteConfirm) return;
          try {
            const id = deleteConfirm.empresa.idEmpresa || deleteConfirm.empresa.id || deleteConfirm.empresa._id;
            await http.delete(`/api/v1/lite/empresa/delete/${id}`);
            setDeleteConfirm(null);
            setReloadKey((k) => k + 1);
            toast.success('Empresa eliminada exitosamente');
          } catch (e) {
            toast.error(e.response?.data?.message || 'No se pudo eliminar la empresa');
            setDeleteConfirm(null);
          }
        }}
        onCancel={() => setDeleteConfirm(null)}
      />
      <AlertModal
        open={Boolean(alertMessage)}
        title={alertMessage?.title || 'Alerta'}
        message={alertMessage?.message || ''}
        variant={alertMessage?.variant || 'error'}
        onClose={() => setAlertMessage(null)}
      />
    </div>
  );
};

export default Empresas;


