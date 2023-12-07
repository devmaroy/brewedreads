import GenresContent from "@/app/_components/sections/genres/GenresContent";
import SectionHeader from "@/app/_components/ui/custom/SectionHeader";
import { api } from "@/trpc/server";

const Genres = async () => {
  const genres = await api.genre.getAll.query({});
  const books = await api.book.getAll.query({ orderByPublishedAt: "desc" });

  return (
    <section className="mt-96p lg:mt-120p">
      <div className="container">
        <SectionHeader
          heading="Find Your Genre"
          content="Browse through the most popular genres and find what interests you."
          decorationImage="/find-your-genre-shape.svg"
          decorationClassName="right-[-2.2rem] top-[-2.2rem] h-[4.1875rem] w-[3.75rem] md:right-[-2.875rem] md:top-[-2.5rem] md:h-[5.3125rem] md:w-[4.6875rem]"
        />

        {books.length !== 0 && <GenresContent genres={genres} books={books} />}
      </div>
    </section>
  );
};

export default Genres;
