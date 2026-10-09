import { useMemo, useState } from "react";
import { ALL_GENRES, Controls } from "@/components/Controls";
import { MovieGrid } from "@/components/MovieGrid";
import { useGenres } from "@/hooks/useGenres";
import { useMovies } from "@/hooks/useMovies";
import { sortMovies, type SortKey } from "@/lib/sortMovies";

function App() {
  const [genreValue, setGenreValue] = useState<string>(ALL_GENRES);
  const [sortKey, setSortKey] = useState<SortKey>("popularity");

  const genreId = genreValue === ALL_GENRES ? undefined : Number(genreValue);

  const { genres } = useGenres();
  const { movies, isLoading, error, retry } = useMovies(genreId);


  const sortedMovies = useMemo(
    () => sortMovies(movies, sortKey),
    [movies, sortKey],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Discover Movies
          </h1>
          <p className="text-sm text-muted-foreground">
            Browse popular films from TMDB.
          </p>
        </div>
        <Controls
          genres={genres}
          genreValue={genreValue}
          onGenreChange={setGenreValue}
          sortKey={sortKey}
          onSortChange={setSortKey}
        />
      </header>

      <MovieGrid
        movies={sortedMovies}
        isLoading={isLoading}
        error={error}
        onRetry={retry}
      />
    </div>
  );
}

export default App;
