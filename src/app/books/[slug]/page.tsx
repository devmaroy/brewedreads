import { fetchBookBySlug } from "@/api/api";
import Book from "@/app/_components/pages/books/Book";
import ErrorMessage from "@/app/_components/ui/custom/ErrorMessage";

interface BooksPageProps {
  params: {
    slug: string;
  };
}

const BooksPage = async ({ params }: BooksPageProps) => {
  const slug = params.slug ?? "";
  const { book } = await fetchBookBySlug({
    slug,
    include: {
      author: true,
      genres: true,
      reviews: {
        include: {
          rating: {
            select: {
              id: true,
              score: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  return (
    <main className="flex-1">
      <section className="mt-72p">
        <div className="sm:container">
          <div className="rounded-md bg-card-foreground px-12p py-40p sm:px-16p md:px-40p md:py-64p">
            {book && book !== null ? (
              <Book
                cover={{
                  width: book.coverImageWidth,
                  height: book.coverImageHeight,
                  url: book.coverImageUrl,
                }}
                genres={book.genres}
                title={book.title}
                rating={book.averageRating ?? 0}
                author={book.author}
                teaser={book.teaser}
                description={book.description}
                pageCount={book.pageCount}
                publishedDate={book.publishedDate}
                publisher={book.publisher}
                reviews={book.reviews}
              />
            ) : (
              <ErrorMessage />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BooksPage;
