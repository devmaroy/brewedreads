"use client";

import MultiSelectGenres from "@/app/_components/pages/discover/filters/MultiSelectGenres";
import SearchBar from "@/app/_components/pages/discover/filters/SearchBar";
import SingleSelectGenres from "@/app/_components/pages/discover/filters/SingleSelectGenres";
import SortBy from "@/app/_components/pages/discover/filters/SortBy";
import { useDiscoverContext } from "@/context/DiscoverContext";

const DiscoverFilters = () => {
  const context = useDiscoverContext();

  if (!context) {
    throw new Error(
      "useDiscoverContext must be used within a DiscoverContextProvider",
    );
  }

  const {
    genresFilters,
    activeGenres,
    selectAllGenres,
    activeSortByFilter,
    searchTerm,
    handleSelectGenres,
    handleSearchTerm,
    handleSetActiveSortByFilter,
    setSelectAllGenres,
  } = context;

  return (
    <div className="mt-40p lg:mt-56p">
      <div className="flex flex-wrap items-center">
        <MultiSelectGenres
          filters={genresFilters}
          activeGenres={activeGenres}
          selectAllGenres={selectAllGenres}
          onSelectAllGenres={(checked) => setSelectAllGenres(checked)}
          onGenresChange={handleSelectGenres}
        />
        <SortBy
          activeSortByFilter={activeSortByFilter}
          onSortByFilterChange={handleSetActiveSortByFilter}
        />
        <div className="mt-20p flex w-[28.5rem] basis-full items-center rounded-md bg-foreground px-16p lg:relative lg:left-[-0.625rem] lg:z-0 lg:mt-0 lg:basis-auto lg:pl-[1.625rem]">
          <span className="bar-shape-pseudo-secondary hidden lg:block" />
          <SearchBar
            searchTerm={searchTerm}
            onSearchTermChange={handleSearchTerm}
          />
        </div>
      </div>

      <SingleSelectGenres
        filters={genresFilters}
        activeGenres={activeGenres}
        selectAllGenres={selectAllGenres}
        onSelectAllGenres={(checked) => setSelectAllGenres(checked)}
        onGenreChange={handleSelectGenres}
      />
    </div>
  );
};

export default DiscoverFilters;
