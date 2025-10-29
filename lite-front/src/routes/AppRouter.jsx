import { Routes, Route, Navigate } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

const AppRouter = () => {
  return (
    <Routes>
      {PublicRoutes()}
      {PrivateRoutes()}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;


