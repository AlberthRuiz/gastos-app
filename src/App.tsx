import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuth } from "./hooks/userAuth";
import Spinner from "./components/common/Spinner";
import Home from "./pages/Home";
import { RequireAuth } from "./context/AuthContext";
import Categories from "./pages/Categories";
import { DashboardPage } from "./pages/Dashboard";
import { Expenses } from "./pages/Expenses";
import { Income } from "./pages/Income";

function App() {
  const { user, loading } = useAuth();
  if (loading) {
    return <Spinner />;
  }
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <DashboardPage/> : <Home />}
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
      <Route
          path="/expenses"
          element={
            <RequireAuth>
              <Expenses />
            </RequireAuth>
          }
        />
         <Route
          path="/income"
          element={
            <RequireAuth>
              <Income />
            </RequireAuth>
          }
        />
    </Routes>
  );
}

export default App;
