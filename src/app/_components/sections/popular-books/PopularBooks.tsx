import { fetchBooks } from "@/api/api";
import PopularBooksContent from "@/app/_components/sections/popular-books/PopularBooksContent";
import ErrorMessage from "@/app/_components/ui/custom/ErrorMessage";
import SectionHeader from "@/app/_components/ui/custom/SectionHeader";

const PopularBooks = async () => {
  const { books, isError, isSuccess, hasBooks } = await fetchBooks({
    limit: 5,
    include: {
      author: true,
      genres: true,
    },
  });

  // Check if we have some error.
  if (isError || !isSuccess) {
    // Return an error message or a component to indicate the error
    return (
      <section className="z-99 relative mt-96p lg:mt-120p">
        <div className="container">
          <ErrorMessage />
        </div>
      </section>
    );
  }

  // Check if there are any books to display
  if (hasBooks) {
    return (
      <section className="z-99 relative mt-96p lg:mt-120p">
        <div className="container">
          <SectionHeader
            heading="Popular Books"
            content="Let’s see what are the most popular books."
            decorationImage="/popular-books-shape.svg"
            decorationClassName="right-[-4.2rem] top-[-2.6rem] h-[6.3125rem] w-[6.3125rem] md:right-[-11.8rem] md:top-[-6rem] md:h-[14.375rem] md:w-[14.375rem]"
          />

          <PopularBooksContent popularBooks={books} />
        </div>
      </section>
    );
  }
};

export default PopularBooks;
