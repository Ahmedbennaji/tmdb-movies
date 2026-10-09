import type { Movie } from "@/api/types";


export const SORT_OPTIONS = [
  { value: "popularity", label: "Popularity" },
  { value: "rating", label: "Rating" },
  { value: "release", label: "Release date" },
  { value: "title", label: "Title (A–Z)" },
] as const;

export type SortKey = (typeof SORT_OPTIONS)[number]["value"];


function compareReleaseDesc(a: Movie, b: Movie): number {
  if (!a.release_date && !b.release_date) return 0;
  if (!a.release_date) return 1;
  if (!b.release_date) return -1;
  return b.release_date.localeCompare(a.release_date);
}


export function sortMovies(movies: Movie[], key: SortKey): Movie[] {
  const sorted = [...movies];
  switch (key) {
    case "rating":
      return sorted.sort((a, b) => b.vote_average - a.vote_average);
    case "popularity":
      return sorted.sort((a, b) => b.popularity - a.popularity);
    case "release":
      return sorted.sort(compareReleaseDesc);
    case "title":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
  }
}
