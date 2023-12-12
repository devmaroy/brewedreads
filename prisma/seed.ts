import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

import mockData from "./seed-data.json";

// TestFunction(GetAverageRatingByRatings([1, 2, 3, 4, 5])).result(4.5); // true

const prisma = new PrismaClient();

// REVIEW TIP: generate ID upfront

const booksWithIds = mockData.books.map((book) => ({
  ...book,
  id: crypto.randomUUID(),
}));

async function main() {
  // REVIEW: Use createMany instead of one by one

  const authors = await Promise.all(
    mockData.authors.map((author) =>
      prisma.author.create({
        data: {
          name: author.name,
          slug: slugify(author.name.toLowerCase()),
        },
      }),
    ),
  );

  // REVIEW: Use createMany instead of one by one

  const genres = await Promise.all(
    mockData.genres.map((genre) =>
      prisma.genre.create({
        data: {
          name: genre.name,
          slug: slugify(genre.name.toLowerCase()),
        },
      }),
    ),
  );

  // REVIEW: Use createMany instead of one by one

  const users = await Promise.all(
    mockData.users.map((user) => prisma.user.create({ data: user })),
  );

  // REVIEW: Not needed, validation are mainly for dynamic data

  if (users.length === 0) {
    throw new Error("No users found. Make sure the users array is not empty.");
  }

  // REVIEW: fininsh this
  // Goal is to remove the double for loop
  // REVIEW: wrap to transaction
  const createdBooks = await prisma.book.createMany({
    data: mockData.books.map((book) => ({
      isbn: book.isbn,
      title: book.title,
      slug: slugify(book.title.toLowerCase()),
      publisher: book.publisher,
      publishedDate: new Date(book.publishedDate),
      pageCount: book.pageCount,
      description: book.description,
      teaser: book.teaser,
      language: book.language,
      coverImageUrl: book.coverImageUrl,
      coverImageWidth: book.coverImageWidth,
      coverImageHeight: book.coverImageHeight,
      authorId: authors.find((author) => author.name === book.author),
      userId: users?.[0]?.id,
      genres: genres.filter((genre) => book.genres.includes(genre.name)),

      // REVIEW: Better to use a function to calculate the average rating
      averageRating: getAverageRatingByRatings(book.ratings), // 4.3
    })),
  });

  const createdReviews = await prisma.review.createMany({
    data: mockData.books.map((book) => ({
      content: book.content,
      bookId: createdBook.id,
      userId: userId,
    })),
  });

  const createdRatings = await prisma.rating.createMany({
    data: mockData.books.map((book) => ({
      score: book.score,
      bookId: createdBook.id,
      userId: userId,
    })),
  });

  // REVIEW: transactions https://www.prisma.io/docs/orm/prisma-client/queries/transactions

  for (const book of mockData.books) {
    const genreConnections = book.genres.map((genreName) => {
      const genre = genres.find((g) => g.name === genreName);
      return genre ? { id: genre.id } : null;
    });

    const userId = users[0]?.id;
    if (!userId) {
      throw new Error("User ID is undefined.");
    }

    const author = authors.find((author) => author.name === book.author);
    if (!author) {
      throw new Error(`Author not found for book: ${book.title}`);
    }

    const createdBook = await prisma.book.create({
      data: {
        isbn: book.isbn,
        title: book.title,
        slug: slugify(book.title.toLowerCase()),
        publisher: book.publisher,
        publishedDate: new Date(book.publishedDate),
        pageCount: book.pageCount,
        description: book.description,
        teaser: book.teaser,
        language: book.language,
        coverImageUrl: book.coverImageUrl,
        coverImageWidth: book.coverImageWidth,
        coverImageHeight: book.coverImageHeight,
        authorId: author.id,
        userId: userId, // Ensure this matches the field name in your Prisma schema
        genres: {
          connect: genreConnections,
        },
      },
    });

    let totalScore = 0;

    for (const rating of book.ratings) {
      // REVIEW: use CreateMany instead of one by one
      const createdRating = await prisma.rating.create({
        data: {
          score: rating.score,
          bookId: createdBook.id,
          userId: userId,
        },
      });

      totalScore += createdRating.score;
    }

    // Calculate and update averageRating
    const averageRating =
      book.ratings.length > 0 ? totalScore / book.ratings.length : 0;
    await prisma.book.update({
      where: { id: createdBook.id },
      data: { averageRating },
    });

    for (const review of book.reviews) {
      await prisma.review.create({
        data: {
          content: review.content,
          bookId: createdBook.id,
          userId: userId,
        },
      });
    }
  }
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
