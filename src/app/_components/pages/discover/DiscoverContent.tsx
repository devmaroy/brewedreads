"use client";

import ErrorMessage from "@/app/_components/ui/custom/ErrorMessage";
import DiscoverFilters from "@/app/_components/pages/discover/DiscoverFilters";
import { api } from "@/trpc/react";
import { type Book, type Genre } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import DiscoverBooks from "@/app/_components/pages/discover/DiscoverBooks";
import { type SortKey, type SortOption } from "@/types/types";

interface DiscoverContentProps {
  genres: Genre[];
  books: Book[];
}

const sortOptions: Record<SortKey, SortOption> = {
  title_asc: { fieldName: "title", order: "asc" },
  title_desc: { fieldName: "title", order: "desc" },
  publishedDate_asc: { fieldName: "publishedDate", order: "asc" },
  publishedDate_desc: { fieldName: "publishedDate", order: "desc" },
  pageCount_asc: { fieldName: "pageCount", order: "asc" },
  pageCount_desc: { fieldName: "pageCount", order: "desc" },
  averageRating_asc: { fieldName: "averageRating", order: "asc" },
  averageRating_desc: { fieldName: "averageRating", order: "desc" },
};

const DiscoverContent = ({ genres, books }: DiscoverContentProps) => {
  const [selectAllGenres, setSelectAllGenres] = useState(false);
  const [activeGenres, setActiveGenres] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>(
    sortOptions.publishedDate_desc,
  );
  const isMountedRef = useRef(false);

  useEffect(() => {
    // Component is now mounted
    isMountedRef.current = true;
  }, []);

  const booksQuery = api.book.getAll.useQuery(
    {
      genre:
        activeGenres && activeGenres.length !== 0 ? activeGenres : undefined,
      searchTerm: searchTerm,
      sortBy: sortBy?.fieldName ?? "publishedDate",
      sortOrder: sortBy?.order ?? "desc",
    },
    {
      enabled: isMountedRef.current, // Runs only when the filter button is clicked on.
    },
  );

  const hasBooksToDisplay = isMountedRef.current
    ? (booksQuery.data && booksQuery.data.length > 0) ??
      (booksQuery.isLoading || booksQuery.isError)
    : books.length > 0;

  const handleSelectAllGenres = (selectAllGenres: boolean) => {
    setSelectAllGenres(selectAllGenres);
  };

  const handleSetActiveGenres = (selectedGenres: string[]) => {
    if (isMountedRef.current) {
      setActiveGenres(selectedGenres);
    }
  };

  const handleSetSearchTerm = (searchTerm: string) => {
    if (isMountedRef.current) {
      setSearchTerm(searchTerm);
    }
  };

  const handleSortBy = (sortBy: SortKey) => {
    if (isMountedRef.current) {
      const selectedSortOption = sortOptions[sortBy] as SortOption | undefined;

      if (selectedSortOption) {
        setSortBy({
          input: sortBy,
          fieldName: selectedSortOption.fieldName,
          order: selectedSortOption.order,
        });
      } else {
        setSortBy(sortOptions.publishedDate_desc);
      }
    }
  };

  const handleButtonClick = (genre: string) => {
    if (isMountedRef.current) {
      setActiveGenres((prevState) => {
        // Toggle clicked genre
        const updatedGenres = new Set(prevState);

        if (updatedGenres.has(genre)) {
          updatedGenres.delete(genre);
        } else {
          updatedGenres.add(genre);
        }

        return Array.from(updatedGenres);
      });
    }
  };

  // Return null immediately if no books are available
  if (!hasBooksToDisplay) {
    return null;
  }

  // Render books content
  const renderContent = () => {
    if (!isMountedRef.current) {
      // On the initial render, display the books prop.
      return <DiscoverBooks books={books} />;
    }

    if (booksQuery.isLoading) {
      return "skeletom loadingg...";
    }

    if (booksQuery.isError) {
      return (
        <div className="mt-32p">
          <ErrorMessage onRetry={() => booksQuery.refetch()} />
        </div>
      );
    }

    return <DiscoverBooks books={booksQuery.data} />;
  };

  return (
    <div>
      <DiscoverFilters
        filters={genres}
        activeGenres={activeGenres}
        setActiveGenres={handleSetActiveGenres}
        setActiveGenresButton={handleButtonClick}
        selectAllGenres={selectAllGenres}
        setSelectAllGenres={handleSelectAllGenres}
        searchTerm={searchTerm}
        setSearchTerm={handleSetSearchTerm}
        sortBy={sortBy}
        setSortBy={handleSortBy}
      />

      {renderContent()}
    </div>
  );
};

export default DiscoverContent;
