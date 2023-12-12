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
          sizes="(min-width: 1120px) 155px, (min-width: 1040px) 139px, (min-width: 780px) 160px, (min-width: 680px) 187px, (min-width: 480px) 28.33vw, (min-width: 340px) calc(50vw - 24px), calc(-700vw + 2376px)"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
      </Link>
    </div>
  );
};

export default GenreBook;
