import { type Book } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

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
          className="rounded-md transition-all hover:opacity-80"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
      </Link>
    </div>
  );
};

export default GenreBook;
