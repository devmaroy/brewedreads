import DiscoverContent from "@/app/_components/pages/discover/DiscoverContent";
import ErrorMessage from "@/app/_components/ui/custom/ErrorMessage";
import { api } from "@/trpc/server";

// REVIEW: try to encapsulate the logic in a function
const fetchBooksAndGenres = async () => {
  try {
    // Review: Add to promise.all([])
    // Check this error

    const books = await api.book.getAll.query({
      limit: 5,
      include: {
        author: true,
        genres: true,
      },
    });

    const genres = await api.genre.getAll.query({});

    return {
      books,
      genres,
      error: null,
    };
  } catch (error) {
    return { books: null, genres: null, error };
  }
};

const Discover = async () => {
  // REVIEW: Always start with CONST and then LET.
  // REVIEW: Is trpc needed when serverside components.

  const { books, genres, error } = await fetchBooksAndGenres();

  // Check if we have some error.
  if (error) {
    // Return an error message or a component to indicate the error
    return (
      <section className="mt-96p lg:mt-120p">
        <div className="container">
          <ErrorMessage />
        </div>
      </section>
    );
  }

  // Check if this works and you can use: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  if (books?.books?.length > 0 && genres?.length > 0) {
    return (
      <section className="mt-72p">
        <div className="sm:container">
          {/* // REVIEW: be carefull on custom things, for px if needed user pattern px-[72px] */}
          <div className="rounded-md bg-card-foreground px-12p py-[72px]  sm:px-16p md:px-40p md:py-64p">
            <div>
              <h1 className="text-gradient mb-8p font-serif text-clamp-32p-to-46p font-bold leading-1.2">
                Discover Your{" "}
                <span className="block sm:inline-block">Coffee Book</span>
              </h1>
              <p className="font-clamp-16p-to-18p text-muted">
                Find the newest books added to our platform.
              </p>
            </div>

            <DiscoverContent
              limit={limit}
              books={books.books}
              booksNextCursor={books.nextCursor}
              genres={genres}
            />
          </div>
        </div>
      </section>
    );
  }
};

export default Discover;
