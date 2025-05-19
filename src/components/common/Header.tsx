import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/userAuth';
import { useState } from 'react';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Finanzas Personales
          </Link>
          
          {/* Menú para pantallas medianas y grandes */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-gray-300 transition">
              Dashboard
            </Link>
            <Link to="/income" className="hover:text-gray-300 transition">
              Ingresos
            </Link>
            <Link to="/expenses" className="hover:text-gray-300 transition">
              Gastos
            </Link>
            <Link to="/categories" className="hover:text-gray-300 transition">
              Categorías
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline">Hola, {user?.displayName || user?.email}</span>
            <button 
              onClick={handleLogout}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition"
            >
              Cerrar Sesión
            </button>
            
            {/* Botón de menú hamburguesa para móviles */}
            <button 
              className="md:hidden flex items-center p-2 rounded hover:bg-gray-800"
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
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <nav className="block md:hidden bg-gray-900 py-3 px-4 rounded-b-lg shadow-md">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="hover:bg-gray-800 hover:text-white transition py-2 px-3 rounded"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
              <Link 
                to="/income" 
                className="hover:bg-gray-800 hover:text-white transition py-2 px-3 rounded"
                onClick={toggleMenu}
              >
                Ingresos
              </Link>
              <Link 
                to="/expenses" 
                className="hover:bg-gray-800 hover:text-white transition py-2 px-3 rounded"
                onClick={toggleMenu}
              >
                Gastos
              </Link>
              <Link 
                to="/categories" 
                className="hover:bg-gray-800 hover:text-white transition py-2 px-3 rounded"
                onClick={toggleMenu}
              >
                Categorías
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};