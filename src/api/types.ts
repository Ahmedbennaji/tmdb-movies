import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  overview: z.string().optional().default(""),
  vote_average: z.number().optional().default(0),
  vote_count: z.number().optional().default(0),
  popularity: z.number().optional().default(0),
  release_date: z.string().optional().default(""),
  genre_ids: z.array(z.number()).optional().default([]),
});

export type Movie = z.infer<typeof MovieSchema>;

export const DiscoverResponseSchema = z.object({
  page: z.number(),
  results: z.array(MovieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export type DiscoverResponse = z.infer<typeof DiscoverResponseSchema>;


export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Genre = z.infer<typeof GenreSchema>;

export const GenreListResponseSchema = z.object({
  genres: z.array(GenreSchema),
});

export type GenreListResponse = z.infer<typeof GenreListResponseSchema>;
