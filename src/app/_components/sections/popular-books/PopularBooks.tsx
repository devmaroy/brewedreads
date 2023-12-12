import PopularBooksContent from "@/app/_components/sections/popular-books/PopularBooksContent";
import ErrorMessage from "@/app/_components/ui/custom/ErrorMessage";
import SectionHeader from "@/app/_components/ui/custom/SectionHeader";
import { api } from "@/trpc/server";

const PopularBooks = async () => {
  let popularBooks;
  let error;

  try {
    popularBooks = await api.book.getPopularBooks.query({});
  } catch (err) {
    error = err;
    console.error("Error fetching popular books:", error);
  }

  // Check if we have some error.
  if (error) {
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
  if (popularBooks && popularBooks.length > 0) {
    return (
      <section className="z-99 relative mt-96p lg:mt-120p">
        <div className="container">
          <SectionHeader
            heading="Popular Books"
            content="Let’s see what are the most popular books."
            decorationImage="/popular-books-shape.svg"
            decorationClassName="right-[-4.2rem] top-[-2.6rem] h-[6.3125rem] w-[6.3125rem] md:right-[-11.8rem] md:top-[-6rem] md:h-[14.375rem] md:w-[14.375rem]"
          />

          <PopularBooksContent popularBooks={popularBooks} />
        </div>
      </section>
    );
  }

  return null;
};

export default PopularBooks;
