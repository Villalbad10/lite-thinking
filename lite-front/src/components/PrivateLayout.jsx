import { Outlet } from 'react-router-dom';
import Header from './Header';

const PrivateLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;


