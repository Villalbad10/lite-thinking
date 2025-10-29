import { useState } from 'react';
import Modal from './Modal';
import http from '../config/axios';

const ProductoCreateModal = ({ open, onClose, onCreated, idEmpresa }) => {
  const [form, setForm] = useState({ 
    codigo: '', 
    nombre: '', 
    descripcion: '', 
    stock: '', 
    precio: '' 
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      setSubmitting(true);
      const payload = {
        codigo: form.codigo,
        nombre: form.nombre,
        descripcion: form.descripcion,
        stock: Number(form.stock),
        precio: Number(form.precio),
        empresaId: Number(idEmpresa),
      };
      const { data } = await http.post('/api/v1/lite/producto/save', payload);
      onCreated?.(data);
      setForm({ codigo: '', nombre: '', descripcion: '', stock: '', precio: '' });
      setErrors({});
      onClose?.();
    } catch (err) {
      const apiMsg = err.response?.data?.message || 'No se pudo crear el producto';
      setErrors((prev) => ({ ...prev, submit: apiMsg }));
    } finally {
      setSubmitting(false);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.codigo.trim()) e.codigo = 'Código es requerido';
    if (!form.nombre.trim()) e.nombre = 'Nombre es requerido';
    if (!form.descripcion.trim()) e.descripcion = 'Descripción es requerida';
    if (!form.stock) e.stock = 'Stock es requerido';
    else if (isNaN(form.stock) || Number(form.stock) < 0) e.stock = 'Stock debe ser un número válido mayor o igual a 0';
    if (!form.precio) e.precio = 'Precio es requerido';
    else if (isNaN(form.precio) || Number(form.precio) <= 0) e.precio = 'Precio debe ser un número válido mayor a 0';
    setErrors(e);
    return Object.keys(e).length === 0;
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
      title="Nuevo producto"
      footer={
        <>
          <button 
            className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200" 
            onClick={onClose} 
            disabled={submitting}
          >
            Cancelar
          </button>
          <button 
            className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400" 
            onClick={handleSubmit} 
            disabled={submitting}
          >
            {submitting ? 'Guardando...' : 'Guardar'}
          </button>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded">
            {errors.submit}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Código
          </label>
          <input
            name="codigo"
            value={form.codigo}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.codigo ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Código del producto"
          />
          {errors.codigo && (
            <p className="text-sm text-red-600 mt-1">{errors.codigo}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.nombre ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Nombre del producto"
          />
          {errors.nombre && (
            <p className="text-sm text-red-600 mt-1">{errors.nombre}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            rows={3}
            className={`w-full border rounded px-3 py-2 ${
              errors.descripcion ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Descripción del producto"
          />
          {errors.descripcion && (
            <p className="text-sm text-red-600 mt-1">{errors.descripcion}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            min="0"
            className={`w-full border rounded px-3 py-2 ${
              errors.stock ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0"
          />
          {errors.stock && (
            <p className="text-sm text-red-600 mt-1">{errors.stock}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={`w-full border rounded px-3 py-2 ${
              errors.precio ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0.00"
          />
          {errors.precio && (
            <p className="text-sm text-red-600 mt-1">{errors.precio}</p>
          )}
        </div>

        <button type="submit" className="hidden" />
      </form>
    </Modal>
  );
};

export default ProductoCreateModal;

