import { useEffect, useState } from 'react';
import Modal from './Modal';
import http from '../config/axios';

const EmpresaCreateModal = ({ open, onClose, onCreated, onUpdated, empresa }) => {
  const [form, setForm] = useState({ nit: '', nombre: '', direccion: '', telefono: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const isEdit = Boolean(empresa);

  useEffect(() => {
    if (open) {
      if (empresa) {
        setForm({
          nit: empresa.nit || empresa.NIT || empresa.nitEmpresa || '',
          nombre: empresa.nombre || empresa.name || '',
          direccion: empresa.direccion || empresa.address || '',
          telefono: empresa.telefono || empresa.phone || '',
        });
        setErrors({});
      } else {
        setForm({ nit: '', nombre: '', direccion: '', telefono: '' });
        setErrors({});
      }
    }
  }, [open, empresa]);

  const validate = () => {
    const e = {};
    if (!form.nit) e.nit = 'NIT es requerido';
    if (!form.nombre) e.nombre = 'Nombre es requerido';
    if (!form.direccion) e.direccion = 'Dirección es requerida';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      setSubmitting(true);
      const payload = {
        nit: form.nit,
        nombre: form.nombre,
        direccion: form.direccion,
        telefono: form.telefono,
      };
      if (!isEdit) {
        const { data } = await http.post('/api/v1/lite/empresa/save', payload);
        onCreated?.(data);
        setForm({ nit: '', nombre: '', direccion: '', telefono: '' });
        onClose?.();
      } else {
        const id = empresa.idEmpresa || empresa.id || empresa._id;
        const { data } = await http.put(`/api/v1/lite/empresa/update/${id}`, payload);
        onUpdated?.(data);
        onClose?.();
      }
    } catch (err) {
      const apiMsg = err.response?.data?.message || 'No se pudo crear la empresa';
      setErrors((prev) => ({ ...prev, submit: apiMsg }));
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Editar empresa' : 'Nueva empresa'}
      footer={
        <>
          <button className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200" onClick={onClose} disabled={submitting}>Cancelar</button>
          <button className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Guardando...' : 'Guardar'}
          </button>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {errors.submit ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded">{errors.submit}</div>
        ) : null}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">NIT</label>
          <input name="nit" value={form.nit} onChange={handleChange} className={`w-full border rounded px-3 py-2 ${errors.nit ? 'border-red-500' : 'border-gray-300'}`} placeholder="NIT" />
          {errors.nit ? <p className="text-sm text-red-600 mt-1">{errors.nit}</p> : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la empresa</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} className={`w-full border rounded px-3 py-2 ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`} placeholder="Nombre" />
          {errors.nombre ? <p className="text-sm text-red-600 mt-1">{errors.nombre}</p> : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
          <input name="direccion" value={form.direccion} onChange={handleChange} className={`w-full border rounded px-3 py-2 ${errors.direccion ? 'border-red-500' : 'border-gray-300'}`} placeholder="Dirección" />
          {errors.direccion ? <p className="text-sm text-red-600 mt-1">{errors.direccion}</p> : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input name="telefono" value={form.telefono} onChange={handleChange} className={`w-full border rounded px-3 py-2 ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`} placeholder="Teléfono" />
          {errors.telefono ? <p className="text-sm text-red-600 mt-1">{errors.telefono}</p> : null}
        </div>
        <button type="submit" className="hidden" />
      </form>
    </Modal>
  );
};

export default EmpresaCreateModal;


