"use client";

import useDebounce from "@/hooks/useDebounce";
import useSetQueryString from "@/hooks/useSetQueryString";
import { type Filter, type Genre, type SortKey } from "@/types/types";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface DiscoverProvider {
  genres: Genre[];
  children: ReactNode;
}

interface DiscoverContextType {
  isFilterActive: boolean;
  setIsFilterActive: (active: boolean) => void;
  genresFilters: Filter[];
  activeGenres: string[];
  selectAllGenres: boolean;
  activeSortByFilter: SortKey;
  searchTerm: string;
  debouncedSearchTerm: string;
  handleSelectGenres: (genre: string | string[]) => void;
  handleSearchTerm: (searchTerm: string) => void;
  handleSetActiveSortByFilter: (sortByFilter: SortKey) => void;
  setSelectAllGenres: (checked: boolean) => void;
}

const DiscoverContext = createContext<DiscoverContextType | null>(null);

export const useDiscoverContext = () => useContext(DiscoverContext);

export const DiscoverContextProvider = ({
  genres,
  children,
}: DiscoverProvider) => {
  const [queryString, setQueryString] = useSetQueryString();
  const initialGenres = genres.map(({ slug }) => slug);

  const [isFilterActive, setIsFilterActive] = useState(
    () =>
      queryString.get("genres") !== null ||
      queryString.get("search") !== null ||
      queryString.get("sortBy") !== null,
  );

  const [selectAllGenres, setSelectAllGenres] = useState(
    () => queryString.get("genres") === "all",
  );

  const [activeGenres, setActiveGenres] = useState<string[]>(() => {
    const queryGenres = queryString.get("genres");
    if (queryGenres === "all") {
      return initialGenres;
    } else {
      return queryGenres?.split(",") ?? [];
    }
  });

  const [searchTerm, setSearchTerm] = useState(
    () => queryString.get("search") ?? "",
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [activeSortByFilter, setActiveSortByFilter] = useState<SortKey>(
    (queryString.get("sortBy") as SortKey) ?? "",
  );

  // Genre filters
  const genresFilters = genres.map(({ name, slug }) => ({
    label: name,
    value: slug,
  }));

  // Effect to update the query string when filters changes
  useEffect(() => {
    const paramsToUpdate: Record<string, string | string[]> = {
      genres: selectAllGenres ? "all" : activeGenres.join(","),
      search: debouncedSearchTerm, // Update search term in URL with debounced value
      sortBy: activeSortByFilter,
    };

    setQueryString(paramsToUpdate);
  }, [
    activeGenres,
    activeSortByFilter,
    debouncedSearchTerm,
    selectAllGenres,
    setQueryString,
  ]);

  // Function to handle selection of genres (both all and individual genres)
  const handleSelectGenres = (genre: string | string[]) => {
    setIsFilterActive(true);

    if (genre === "all") {
      setSelectAllGenres(!selectAllGenres);
      setActiveGenres(selectAllGenres ? [] : initialGenres);
    } else {
      setActiveGenres((prevState) => {
        // Check if genre passed in is array.
        if (Array.isArray(genre)) return genre;

        // It's not an array.
        const newGenres = prevState.includes(genre)
          ? prevState.filter((g) => g !== genre)
          : [...prevState.filter((g) => g !== "all"), genre];
        return newGenres;
      });
    }
  };

  // Function to handle search functionality.
  const handleSearchTerm = (searchTerm: string) => {
    setIsFilterActive(true);
    setSearchTerm(searchTerm);
  };

  // Function to handle sortBy functionality.
  const handleSetActiveSortByFilter = (sortByFilter: SortKey) => {
    setIsFilterActive(true);
    setActiveSortByFilter(sortByFilter);
  };

  const value = {
    isFilterActive,
    setIsFilterActive,
    genresFilters,
    activeGenres,
    selectAllGenres,
    activeSortByFilter,
    searchTerm,
    debouncedSearchTerm,
    handleSelectGenres,
    handleSearchTerm,
    handleSetActiveSortByFilter,
    setSelectAllGenres,
  };

  return (
    <DiscoverContext.Provider value={value}>
      {children}
    </DiscoverContext.Provider>
  );
};
