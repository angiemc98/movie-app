// src/movies/FavoriteMovies.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

interface Movie {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
  plot: string;
}

export default function FavoriteMovies() {
  const { token } = useAuth();
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [error, setError] = useState('');

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:3000/movies/favorites', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(response.data);
      setError('');
    } catch {
      setError('Error fetching favorites');
    }
  };

  const removeFavorite = async (imdbID: string) => {
    try {
      await axios.delete(`http://localhost:3000/movies/favorites/${imdbID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites((prev) => prev.filter((m) => m.imdbID !== imdbID));
    } catch {
      alert('Error removing favorite');
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Favorite Movies</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {favorites.map((movie) => (
          <li key={movie.imdbID} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{movie.title} ({movie.year})</h3>
            <img src={movie.poster} alt={movie.title} className="w-24 mt-2" />
            <p className="mt-2 text-sm">{movie.plot}</p>
            <button
              onClick={() => removeFavorite(movie.imdbID)}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
