"use client";

import GenresBooks from "@/app/_components/sections/genres/GenresBooks";
import GenresFilters from "@/app/_components/sections/genres/GenresFilters";
import { Button } from "@/app/_components/ui/button";
import ErrorMessage from "@/app/_components/ui/custom/ErrorMessage";
import { useFetchPaginatedBooks } from "@/hooks/api";
import { type Book, type Genre } from "@/types/types";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface GenresContentProps {
  limit?: number;
  genres: Genre[];
  books: Book[];
  booksNextCursor?: string;
}

const GenresContent = ({
  limit = 6,
  genres,
  books: SSRBooks,
}: GenresContentProps) => {
  const [activeGenre, setActiveGenre] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);

  const { books, isError, isFetching, isSuccess, refetch } =
    useFetchPaginatedBooks({
      limit: limit,
      genres: activeGenre,
      enabled: isFilterActive,
      initialData: {
        pages: [
          {
            books: SSRBooks,
            nextCursor: "",
          },
        ],
        pageParams: [null],
      },
    });

  const handleSelectGenre = async (genre: string) => {
    setActiveGenre(genre);
    setIsFilterActive(true);
  };

  // Check if we have some error.
  if (isError || !isSuccess) {
    // Return an error message or a component to indicate the error
    return (
      <div className="mt-32p">
        <ErrorMessage onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div>
      <GenresFilters
        filters={genres}
        activeFilter={activeGenre}
        setActiveFilter={handleSelectGenre}
      />

      <GenresBooks
        books={books}
        skeletonCount={limit}
        showSkeletons={isFetching}
      />

      <div className="mt-24p text-right md:mt-32p">
        <Button
          variant="link"
          className="p-0 !text-16p font-bold leading-1.5 text-white"
        >
          <Link href="/discover">Find More Genres</Link>
          <ChevronRightIcon className="ml-8p h-4 w-4" strokeWidth={3} />
        </Button>
      </div>
    </div>
  );
};

export default GenresContent;
