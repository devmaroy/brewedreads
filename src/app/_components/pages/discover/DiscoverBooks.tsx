import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/_components/ui/card";
import Rating from "@/app/_components/ui/custom/Rating";
import { type Book } from "@/types/types";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DiscoverBooksProps {
  books: Book[];
}

const DiscoverBooks = ({ books }: DiscoverBooksProps) => {
  return (
    <div className="mt-56p grid grid-cols-fluid-fill-8-5 gap-x-24p gap-y-32p md:gap-x-32p md:gap-y-48p lg:mt-64p lg:grid-cols-fluid-fill-11">
      {books.map(
        ({ id, coverImageUrl, author, title, slug, genres, averageRating }) => (
          <Card key={id} className="border-none bg-card-foreground">
            <CardHeader className="bg-none p-0">
              <div className="relative">
                <Link href={`/books/${slug}`}>
                  <Image
                    src={coverImageUrl}
                    alt={`Book cover for ${title}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                    className="rounded-md transition-all hover:opacity-80"
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
            </CardHeader>

            <CardContent className="mt-24p p-0 lg:mt-32p">
              <Rating rating={averageRating} />

              <ul className="mt-16p flex flex-wrap gap-8p">
                {genres &&
                  genres.length !== 0 &&
                  genres.map(({ id, slug, name }) => (
                    <li key={id} className="dot-shape-pseudo text-14p">
                      <Link
                        href={`/genres/${slug}`}
                        className=" text-14p text-muted"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
              </ul>

              <h3 className="mt-16p font-serif text-16p font-bold text-white">
                {title}
              </h3>
            </CardContent>

            <CardFooter className="mt-24p p-0">
              <Button variant="link" className="p-0">
                <Link href={`/books/${slug}`} className="text-14p text-muted">
                  See More
                </Link>
                <ChevronRightIcon
                  className="ml-8p h-4 w-4 text-muted"
                  strokeWidth={3}
                />
              </Button>
            </CardFooter>
          </Card>
        ),
      )}
    </div>
  );
};

export default DiscoverBooks;
