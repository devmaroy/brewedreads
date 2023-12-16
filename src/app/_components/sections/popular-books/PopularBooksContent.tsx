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

interface PopularBooksContent {
  popularBooks: Book[];
}

const PopularBooksContent = ({ popularBooks }: PopularBooksContent) => {
  return (
    <div>
      <div className="mt-32p grid grid-cols-fluid-fill-18-5 gap-32p lg:gap-y-40p">
        {popularBooks.map(
          ({
            id,
            slug,
            coverImageUrl,
            averageRating,
            genres,
            title,
            author,
            teaser,
          }) => (
            <Card
              key={id}
              className="flex flex-col rounded-md border-none bg-card-foreground"
            >
              <CardHeader className="px-16p py-24p !pb-0 text-white md:px-20p md:py-32p">
                <div className="relative">
                  <Link
                    href={`/books/${slug}`}
                    className="relative block h-[14.5rem] sm:h-[17.5rem]"
                  >
                    <Image
                      src={coverImageUrl}
                      alt={`${title} book cover`}
                      fill
                      sizes="(min-width: 1120px) 301px, (min-width: 1040px) 269px, (min-width: 780px) 312px, (min-width: 680px) 576px, (min-width: 360px) calc(90.67vw - 22px), calc(50vw + 114px)"
                      className="rounded-md transition-all hover:opacity-80"
                      style={{
                        objectFit: "cover",
                        objectPosition: "center center",
                      }}
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

                <CardTitle className="!mb-16p font-serif text-24p">
                  {title}
                </CardTitle>
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
          ),
        )}
      </div>

      <span className="absolute bottom-[32rem] right-[60%] -z-50 h-[54.1875rem] w-[55.3125rem] md:bottom-[2rem] md:right-[80%] xl:hidden">
        <Image src="/popular-books-shape-01.svg" fill alt="Decoration shapes" />
      </span>

      <div className="mt-24p text-right md:mt-32p">
        <Button
          variant="link"
          className="p-0 !text-16p font-bold leading-1.5 text-white"
        >
          <Link href="/discover">Discover More Books</Link>
          <ChevronRightIcon className="ml-8p h-4 w-4" strokeWidth={3} />
        </Button>
      </div>
    </div>
  );
};

export default PopularBooksContent;
