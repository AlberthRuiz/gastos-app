import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/userAuth';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-gray-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Finanzas Personales
          </Link>
          
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-gray-200 transition">
              Dashboard
            </Link>
            <Link to="/income" className="hover:text-gray-200 transition">
              Ingresos
            </Link>
            <Link to="/expenses" className="hover:text-gray-200 transition">
              Gastos
            </Link>
            <Link to="/categories" className="hover:text-gray-200 transition">
              Categorías
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline">Hola, {user?.displayName || user?.email}</span>
            <button 
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};