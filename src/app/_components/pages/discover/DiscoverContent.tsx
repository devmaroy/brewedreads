"use client";

import DiscoverBooks from "@/app/_components/pages/discover/DiscoverBooks";
import DiscoverFilters from "@/app/_components/pages/discover/DiscoverFilters";
import { Button } from "@/app/_components/ui/button";
import ErrorMessage from "@/app/_components/ui/custom/ErrorMessage";
import { useDiscoverContext } from "@/context/DiscoverContext";
import { useFetchPaginatedBooks } from "@/hooks/api";
import { type Book } from "@/types/types";

interface DiscoverContentProps {
  limit?: number;
  books: Book[];
  booksNextCursor?: string;
}

const DiscoverContent = ({
  limit = 10,
  books: SSRBooks,
  booksNextCursor: SSRBooksNextCursor,
}: DiscoverContentProps) => {
  const context = useDiscoverContext();

  if (!context) {
    throw new Error(
      "useDiscoverContext must be used within a DiscoverContextProvider",
    );
  }

  const {
    isFilterActive,
    debouncedSearchTerm,
    activeGenres,
    activeSortByFilter,
  } = context;

  // const shouldFetchData =
  //   searchTerm !== "" || activeGenres.length > 0 || activeSortByFilter !== "";

  const {
    books,
    isError,
    isFetching,
    isSuccess,
    hasBooks,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useFetchPaginatedBooks({
    limit,
    genres: activeGenres,
    searchTerm: debouncedSearchTerm,
    sortBy: activeSortByFilter,
    include: {
      genres: true,
      author: true,
    },
    initialData: {
      pages: [
        {
          books: SSRBooks,
          nextCursor: SSRBooksNextCursor ?? "",
        },
      ],
      pageParams: [null],
    },
    enabled: isFilterActive,
  });

  const handleLoadMorePages = async () => {
    await fetchNextPage();
  };

  // Check if we have some error.
  if (isError || !isSuccess) {
    // Return an error message or a component to indicate the error
    return (
      <section className="mt-56p">
        <ErrorMessage explorePath="/" onRetry={() => refetch()} />
      </section>
    );
  }

  return (
    <div>
      <DiscoverFilters />

      <DiscoverBooks
        hasBooks={hasBooks}
        books={books}
        skeletonCount={books.length ? books.length + limit : limit}
        showSkeletons={isFetching}
      />

      {hasNextPage && (
        <div className="text-center mt-56p">
          <Button
            onClick={handleLoadMorePages}
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
