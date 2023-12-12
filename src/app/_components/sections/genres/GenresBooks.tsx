import GenreBook from "@/app/_components/sections/genres/GenreBook";
import { type Book } from "@/types/types";

interface GenresBooks {
  books: Book[];
}

const GenresBooks = ({ books }: GenresBooks) => {
  return (
    <div className="mt-32p grid grid-cols-fluid-fill-8-5 gap-24p md:gap-32p">
      {books.map(({ id, title, slug, coverImageUrl }) => (
        <GenreBook
          key={id}
          title={title}
          slug={slug}
          coverImageUrl={coverImageUrl}
        />
      ))}
    </div>
  );
};

export default GenresBooks;
