import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import Rating from "@/app/_components/ui/custom/Rating";
import { type Book } from "@/types/types";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type PopularBookProps = Book;

const PopularBook = ({
  coverImageUrl,
  averageRating,
  title,
  slug,
  author,
  genres,
  teaser,
}: PopularBookProps) => {
  return (
    <Card className="flex flex-col rounded-md border-none bg-card-foreground">
      <CardHeader className="px-16p py-24p !pb-0 text-white md:px-20p md:py-32p">
        <div className="relative h-[14.5rem] sm:h-[17.5rem]">
          <Link href={`/books/${slug}`}>
            <Image
              src={coverImageUrl}
              alt={`${title} book cover`}
              fill
              className="rounded-md transition-all hover:opacity-80"
              style={{ objectFit: "cover", objectPosition: "center center" }}
            />
          </Link>

          {author && (
            <Link href={`/authors/${author.slug}`}>
              <span className="bg-gradient absolute bottom-8p left-1/2 -translate-x-1/2 transform  rounded-md  px-22p  py-8p text-center text-14p font-bold text-white lg:bottom-16p lg:left-auto lg:right-16p  lg:translate-x-0 lg:transform-none">
                {author.name}
              </span>
            </Link>
          )}
        </div>

        <div className="!mt-24p">
          <div>
            <Rating rating={averageRating} />
          </div>

          <ul className="mb-32p mt-24p flex flex-wrap gap-8p">
            {genres &&
              genres.length !== 0 &&
              genres.map(({ id, name, slug }) => (
                <li key={id} className="dot-shape-pseudo">
                  <Link
                    href={`/genres/${slug}`}
                    className="text-16p text-muted transition-all hover:text-primary"
                  >
                    {name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <CardTitle className="!mb-16p font-serif text-24p">{title}</CardTitle>
      </CardHeader>

      <CardContent className="px-16p !pb-0 md:px-20p">
        <CardDescription className="text-16p leading-1.6 text-muted">
          {teaser}
        </CardDescription>
      </CardContent>

      <CardFooter className="mt-auto px-16p pb-24p md:px-20p md:pb-32p">
        <Button className="bg-gradient mt-40p !h-52p rounded-full !px-24p !text-16p">
          <Link href={`/books/${slug}`}>See more</Link>
          <ChevronRightIcon className="ml-8p h-4 w-4" strokeWidth={3} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PopularBook;
