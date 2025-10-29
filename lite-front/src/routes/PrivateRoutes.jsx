import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Empresas from '../components/Empresas';

const PrivateRoutes = () => {
  return (
    <Route
      path="/empresas"
      element={
        <ProtectedRoute>
          <Empresas />
        </ProtectedRoute>
      }
    />
  );
};

export default PrivateRoutes;


