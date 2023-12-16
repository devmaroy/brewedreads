"use client";

import GenresBooks from "@/app/_components/sections/genres/GenresBooks";
import GenresFilters from "@/app/_components/sections/genres/GenresFilters";
import { Button } from "@/app/_components/ui/button";
import ErrorMessage from "@/app/_components/ui/custom/ErrorMessage";
import { api } from "@/trpc/react";
import { type Book, type Genre } from "@/types/types";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface GenresContentProps {
  limit?: number;
  genres: Genre[];
  books: Book[];
}

const GenresContent = ({ limit = 6, genres, books }: GenresContentProps) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [activeGenre, setActiveGenre] = useState("All");

  const { data, isFetching, isError, refetch } = api.book.getAll.useQuery(
    {
      genre: activeGenre !== "All" ? activeGenre : undefined,
      limit,
    },
    { enabled: !initialLoad },
  );

  const handleFilterClick = (genre: string) => {
    setInitialLoad(false);
    setActiveGenre(genre);
  };

  const booksFromQuery: Book[] = data?.books ?? [];

  // Render books content
  const renderContent = () => {
    const hasSSRBooks = books && books.length !== 0;

    if (initialLoad && hasSSRBooks) {
      // On the initial render, display the books prop.
      return <GenresBooks books={books} />;
    }

    if (isError) {
      return (
        <div className="mt-32p">
          <ErrorMessage onRetry={() => refetch()} />
        </div>
      );
    }

    return (
      <GenresBooks
        books={booksFromQuery}
        skeletonCount={limit}
        showSkeletons={isFetching}
      />
    );
  };

  return (
    <div>
      <GenresFilters
        filters={genres}
        activeFilter={activeGenre}
        setActiveFilter={handleFilterClick}
      />

      {renderContent()}

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
