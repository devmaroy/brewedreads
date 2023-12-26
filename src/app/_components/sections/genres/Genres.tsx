import { fetchBooksAndGenres } from "@/api/api";
import GenresContent from "@/app/_components/sections/genres/GenresContent";
import ErrorMessage from "@/app/_components/ui/custom/ErrorMessage";
import SectionHeader from "@/app/_components/ui/custom/SectionHeader";

const LIMIT_BOOKS_PER_LOAD = 6;

const Genres = async () => {
  const { books, genres, isError, isSuccess, hasBooks, hasGenres } =
    await fetchBooksAndGenres({
      limit: LIMIT_BOOKS_PER_LOAD,
    });

  // Check if we have some error.
  if (isError || !isSuccess) {
    // Return an error message or a component to indicate the error
    return (
      <section className="mt-96p lg:mt-120p">
        <div className="container">
          <ErrorMessage />
        </div>
      </section>
    );
  }

  // Check if there are any books to display
  if (hasGenres && hasBooks) {
    return (
      <section className="mt-96p lg:mt-120p">
        <div className="container">
          <SectionHeader
            heading="Find Your Genre"
            content="Browse through the most popular genres and find what interests you."
            decorationImage="/find-your-genre-shape.svg"
            decorationClassName="right-[-2.2rem] top-[-2.2rem] h-[4.1875rem] w-[3.75rem] md:right-[-2.875rem] md:top-[-2.5rem] md:h-[5.3125rem] md:w-[4.6875rem]"
          />

          <GenresContent
            genres={genres}
            limit={LIMIT_BOOKS_PER_LOAD}
            books={books}
          />
        </div>
      </section>
    );
  }
};

export default Genres;
