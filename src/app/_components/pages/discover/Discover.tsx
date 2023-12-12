import DiscoverContent from "@/app/_components/pages/discover/DiscoverContent";
import ErrorMessage from "@/app/_components/ui/custom/ErrorMessage";
import { api } from "@/trpc/server";

const Discover = async () => {
  let books;
  let genres;
  let error;

  try {
    books = await api.book.getAll.query({ orderByPublishedAt: "desc" });
    genres = await api.genre.getAll.query({});
  } catch (err) {
    error = err;
  }

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

  if (books && genres && books.length > 0 && genres.length > 0) {
    return (
      <section className="mt-72p">
        <div className="sm:container">
          <div className="rounded-md bg-card-foreground px-12p py-40p  sm:px-16p md:px-40p md:py-64p">
            <div>
              <h1 className="text-gradient mb-8p font-serif text-clamp-32p-to-46p font-bold leading-1.2">
                Discover Your{" "}
                <span className="block sm:inline-block">Coffee Book</span>
              </h1>
              <p className="font-clamp-16p-to-18p text-muted">
                Find the newest books added to our platform.
              </p>
            </div>

            <DiscoverContent books={books} genres={genres} />
          </div>
        </div>
      </section>
    );
  }
};

export default Discover;
