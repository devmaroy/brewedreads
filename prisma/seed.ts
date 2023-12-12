import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

import mockData from "./seed-data.json";

const prisma = new PrismaClient();

async function main() {
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

  const users = await Promise.all(
    mockData.users.map((user) => prisma.user.create({ data: user })),
  );

  if (users.length === 0) {
    throw new Error("No users found. Make sure the users array is not empty.");
  }

  for (const book of mockData.books) {
    const genreConnections = book.genres
      .map((genreName) => {
        const genre = genres.find((g) => g.name === genreName);
        return genre ? { id: genre.id } : null;
      })
      .filter((g): g is { id: string } => g !== null); // Ensure no null values

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
