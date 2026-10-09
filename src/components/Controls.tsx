import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORT_OPTIONS, type SortKey } from "@/lib/sortMovies";
import type { Genre } from "@/api/types";

export const ALL_GENRES = "all";

interface ControlsProps {
  genres: Genre[];
  genreValue: string;
  onGenreChange: (value: string) => void;
  sortKey: SortKey;
  onSortChange: (value: SortKey) => void;
}

export function Controls({
  genres,
  genreValue,
  onGenreChange,
  sortKey,
  onSortChange,
}: ControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        Genre
        <Select value={genreValue} onValueChange={onGenreChange}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="All genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_GENRES}>All genres</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre.id} value={String(genre.id)}>
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>

      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        Sort by
        <Select
          value={sortKey}
          onValueChange={(value) => onSortChange(value as SortKey)}
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>
    </div>
  );
}
