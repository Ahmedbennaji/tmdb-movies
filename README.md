# TMDB Movie Discovery

A small movie-discovery app built with **Vite · React 19 · TypeScript · Tailwind v4 · shadcn/ui**.
It fetches films from TMDB's `/discover/movie` endpoint, lets you filter by genre
and sort the results, and shows them in a responsive grid of poster cards.

## Features

- Fetches the first page of `/discover/movie`.
- **Genre filter** applied at the API (`with_genres`).
- **Client-side sorting** by popularity, rating, release date, or title.
- Responsive card grid (2 → 6 columns as the viewport grows).
- Each card: poster, title, release year, rating badge, and a hover effect
  (lift + poster zoom + overview reveal, all via CSS transitions).
- Loading skeletons, a friendly error state with retry, and an empty state.
- API responses validated at the boundary with **Zod**.

## Prerequisites

- **Node 24.16.0** (pinned in `.nvmrc`). If you use `nvm`:
  ```bash
  nvm use
  ```
- A free **TMDB API key** (v3 auth) — https://www.themoviedb.org/settings/api

## Setup & run

```bash
# 1. Install dependencies
npm install

# 2. Create your local env file and add your TMDB key
cp .env.example .env
# then edit .env and set VITE_TMDB_API_KEY=your_key_here

# 3. Start the dev server
npm start
```

Then open the URL Vite prints (default http://localhost:5173).

> The `VITE_` prefix on `VITE_TMDB_API_KEY` is required — Vite only exposes
> env vars with that prefix to the browser. `.env` is gitignored and never
> committed.

## Scripts

| Script | Description |
| --- | --- |
| `npm start` / `npm run dev` | Start the Vite dev server |


```bash
npm test
```

## Project structure

```
src/
  api/        TMDB client (tmdb.ts) + Zod schemas/types (types.ts)
  hooks/      useMovies, useGenres — data fetching + loading/error state
  lib/        sortMovies — pure, tested sort logic
  components/ MovieCard, MovieGrid, Controls + shadcn ui/ primitives
  App.tsx     Composes state, controls, and the grid
```

