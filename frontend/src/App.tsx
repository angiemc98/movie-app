// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import SearchMovies from './movies/SearchMovies';
import FavoriteMovies from './movies/FavoriteMovies';
import ProtectedRoute from './router/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import PrivateLayouts from './layouts/PrivateLayouts';
import { Link } from 'react-router-dom';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <div>
        <Link to="/movies" className="mr-4 hover:underline">Buscar Películas</Link>
        {user && <Link to="/favorites" className="mr-4 hover:underline">Mis Favoritas</Link>}
      </div>
      <div>
        {user ? (
          <button onClick={logout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
            Cerrar sesión
          </button>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/movies" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas con layout que incluye el Header */}
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <PrivateLayouts>
                <SearchMovies />
              </PrivateLayouts>
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <PrivateLayouts>
                <FavoriteMovies />
              </PrivateLayouts>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div className="p-4">404 - Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}
