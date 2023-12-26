import { cn } from "@/lib/utils";
import { type Genre } from "@/types/types";

interface GenresFilters {
  filters: Genre[];
  activeFilter: string;
  setActiveFilter: (activeFilter: string) => void;
}

const GenresFilters = ({
  filters,
  activeFilter,
  setActiveFilter,
}: GenresFilters) => {
  return (
    <ul className="mt-40p flex flex-wrap gap-16p">
      <li className="font-bold">
        <button
          type="button"
          className={cn(
            "text-muted transition-all hover:text-primary",
            `${activeFilter === "" && "text-primary"}`,
          )}
          onClick={() => setActiveFilter("")}
        >
          All
        </button>
      </li>

      {filters.map(({ id, name }) => (
        <li key={id} className="font-bold">
          <button
            type="button"
            className={cn(
              "text-muted transition-all hover:text-primary",
              `${activeFilter === name && "text-primary"}`,
            )}
            onClick={() => setActiveFilter(name)}
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default GenresFilters;
