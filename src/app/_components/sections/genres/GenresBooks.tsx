import Image from "next/image";
import { type Book } from "@/types/types";
import Link from "next/link";

interface GenresBooks {
  books: Book[];
}

const GenresBooks = ({ books }: GenresBooks) => {
  return (
    <div className="mt-32p grid grid-cols-fluid-fill gap-24p md:gap-32p">
      {books.map(({ id, title, slug, coverImageUrl }) => (
        <div key={id}>
          <Link href={`/books/${slug}`}>
            <Image
              src={coverImageUrl}
              alt={`${title} book cover`}
              objectFit="cover"
              className="rounded-md transition-all hover:opacity-80"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default GenresBooks;
