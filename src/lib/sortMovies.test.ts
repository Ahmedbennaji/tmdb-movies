import { describe, it, expect } from "vitest";
import { sortMovies } from "./sortMovies";
import type { Movie } from "@/api/types";

function movie(overrides: Partial<Movie>): Movie {
  return {
    id: 0,
    title: "",
    poster_path: null,
    overview: "",
    vote_average: 0,
    vote_count: 0,
    popularity: 0,
    release_date: "",
    genre_ids: [],
    ...overrides,
  };
}

describe("sortMovies", () => {
  it("sorts by rating, highest first", () => {
    const movies = [
      movie({ id: 1, vote_average: 6.2 }),
      movie({ id: 2, vote_average: 8.9 }),
      movie({ id: 3, vote_average: 7.1 }),
    ];
    expect(sortMovies(movies, "rating").map((m) => m.id)).toEqual([2, 3, 1]);
  });

  it("sorts by popularity, highest first", () => {
    const movies = [
      movie({ id: 1, popularity: 10 }),
      movie({ id: 2, popularity: 100 }),
      movie({ id: 3, popularity: 50 }),
    ];
    expect(sortMovies(movies, "popularity").map((m) => m.id)).toEqual([2, 3, 1]);
  });

  it("sorts by title alphabetically (A–Z)", () => {
    const movies = [
      movie({ id: 1, title: "Zodiac" }),
      movie({ id: 2, title: "Arrival" }),
      movie({ id: 3, title: "Memento" }),
    ];
    expect(sortMovies(movies, "title").map((m) => m.id)).toEqual([2, 3, 1]);
  });

  it("sorts by release date, newest first, with missing dates last", () => {
    const movies = [
      movie({ id: 1, release_date: "2010-07-16" }),
      movie({ id: 2, release_date: "" }),
      movie({ id: 3, release_date: "2023-01-01" }),
    ];
    expect(sortMovies(movies, "release").map((m) => m.id)).toEqual([3, 1, 2]);
  });

  it("does not mutate the input array", () => {
    const movies = [
      movie({ id: 1, vote_average: 1 }),
      movie({ id: 2, vote_average: 9 }),
    ];
    const original = [...movies];
    sortMovies(movies, "rating");
    expect(movies).toEqual(original);
  });
});
