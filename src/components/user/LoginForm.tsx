import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../hooks/userAuth";


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      setError('');
      await loginWithGoogle();
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/17781649/pexels-photo-17781649/free-photo-of-man-looking-at-the-stock-charts-on-the-phone-and-tablet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Bienvenido
          </h2>
          <p className="text-center text-gray-600 text-sm">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-700 font-bold"
            >
              Regístrate
            </Link>
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <span className="text-xs text-center text-gray-500 uppercase">
              o inicia sesión con correo
            </span>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Correo Electrónico
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Contraseña
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs italic mt-4">{error}</p>
            )}
            <div className="mt-8">
              <button
                type="submit"
                className="bg-gray-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 w-full transition"
              >
                Iniciar Sesión
              </button>
            </div>
            <div className="mt-4">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 w-full rounded hover:bg-gray-100"
              >
                <i className="fa-brands fa-google"></i>
                <h2 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
                  Iniciar sesión con Google
                </h2>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
