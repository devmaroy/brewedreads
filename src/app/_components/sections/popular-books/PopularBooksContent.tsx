import PopularBook from "@/app/_components/sections/popular-books/PopularBook";
import { Button } from "@/app/_components/ui/button";
import { type Book } from "@/types/types";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PopularBooksContent {
  popularBooks: Book[];
}

const PopularBooksContent = ({ popularBooks }: PopularBooksContent) => {
  return (
    <div>
      <div className="mt-32p grid grid-cols-fluid-fill-18-5 gap-32p lg:gap-y-40p">
        {popularBooks.map(
          ({
            id,
            slug,
            coverImageUrl,
            averageRating,
            genres,
            title,
            author,
            teaser,
          }) => (
            <PopularBook
              key={id}
              id={id}
              slug={slug}
              coverImageUrl={coverImageUrl}
              averageRating={averageRating}
              genres={genres}
              title={title}
              teaser={teaser}
              author={author}
            />
          ),
        )}
      </div>

      <span className="absolute bottom-[32rem] right-[60%] -z-50 h-[54.1875rem] w-[55.3125rem] md:bottom-[2rem] md:right-[80%] xl:hidden">
        <Image src="/popular-books-shape-01.svg" fill alt="Decoration shapes" />
      </span>

      <div className="mt-24p text-right md:mt-32p">
        <Button
          variant="link"
          className="p-0 !text-16p font-bold leading-1.5 text-white"
        >
          <Link href="/discover">Discover More Books</Link>
          <ChevronRightIcon className="ml-8p h-4 w-4" strokeWidth={3} />
        </Button>
      </div>
    </div>
  );
};

export default PopularBooksContent;
