import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { posterUrl } from "@/api/tmdb";
import type { Movie } from "@/api/types";


export function MovieCard({ movie }: { movie: Movie }) {
  const poster = posterUrl(movie.poster_path, "w500");
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "—";
  const rating = movie.vote_count > 0 ? movie.vote_average.toFixed(1) : "NR";

  return (
    <Card className="group/card gap-0 overflow-hidden py-0 pb-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-foreground/20">
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        {poster ? (
          <img
            src={poster}
            alt={`${movie.title} poster`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-2 text-center text-xs text-muted-foreground">
            No poster available
          </div>
        )}

        <Badge className="absolute top-2 right-2 gap-1 border-transparent bg-background/80 text-foreground backdrop-blur">
          <Star className="size-3 fill-yellow-400 text-yellow-400" />
          {rating}
        </Badge>

        {movie.overview && (
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
            <p className="line-clamp-6 text-xs leading-relaxed text-white">
              {movie.overview}
            </p>
          </div>
        )}
      </div>

      <div className="px-3 pt-3">
        <h3 className="line-clamp-1 font-medium" title={movie.title}>
          {movie.title}
        </h3>
        <p className="text-xs text-muted-foreground">{year}</p>
      </div>
    </Card>
  );
}
