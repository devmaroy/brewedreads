"use client";

import DiscoverBooks from "@/app/_components/pages/discover/DiscoverBooks";
import DiscoverFilters from "@/app/_components/pages/discover/DiscoverFilters";
import { Button } from "@/app/_components/ui/button";
import ErrorMessage from "@/app/_components/ui/custom/ErrorMessage";
import useDebounce from "@/hooks/useDebounce";
import { api } from "@/trpc/react";
import {
  type Book,
  type BookPage,
  type Genre,
  type SortKey,
  type SortOption,
} from "@/types/types";
import { useState } from "react";

interface DiscoverContentProps {
  limit?: number;
  books: Book[];
  booksNextCursor?: string;
  genres: Genre[];
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

const DiscoverContent = ({
  limit = 10,
  genres,
  books,
  booksNextCursor,
}: DiscoverContentProps) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [selectAllGenres, setSelectAllGenres] = useState(false);
  const [activeGenres, setActiveGenres] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [sortBy, setSortBy] = useState<SortOption>(
    sortOptions.publishedDate_desc,
  );

  const { data, hasNextPage, fetchNextPage, isFetching, isError, refetch } =
    api.book.getAll.useInfiniteQuery(
      {
        limit,
        genre: activeGenres.length !== 0 ? activeGenres : undefined,
        searchTerm: debouncedSearch,
        sortBy: sortBy?.fieldName ?? "publishedDate",
        sortOrder: sortBy?.order ?? "desc",
        include: {
          author: true,
          genres: true,
        },
      },
      {
        enabled: !initialLoad,
        initialData: {
          pages: [{ books, nextCursor: booksNextCursor ?? "" }],
          pageParams: [null],
        },
        getNextPageParam: (lastPage: BookPage) => lastPage.nextCursor,
      },
    );

  const handleSelectAllGenres = (selectAllGenres: boolean) => {
    setInitialLoad(false);
    setSelectAllGenres(selectAllGenres);
  };

  const handleSetActiveGenres = (selectedGenres: string[]) => {
    setInitialLoad(false);
    setActiveGenres(selectedGenres);
  };

  const handleSetSearchTerm = (searchTerm: string) => {
    setInitialLoad(false);
    setSearchTerm(searchTerm);
  };

  const handleSortBy = (sortBy: SortKey) => {
    setInitialLoad(false);
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
  };

  const handleButtonClick = (genre: string) => {
    setInitialLoad(false);

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
  };

  const booksFromQuery: Book[] =
    data?.pages.flatMap((page: BookPage) => page.books) ?? [];

  const handleLoadMore = async () => {
    setInitialLoad(false);
    await fetchNextPage();
  };

  const renderBooks = () => {
    const hasSSRBooks = books && books.length !== 0;

    if (initialLoad && hasSSRBooks) {
      return (
        <DiscoverBooks
          books={books}
          skeletonCount={limit}
          showSkeletons={false}
        />
      );
    }

    if (isError) {
      return (
        <div className="mt-56p lg:mt-64p">
          <ErrorMessage onRetry={() => refetch()} />
        </div>
      );
    }

    return (
      <DiscoverBooks
        books={booksFromQuery}
        skeletonCount={limit}
        showSkeletons={isFetching}
      />
    );
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

      {renderBooks()}

      {hasNextPage && (
        <div className="text-center mt-56p">
          <Button
            onClick={handleLoadMore}
            className="rounded-full bg-gradient font-bold text-16p !py-14p !px-40p h-auto lg:!py-16p lg:!px-64p"
          >
            Find More Reads
          </Button>
        </div>
      )}
    </div>
  );
};

export default DiscoverContent;
