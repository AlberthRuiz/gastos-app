import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuth } from "./hooks/userAuth";
import Spinner from "./components/common/Spinner";
import Home from "./pages/Home";
import { RequireAuth } from "./context/AuthContext";
import Categories from "./pages/Categories";

function App() {
  const { user, loading } = useAuth();
  if (loading) {
    return <Spinner />;
  }
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/categories" /> : <Home />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route
        path="/categories"
        element={
          <RequireAuth>
            <Categories />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
