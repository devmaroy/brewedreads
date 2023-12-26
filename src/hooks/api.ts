import { api } from "@/trpc/react";
import { type Book, type BookPage, type SortKey } from "@/types/types";

interface UseFetchPaginatedBooks {
  limit: number;
  genres?: string[] | string;
  searchTerm?: string;
  sortBy?: SortKey;
  enabled: boolean;
  include?: {
    author?: boolean;
    genres?: boolean;
  };
  initialData?: {
    pages: {
      books: Book[];
      nextCursor: string | undefined;
    }[];
    pageParams: (string | null)[];
  };
}

export const useFetchPaginatedBooks = ({
  limit,
  genres,
  searchTerm,
  sortBy,
  include,
  enabled,
  initialData,
}: UseFetchPaginatedBooks) => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isError,
    isSuccess,
    refetch,
  } = api.book.getAll.useInfiniteQuery(
    {
      limit,
      genres,
      searchTerm,
      sortBy,
      include,
    },
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
      initialData,
      getNextPageParam: (lastPage: BookPage) => lastPage.nextCursor,
    },
  );

  const books: Book[] =
    data?.pages.flatMap((page: BookPage) => page.books) ?? [];

  return {
    isFetching,
    isError,
    isSuccess,
    books,
    hasBooks: books && books.length !== 0,
    hasNextPage,
    fetchNextPage,
    refetch,
  };
};
