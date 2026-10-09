import { useEffect, useState } from "react";
import { getGenres } from "@/api/tmdb";
import type { Genre } from "@/api/types";

export interface UseGenresResult {
  genres: Genre[];
  isLoading: boolean;
  error: string | null;
}


export function useGenres(): UseGenresResult {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    getGenres()
      .then((result) => {
        if (active) setGenres(result);
      })
      .catch(() => {
        if (active) setError("Could not load genres.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { genres, isLoading, error };
}
