import BookInfo from "@/app/_components/pages/books/BookInfo";
import BookReviews from "@/app/_components/pages/books/BookReviews";
import { type SingleBook } from "@/types/types";

type BookProps = SingleBook;

const Book = ({
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
  reviews,
}: BookProps) => {
  return (
    <div>
      <BookInfo
        cover={cover}
        genres={genres}
        title={title}
        rating={rating}
        author={author}
        teaser={teaser}
        description={description}
        pageCount={pageCount}
        publishedDate={publishedDate}
        publisher={publisher}
      />

      {reviews && reviews.length > 0 && <BookReviews reviews={reviews} />}
    </div>
  );
};

export default Book;
