import { Route } from 'react-router-dom';
import Auth from '../pages/Auth';

const PublicRoutes = () => {
  return <Route path="/login" element={<Auth />} />;
};

export default PublicRoutes;


