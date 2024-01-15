import { Button } from "@/app/_components/ui/button";
import Rating from "@/app/_components/ui/custom/Rating";
import { formatDate } from "@/lib/utils";
import { type SingleBook } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

type BookInfoProps = Omit<SingleBook, "reviews">;

const BookInfo = ({
  cover,
  genres,
  title,
  rating,
  author,
  teaser,
  description,
  pageCount,
  publishedDate,
  publisher,
}: BookInfoProps) => {
  return (
    <div className="md:flex md:gap-48p">
      <article className="md:order-2">
        <header>
          <ul className="flex flex-wrap gap-16p">
            {genres.map(({ id, slug, name }) => (
              <li key={id}>
                <Button className="hover:bg-primary bg-foreground py-[0.75rem] px-[1.375rem] h-auto font-bold">
                  <Link href={`/genres/${slug}`}>{name}</Link>
                </Button>
              </li>
            ))}
          </ul>

          <h2 className="text-gradient mb-8p mt-24p font-serif text-clamp-32p-to-46p font-bold leading-1.2">
            {title}
          </h2>

          <div className="mt-8p">
            <Rating rating={rating} />
          </div>

          <div className="text-base mt-24p">
            by{" "}
            <Link
              href={`/authors/${author.slug}`}
              className="text-white font-medium"
            >
              {author.name}
            </Link>
          </div>
        </header>

        <div>
          <div className="mt-32p text-base leading-1.6">
            <p>{teaser}</p>
          </div>

          <div className="mt-40p text-white leading-1.6 text-18p font-medium italic">
            <p>"{description}"</p>
          </div>
        </div>

        <div className="mt-24p text-base separator-gradient">
          <div className="mt-16p">
            <p>Hardcover, {pageCount} pages</p>
          </div>

          <div className="mt-10p">
            <p>
              Published {formatDate(publishedDate)}
              <span className="block">by {publisher}</span>
            </p>
          </div>
        </div>
      </article>

      <div className="mt-96p md:mt-0 md:order-1 md:basis-10/12">
        <div>
          <Image
            src={cover.url}
            alt={`${title} book cover`}
            width={cover.width}
            height={cover.height}
            className="rounded-md"
            style={{ objectFit: "cover" }}
          />
        </div>

        <Button className="mt-16p w-full !py-16p h-auto bg-gradient font-bold text-16p">
          Add to Reading List
        </Button>
      </div>
    </div>
  );
};

export default BookInfo;
