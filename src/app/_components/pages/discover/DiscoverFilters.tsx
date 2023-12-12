import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { cn } from "@/lib/utils";
import { type Genre, type SortKey, type SortOption } from "@/types/types";
import { ArrowDownUp, Check, ChevronRightIcon, Search } from "lucide-react";
import { MultiSelect } from "primereact/multiselect";

interface DiscoverFilters {
  filters: Genre[];
  activeGenres: string[];
  setActiveGenres: (genres: string[]) => void;
  setActiveGenresButton: (genres: string) => void;
  selectAllGenres: boolean;
  setSelectAllGenres: (selectAllGenres: boolean) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  sortBy: SortOption | undefined;
  setSortBy: (sortBy: SortKey) => void;
}

const DiscoverFilters = ({
  filters,
  activeGenres,
  setActiveGenres,
  setActiveGenresButton,
  selectAllGenres,
  setSelectAllGenres,
  searchTerm,
  setSearchTerm,
  setSortBy,
}: DiscoverFilters) => {
  const filterOptions = [
    ...filters.map((filter) => ({
      label: filter.name,
      value: filter.name,
    })),
  ];

  return (
    <div className="mt-40p lg:mt-56p">
      <div>
        <div className="flex flex-wrap items-center">
          <MultiSelect
            options={filterOptions}
            value={activeGenres}
            onChange={(e) => setActiveGenres(e.value as string[])}
            selectAll={selectAllGenres}
            onSelectAll={(e) => {
              setSelectAllGenres(!e.checked);
              setActiveGenres(
                e.checked ? [] : filterOptions.map((filter) => filter.value),
              );
            }}
            placeholder="Select Genres"
            className="br-select"
            itemClassName="bg-select-item"
            panelClassName="bg-select-panel"
            checkboxIcon={
              <Check
                width={14}
                height={14}
                className="bg-select-checkbox-icon"
              />
            }
          />

          <div className="lg:order-last">
            <Select onValueChange={setSortBy}>
              <SelectTrigger className="br-sort-select without-ring ml-16p h-auto w-auto border-none bg-foreground !p-16p">
                <ArrowDownUp height={24} width={24} />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-none bg-foreground-off py-14p text-left font-sans text-white">
                {/* REVIEW: add to list of sort options and use map */}
                <SelectItem
                  value="title_asc"
                  className="mb-8p mr-8p cursor-pointer px-14p py-8p transition-all focus:bg-primary focus:text-white"
                >
                  Title (A-Z)
                </SelectItem>
                <SelectItem
                  value="title_desc"
                  className="mb-8p cursor-pointer px-14p  py-8p transition-all focus:bg-primary focus:text-white"
                >
                  Title (Z-A)
                </SelectItem>
                <SelectItem
                  value="publishedDate_desc"
                  className="mb-8p cursor-pointer px-14p  py-8p transition-all focus:bg-primary focus:text-white"
                >
                  Newest First
                </SelectItem>
                <SelectItem
                  value="publishedDate_asc"
                  className="mb-8p cursor-pointer px-14p  py-8p transition-all focus:bg-primary focus:text-white"
                >
                  Oldest First
                </SelectItem>
                <SelectItem
                  value="pageCount_desc"
                  className="mb-8p cursor-pointer px-14p  py-8p transition-all focus:bg-primary focus:text-white"
                >
                  Longest First
                </SelectItem>
                <SelectItem
                  value="pageCount_asc"
                  className="mb-8p cursor-pointer px-14p  py-8p transition-all focus:bg-primary focus:text-white"
                >
                  Shortest First
                </SelectItem>
                <SelectItem
                  value="averageRating_desc"
                  className="mb-8p cursor-pointer px-14p  py-8p transition-all focus:bg-primary focus:text-white"
                >
                  Highest Rated
                </SelectItem>
                <SelectItem
                  value="averageRating_asc"
                  className="cursor-pointer px-14p  py-8p transition-all focus:bg-primary focus:text-white"
                >
                  Lowest Rated
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-20p flex w-[28.5rem] basis-full items-center rounded-md bg-foreground px-16p lg:relative lg:left-[-0.625rem] lg:z-0 lg:mt-0 lg:basis-auto lg:pl-[1.625rem]">
            <span className="bar-shape-pseudo-secondary hidden lg:block" />
            <Search
              width={16}
              height={16}
              strokeWidth={3}
              className="flex-shrink-0"
            />
            <Input
              type="search"
              placeholder="browse coffee break books..."
              className="without-ring !h-auto border-0 border-none border-transparent bg-transparent !py-18p"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="bg-gradient rounded-full p-14p">Search</Button>
          </div>
        </div>
      </div>

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
                setSelectAllGenres(!selectAllGenres);
                setActiveGenres(
                  selectAllGenres
                    ? []
                    : filterOptions.map((filter) => filter.value),
                );
              }}
              className={cn(
                "hover:bg-primaryfocus:bg-primary bg-foreground",
                `${selectAllGenres && "bg-primary"}`,
              )}
            >
              All Genres
            </Button>
          </li>

          {filterOptions.map(({ label, value }) => (
            <li key={value}>
              <Button
                onClick={() => setActiveGenresButton(value)}
                className={cn(
                  "hover:bg-primaryfocus:bg-primary bg-foreground",
                  `${activeGenres.includes(value) && "bg-primary"}`,
                )}
              >
                {label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiscoverFilters;
