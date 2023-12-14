"use client";

import GenresBooks from "@/app/_components/sections/genres/GenresBooks";
import GenresFilters from "@/app/_components/sections/genres/GenresFilters";
import { Button } from "@/app/_components/ui/button";
import ErrorMessage from "@/app/_components/ui/custom/ErrorMessage";
import SkeletonBooks from "@/app/_components/ui/skeletons/SkeletonBooks";
import { api } from "@/trpc/react";
import { type Book, type Genre } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

interface GenresContentProps {
  genres: Genre[];
  books: Book[];
}

const GenresContent = ({ genres, books }: GenresContentProps) => {
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [activeGenre, setActiveGenre] = useState("All");
  const isMountedRef = useRef(false);

  const booksQuery = api.book.getAll.useQuery(
    {
      genre: activeGenre !== "All" ? activeGenre : undefined,
      limit: 6,
    },
    {
      enabled: filtersApplied, // Runs only when the filter button is clicked on.
    },
  );

  const hasBooksToDisplay = isMountedRef.current
    ? (booksQuery.data && booksQuery.data.length > 0) ??
      (booksQuery.isLoading || booksQuery.isError)
    : books.length > 0;

  const handleFilterClick = (genre: string) => {
    setFiltersApplied(true);
    setActiveGenre(genre);
  };

  // Return null immediately if no books are available
  if (!hasBooksToDisplay) {
    return null;
  }

  // Render books content
  const renderContent = () => {
    if (!filtersApplied) {
      // On the initial render, display the books prop.
      return <GenresBooks books={books} />;
    }

    if (booksQuery.isLoading) {
      return <SkeletonBooks />;
    }

    if (booksQuery.isError) {
      return (
        <div className="mt-32p">
          <ErrorMessage onRetry={() => booksQuery.refetch()} />
        </div>
      );
    }

    return <GenresBooks books={booksQuery.data} />;
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
