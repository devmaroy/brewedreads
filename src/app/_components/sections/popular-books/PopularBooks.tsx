import SectionHeader from "@/app/_components/ui/custom/SectionHeader";
import PopularBook from "@/app/_components/sections/popular-books/PopularBook";
import Image from "next/image";
import { api } from "@/trpc/server";

const PopularBooks = async () => {
  const popularBooks = await api.book.getPopularBooks.query({});

  return (
    <section className="z-99 relative mt-96p lg:mt-120p">
      <div className="container">
        <SectionHeader
          heading="Popular Books"
          content="Let’s see what are the most popular books."
          decorationImage="/popular-books-shape.svg"
          decorationClassName="right-[-4.2rem] top-[-2.6rem] h-[6.3125rem] w-[6.3125rem] md:right-[-11.8rem] md:top-[-6rem] md:h-[14.375rem] md:w-[14.375rem]"
        />

        <div className="mt-32p grid grid-cols-fluid-fill-18-5 gap-32p lg:gap-y-40p">
          {popularBooks.map(
            ({
              id,
              slug,
              coverImageUrl,
              averageRating,
              genres,
              title,
              teaser,
            }) => (
              <PopularBook
                key={id}
                id={id}
                slug={slug}
                coverImageUrl={coverImageUrl}
                averageRating={averageRating}
                genres={genres}
                title={title}
                description={teaser}
              />
            ),
          )}
        </div>

        <span className="absolute bottom-[32rem] right-[60%] -z-50 h-[867px] w-[885px] md:bottom-[2rem] md:right-[80%] xl:hidden">
          <Image
            src="/popular-books-shape-01.svg"
            fill
            alt="Decoration shapes"
          />
        </span>
      </div>
    </section>
  );
};

export default PopularBooks;
