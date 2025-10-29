import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import PrivateLayout from '../components/PrivateLayout';
import Empresas from '../pages/Empresas';
import Productos from '../pages/Productos';

const PrivateRoutes = () => {
  return (
    <Route
      element={
        <ProtectedRoute>
          <PrivateLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/empresas" element={<Empresas />} />
      <Route path="/empresas/:idEmpresa/productos" element={<Productos />} />
    </Route>
  );
};

export default PrivateRoutes;


