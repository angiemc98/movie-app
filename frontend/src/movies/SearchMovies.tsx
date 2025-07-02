// src/movies/SearchMovies.tsx
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function SearchMovies() {
  const { token } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3000/movies/search', {
        params: { title: query },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(response.data.movies || []);
      setError('');
    } catch {
      setError('Error fetching movies');
      setResults([]);
    }
  };

  const addFavorite = async (imdbID: string) => {
    try {
      await axios.post(
        'http://localhost:3000/movies/favorites',
        { imdbID },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Added to favorites!');
    } catch {
      alert('Error adding favorite');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search Movies</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter movie title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow border rounded p-2"
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {results.map((movie) => (
          <li key={movie.imdbID} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{movie.Title} ({movie.Year})</h3>
            <img src={movie.Poster} alt={movie.Title} className="w-24 mt-2" />
            <button
              onClick={() => addFavorite(movie.imdbID)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
            >
              Add to Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
