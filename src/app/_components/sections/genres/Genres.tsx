import GenresContent from "@/app/_components/sections/genres/GenresContent";
import { api } from "@/trpc/server";

const Genres = async () => {
  const genres = await api.genre.getAll.query({});
  const books = await api.book.getAll.query({ orderByPublishedAt: "desc" });

  return (
    <section className="mt-96p lg:mt-120p">
      <div className="container">
        <div>
          <h2 className="text-gradient mb-8p font-serif text-clamp-32p-to-46p font-bold leading-1.2">
            Find Your Genre
          </h2>
          <p className="text-base text-clamp-16p-to-18p leading-1.4">
            Browse through the most popular genres and find what interests you.
          </p>
        </div>

        <GenresContent genres={genres} books={books} />
      </div>
    </section>
  );
};

export default Genres;
