import { type Book } from "@/types/types";
import GenreBook from "@/app/_components/sections/genres/GenreBook";

interface GenresBooks {
  books: Book[];
}

const GenresBooks = ({ books }: GenresBooks) => {
  return (
    <div className="grid-cols-fluid-fill mt-32p grid gap-24p md:gap-32p">
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
