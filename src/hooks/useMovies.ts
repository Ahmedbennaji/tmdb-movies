import { useCallback, useEffect, useState } from "react";
import { discoverMovies, TmdbError } from "@/api/tmdb";
import type { Movie } from "@/api/types";

export interface UseMoviesResult {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}


export function useMovies(genreId?: number): UseMoviesResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const retry = useCallback(() => setReloadToken((token) => token + 1), []);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError(null);

    discoverMovies({ genreId })
      .then((result) => {
        if (active) setMovies(result);
      })
      .catch((err) => {
        if (!active) return;
        setMovies([]);
        setError(
          err instanceof TmdbError
            ? err.message
            : "Something went wrong while loading movies.",
        );
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [genreId, reloadToken]);

  return { movies, isLoading, error, retry };
}
