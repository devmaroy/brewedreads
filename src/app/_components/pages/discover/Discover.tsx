import { fetchBooksAndGenres } from "@/api/api";
import DiscoverContent from "@/app/_components/pages/discover/DiscoverContent";
import ErrorMessage from "@/app/_components/ui/custom/ErrorMessage";
import { DiscoverContextProvider } from "@/context/DiscoverContext";

const LIMIT_BOOKS_PER_LOAD = 5;

const Discover = async () => {
  const {
    books,
    genres,
    booksNextCursor,
    isError,
    isSuccess,
    hasBooks,
    hasGenres,
  } = await fetchBooksAndGenres({
    limit: LIMIT_BOOKS_PER_LOAD,
    include: {
      author: true,
      genres: true,
    },
  });

  // Check if we have some error.
  if (isError || !isSuccess) {
    // Return an error message or a component to indicate the error
    return (
      <section className="mt-96p lg:mt-120p">
        <div className="container">
          <ErrorMessage explorePath="/" />
        </div>
      </section>
    );
  }

  if (hasBooks && hasGenres) {
    return (
      <section className="mt-72p">
        <div className="sm:container">
          <div className="rounded-md bg-card-foreground px-12p py-40p sm:px-16p md:px-40p md:py-64p">
            <div>
              <h1 className="text-gradient mb-8p font-serif text-clamp-32p-to-46p font-bold leading-1.2">
                Discover Your{" "}
                <span className="block sm:inline-block">Coffee Book</span>
              </h1>
              <p className="font-clamp-16p-to-18p text-muted">
                Find the newest books added to our platform.
              </p>
            </div>

            <DiscoverContextProvider genres={genres}>
              <DiscoverContent
                limit={LIMIT_BOOKS_PER_LOAD}
                books={books}
                booksNextCursor={booksNextCursor}
              />
            </DiscoverContextProvider>
          </div>
        </div>
      </section>
    );
  }
};

export default Discover;
