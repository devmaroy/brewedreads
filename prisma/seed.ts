import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

import mockData from "./seed-data.json";

const prisma = new PrismaClient();

const calculateAverageScore = (ratings: number[]) => {
  const sum = ratings.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  return sum / ratings.length;
};

async function main() {
  // Transaction pattern
  await prisma.$transaction([
    // Create authors
    prisma.author.createMany({
      data: mockData.authors.map((author) => ({
        id: author.id,
        name: author.name,
        slug: slugify(author.name.toLowerCase()),
      })),
    }),
    // Create genres
    prisma.genre.createMany({
      data: mockData.genres.map((genre) => ({
        id: genre.id,
        name: genre.name,
        slug: slugify(genre.name.toLowerCase()),
      })),
    }),
    // Create users
    prisma.user.createMany({
      data: mockData.users.map((user) => ({
        id: user.id,
        name: user.name,
        slug: slugify(user.name.toLowerCase()),
      })),
    }),
  ]);

  // Create books
  await prisma.$transaction(
    mockData.books.map((book) =>
      prisma.book.create({
        data: {
          id: book.id,
          isbn: book.isbn,
          title: book.title,
          slug: slugify(book.title.toLowerCase()),
          publisher: book.publisher,
          publishedDate: new Date(book.publishedDate),
          //  REVIEW:  not needed, prisma will automatically set the date for createdat and updatedat
          // createdDate: new Date().toISOString(),
          // updatedDate: new Date().toISOString(),
          pageCount: book.pageCount,
          description: book.description,
          teaser: book.teaser,
          language: book.language,
          coverImageUrl: book.coverImageUrl,
          coverImageWidth: book.coverImageWidth,
          coverImageHeight: book.coverImageHeight,
          averageRating: calculateAverageScore(
            book.ratings.map((rating) => rating.score),
          ),
          authorId: book.authorId,
          userId: book.userId,
          genres: {
            connect: mockData.genres
              .filter((genre) => book.genres.includes(genre.id))
              .map((genre) => ({ id: genre.id })),
          },
        },
      }),
    ),
  );
  //  REVIEW: one transaction is enough
  await prisma.$transaction([
    // Create reviews
    prisma.review.createMany({
      data: mockData.reviews.map((review) => ({
        id: review.id,
        content: review.content,
        bookId: review.bookId,
        userId: review.userId,
      })),
    }),
    // Create ratings
    prisma.rating.createMany({
      data: mockData.ratings.map((rating) => ({
        id: rating.id,
        score: rating.score,
        bookId: rating.bookId,
        userId: rating.userId,
      })),
    }),
  ]);
}

main()
  .then(async () => {
    console.log("Seed completed successfully.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
