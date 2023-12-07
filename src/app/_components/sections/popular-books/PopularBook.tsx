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
  genres,
  teaser,
}: PopularBookProps) => {
  return (
    <Card className="flex flex-col rounded-md border-none bg-card-foreground">
      <CardHeader className="px-16p py-24p !pb-0 text-white md:px-20p md:py-32p">
        <div className="relative h-[14.5rem] md:h-[17.5rem]">
          <Image
            src={coverImageUrl}
            alt={`${title} book cover`}
            fill
            objectFit="cover"
            objectPosition="center center"
            className="rounded-md"
          />
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
                    className="text-16p text-base transition-all hover:text-primary"
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
        <CardDescription className="text-16p text-base leading-1.6">
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
