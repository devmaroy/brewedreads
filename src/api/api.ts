// REVIEW: try to encapsulate the logic in a function
import { api } from "@/trpc/server";

interface FetchBooksAndGenresProps {
  limit: number;
  include?: {
    author?: boolean;
    genres?: boolean;
  };
}

// REVIEW: Is trpc needed when serverside components.
// ANSWER: No. Maybe even with a slight perfomance problems, but it's consistent
// how data is fetched and manipulated -> same logic on client and server
export const fetchBooksAndGenres = async ({
  limit,
  include,
}: FetchBooksAndGenresProps) => {
  try {
    const [books, genres] = await Promise.all([
      api.book.getAll.query({
        limit,
        include,
      }),
      api.genre.getAll.query({}),
    ]);

    return {
      books: books.books,
      booksNextCursor: books.nextCursor,
      genres: genres.genres,
      isError: false,
      isSuccess: true,
      // Check if this works and you can use: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
      // Nope, it needs to be books &&
      hasBooks: books.books && books.books.length !== 0,
      hasGenres: genres.genres && genres.genres.length !== 0,
    };
  } catch (error) {
    return {
      books: [],
      booksNextCursor: "",
      genres: [],
      isError: true,
      isSuccess: false,
      hasBooks: false,
      hasGenres: false,
    };
  }
};

interface FetchGenresProps {
  limit: number;
}

export const fetchGenres = async ({ limit }: FetchGenresProps) => {
  try {
    const { genres, nextCursor } = await api.genre.getAll.query({ limit });

    return {
      genres,
      genresNextCursor: nextCursor,
      isError: false,
      isSuccess: true,
      hasGenres: genres && genres.length !== 0,
    };
  } catch (error) {
    return {
      genres: [],
      genresNextCursor: "",
      isError: false,
      isSuccess: true,
      hasGenres: false,
    };
  }
};

interface FetchBooksProps {
  limit: number;
  include?: {
    author?: boolean;
    genres?: boolean;
  };
}

export const fetchBooks = async ({ limit, include }: FetchBooksProps) => {
  try {
    const books = await api.book.getAll.query({
      limit,
      include,
    });

    return {
      books: books.books,
      booksNextCursor: books.nextCursor,
      isError: false,
      isSuccess: true,
      // Check if this works and you can use: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
      // Nope, it needs to be books &&
      hasBooks: books.books && books.books.length !== 0,
    };
  } catch (error) {
    return {
      books: [],
      booksNextCursor: "",
      isError: true,
      isSuccess: false,
      hasBooks: false,
    };
  }
};

interface FetchBookProps {
  slug: string;
  limitReviews?: number;
  include?: {
    author?: boolean;
    genres?: boolean;
    reviews?:
      | boolean
      | {
          select: {
            id?: boolean;
            createdDate?: boolean;
            content?: boolean;
            rating?: { select: { id: boolean; score: boolean } };
            user?: { select: { id: boolean; name: boolean; avatar: boolean } };
          };
        };
  };
}

export const fetchBookBySlug = async ({
  slug,
  include,
  limitReviews,
}: FetchBookProps) => {
  try {
    const { book, reviewsNextCursor } = await api.book.getOne.query({
      slug,
      limitReviews,
      include,
    });

    return {
      book,
      reviewsNextCursor,
      isError: false,
      isSuccess: true,
      hasBook: book !== null,
    };
  } catch (error) {
    return {
      book: null,
      reviewsNextCursor: "",
      isError: true,
      isSucces: false,
      hasBook: false,
    };
  }
};
