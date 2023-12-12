"use client";

import DiscoverBooks from "@/app/_components/pages/discover/DiscoverBooks";
import DiscoverFilters from "@/app/_components/pages/discover/DiscoverFilters";
import ErrorMessage from "@/app/_components/ui/custom/ErrorMessage";
import SkeletonBooks from "@/app/_components/ui/skeletons/SkeletonBooks";
import useDebounce from "@/hooks/useDebounce";
import { api } from "@/trpc/react";
import { type SortKey, type SortOption } from "@/types/types";
import { type Book, type Genre } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

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
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [sortBy, setSortBy] = useState<SortOption>(
    sortOptions.publishedDate_desc,
  );
  const isMountedRef = useRef(false);

  // REVIEW this: This is a red flag
  // TIP, check how to enable SSR on first load, with SSR

  // https://trpc.io/docs/client/nextjs/ssr
  // https://github.com/tuanphungcz/javascriptdevs.com/blob/9fcf17abdc8384d2a602f85769f1962405023661/utils/trpc.ts#L57

  useEffect(() => {
    // Component is now mounted
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const booksQuery = api.book.getAll.useQuery(
    {
      genre:
        activeGenres && activeGenres.length !== 0 ? activeGenres : undefined,
      searchTerm: debouncedSearch,
      sortBy: sortBy?.fieldName ?? "publishedDate",
      sortOrder: sortBy?.order ?? "desc",
    },
    {
      enabled: isMountedRef.current, // Runs only when the filter button is clicked on.
    },
  );

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

  // Render books content
  const renderContent = () => {
    if (!isMountedRef.current) {
      // On the initial render, display the books prop.
      return <DiscoverBooks books={books} />;
    }

    if (booksQuery.isLoading) {
      return (
        <SkeletonBooks wrapperClassName="mt-56p grid grid-cols-fluid-fill-8-5 gap-x-24p gap-y-32p md:gap-x-32p md:gap-y-48p lg:mt-64p lg:grid-cols-fluid-fill-11" />
      );
    }

    if (booksQuery.isError) {
      return (
        <div className="mt-56p lg:mt-64p">
          <ErrorMessage onRetry={() => booksQuery.refetch()} />
        </div>
      );
    }

    if (!booksQuery.data || booksQuery.data.length === 0) {
      return (
        <div className="mt-56p lg:mt-64p">
          Ooops. There are no books matching these filters :(
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
