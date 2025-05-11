import { Link } from "react-router";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900">Finanzas Personales</h1>
          <div className="space-x-4">
            <Link 
              to="/login" 
              className="text-gray-700 hover:text-gray-900 transition"
            >
              Iniciar Sesión
            </Link>
            <Link 
              to="/register" 
              className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Registrarse
            </Link>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 text-gray-900">
            Toma el control de tus finanzas personales
          </h2>
          <p className="text-xl mb-12 text-gray-600">
            Administra tus ingresos y gastos de manera simple y efectiva. 
            Visualiza tu balance mensual y alcanza tus metas financieras.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-4xl mb-4"><i className="fa-solid fa-money-bills"></i></div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Control de Ingresos</h3>
              <p className="text-gray-600">
                Registra todos tus ingresos y mantenlos organizados por categorías
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-4xl mb-4"><i className="fa-solid fa-chart-simple"></i></div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Análisis de Gastos</h3>
              <p className="text-gray-600">
                Identifica en qué gastas tu dinero y optimiza tu presupuesto
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-4xl mb-4"><i className="fa-solid fa-scale-balanced"></i></div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Balance Mensual</h3>
              <p className="text-gray-600">
                Visualiza tu balance mes a mes y toma mejores decisiones financieras
              </p>
            </div>
          </div>

          <div className="space-x-4">
            <Link 
              to="/register" 
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition"
            >
              Comenzar
            </Link>
            <Link 
              to="/login" 
              className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-900 hover:text-white transition"
            >
              Ya tengo cuenta
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-24">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Características principales
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1 text-gray-900">Categorías personalizadas</h4>
                <p className="text-gray-600">Organiza tus transacciones como prefieras</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1 text-gray-900">Análisis mensual</h4>
                <p className="text-gray-600">Revisa tu progreso financiero mes a mes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;