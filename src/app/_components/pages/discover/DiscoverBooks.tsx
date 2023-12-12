import DiscoverBook from "@/app/_components/pages/discover/DiscoverBook";
import { type Book } from "@/types/types";

interface DiscoverBooksProps {
  books: Book[];
}

// Review: Not needed to split this component into a separate file, since we dont need it to be reused.

const DiscoverBooks = ({ books }: DiscoverBooksProps) => {
  return (
    <div className="mt-56p grid grid-cols-fluid-fill-8-5 gap-x-24p gap-y-32p md:gap-x-32p md:gap-y-48p lg:mt-64p lg:grid-cols-fluid-fill-11">
      {books.map(
        ({ id, coverImageUrl, author, title, slug, genres, averageRating }) => (
          <DiscoverBook
            key={id}
            id={id}
            coverImageUrl={coverImageUrl}
            author={author}
            title={title}
            slug={slug}
            genres={genres}
            averageRating={averageRating}
          />
        ),
      )}
    </div>
  );
};

export default DiscoverBooks;
