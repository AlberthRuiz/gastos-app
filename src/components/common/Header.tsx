import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/userAuth';
import { useState, useEffect } from 'react';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-black text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-white">
              Finanzas<span className="block md:inline"> Personales</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-md transition ${
                isActive('/') 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/income" 
              className={`px-4 py-2 rounded-md transition ${
                isActive('/income') 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Ingresos
            </Link>
            <Link 
              to="/expenses" 
              className={`px-4 py-2 rounded-md transition ${
                isActive('/expenses') 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Gastos
            </Link>
            <Link 
              to="/categories" 
              className={`px-4 py-2 rounded-md transition ${
                isActive('/categories') 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Categorías
            </Link>
          </nav>

          <div className="flex items-center">
            <div className="hidden md:flex items-center mr-4">
              <span className="text-sm text-gray-300">
                Hola, {user?.displayName?.split(' ')[0] || user?.email?.split('@')[0]}
              </span>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition text-sm font-medium"
            >
              Cerrar Sesión
            </button>
            <button 
              className="md:hidden ml-3 flex items-center p-2 rounded hover:bg-gray-800"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen 
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden py-2 space-y-1 animate-fadeIn">
            <Link 
              to="/" 
              className={`block px-4 py-2 rounded-md text-base font-medium transition ${
                isActive('/') 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/income" 
              className={`block px-4 py-2 rounded-md text-base font-medium transition ${
                isActive('/income') 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Ingresos
            </Link>
            <Link 
              to="/expenses" 
              className={`block px-4 py-2 rounded-md text-base font-medium transition ${
                isActive('/expenses') 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Gastos
            </Link>
            <Link 
              to="/categories" 
              className={`block px-4 py-2 rounded-md text-base font-medium transition ${
                isActive('/categories') 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Categorías
            </Link>
            <div className="px-4 py-3 border-t border-gray-700 mt-2">
              <div className="text-sm text-gray-300">
                Sesión iniciada como:
              </div>
              <div className="text-base font-medium text-white truncate">
                {user?.displayName || user?.email}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};