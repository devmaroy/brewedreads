import Link from "next/link";
import Image from "next/image";
import { type Book } from "@/types/types";

interface GenreBookProps {
  title: Book["title"];
  slug: Book["slug"];
  coverImageUrl: Book["coverImageUrl"];
}

const GenreBook = ({ title, slug, coverImageUrl }: GenreBookProps) => {
  return (
    <div>
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
  );
};

export default GenreBook;
