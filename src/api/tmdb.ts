import { z } from "zod";
import {
  DiscoverResponseSchema,
  GenreListResponseSchema,
} from "./types";
import type { Genre, Movie } from "./types";


const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


export class TmdbError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, cause !== undefined ? { cause } : undefined);
    this.name = "TmdbError";
  }
}

function requireApiKey(): string {
  if (!API_KEY) {
    throw new TmdbError(
      "Missing VITE_TMDB_API_KEY. Copy .env.example to .env and add your TMDB key.",
    );
  }
  return API_KEY;
}

async function fetchJson<T>(
  path: string,
  params: Record<string, string>,
  schema: z.ZodType<T>,
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", requireApiKey());
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  let response: Response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new TmdbError("Network error while contacting TMDB.", error);
  }

  if (!response.ok) {
    throw new TmdbError(
      `TMDB request failed (${response.status} ${response.statusText}).`,
    );
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch (error) {
    throw new TmdbError("TMDB returned a response that was not valid JSON.", error);
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    throw new TmdbError(
      "TMDB response did not match the expected shape.",
      parsed.error,
    );
  }
  return parsed.data;
}


export async function discoverMovies(
  options: { genreId?: number } = {},
): Promise<Movie[]> {
  const params: Record<string, string> = {
    include_adult: "false",
    include_video: "false",
    language: "en-US",
    page: "1",
    sort_by: "popularity.desc",
  };
  if (options.genreId) {
    params.with_genres = String(options.genreId);
  }
  const data = await fetchJson("/discover/movie", params, DiscoverResponseSchema);
  return data.results;
}


export async function getGenres(): Promise<Genre[]> {
  const data = await fetchJson(
    "/genre/movie/list",
    { language: "en" },
    GenreListResponseSchema,
  );
  return data.genres;
}


export function posterUrl(
  path: string | null,
  size: "w342" | "w500" = "w500",
): string | null {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
}
