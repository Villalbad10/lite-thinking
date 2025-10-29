import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Header = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur border-b sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-600" />
          <span className="font-semibold">Lite Thinking</span>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="text-sm text-gray-700">
              {user.fullName}
            </div>
          ) : null}
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-sm"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;


