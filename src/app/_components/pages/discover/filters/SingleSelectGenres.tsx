import { Button } from "@/app/_components/ui/button";
import { cn } from "@/lib/utils";
import { type Filter } from "@/types/types";
import { ChevronRightIcon } from "lucide-react";

interface SingleSelectGenresProps {
  filters: Filter[];
  activeGenres: string[];
  selectAllGenres: boolean;
  onSelectAllGenres: (checked: boolean) => void;
  onGenreChange: (genres: string) => void;
}

const SingleSelectGenres = ({
  filters,
  activeGenres,
  selectAllGenres,
  onSelectAllGenres,
  onGenreChange,
}: SingleSelectGenresProps) => {
  return (
    <div className="mt-40p lg:mt-48p">
      <h3 className="flex items-center font-serif text-24p font-bold leading-1.2">
        <span className="text-gradient">
          Filter Books by{" "}
          <span className="block sm:inline">
            Your Favorite Genre{" "}
            <ChevronRightIcon
              className="relative top-[-0.0625] inline-block h-6 w-6 text-white"
              stroke="url(#svg-gradient)"
              strokeWidth={3}
            />
          </span>
        </span>
      </h3>

      <ul className="mt-32p flex flex-wrap gap-16p">
        <li>
          <Button
            onClick={() => {
              onGenreChange("all");
              onSelectAllGenres(!selectAllGenres);
            }}
            className={cn(
              "hover:bg-primary bg-foreground py-",
              `${selectAllGenres && "bg-primary"}`,
            )}
          >
            All Genres
          </Button>
        </li>

        {filters.map(({ label, value }) => (
          <li key={value}>
            <Button
              onClick={() => {
                onGenreChange(value);
                onSelectAllGenres(false);
              }}
              className={cn(
                "hover:bg-primary bg-foreground",
                `${activeGenres.includes(value) && "bg-primary"}`,
              )}
            >
              {label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleSelectGenres;
