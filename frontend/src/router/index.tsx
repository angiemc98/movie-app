import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import SearchMovies from '../movies/SearchMovies';
import FavoriteMovies from '../movies/FavoriteMovies';
import ProtectedRoute from './ProtectedRoute';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SearchMovies />
            </ProtectedRoute>
          }
        />
       <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <FavoriteMovies />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}
