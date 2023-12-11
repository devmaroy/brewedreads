import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod"; // Zod is used for schema validation

export const bookRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        sortBy: z
          .enum(["title", "publishedDate", "pageCount", "averageRating"])
          .optional(),
        sortOrder: z.enum(["asc", "desc"]).optional(),
        orderByPublishedAt: z.enum(["asc", "desc"]).optional(),
        genre: z.union([z.string(), z.array(z.string())]).optional(),
        searchTerm: z.string().optional(),
        limit: z.number().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      const limit = input.limit ?? 10;

      // Filter by genres

      // Create a variable that is always an array to simplify the filter logic
      const genreArray = Array.isArray(input.genre)
        ? input.genre
        : input.genre
          ? [input.genre]
          : [];

      // Filter by genre
      let genreFilter = {};
      if (genreArray && genreArray.length > 0) {
        // Filter by specific genres
        genreFilter = {
          OR: genreArray.map((genre) => ({
            genres: {
              some: {
                name: genre,
              },
            },
          })),
        };
      } else {
        // No genre filter applied, return all books
        genreFilter = {};
      }

      // Filter by search term
      const searchTermFilter = input.searchTerm
        ? {
            title: {
              contains: input.searchTerm,
              mode: "insensitive",
            },
          }
        : {};

      // Filter by sortBy
      let orderBy = {};
      if (input.sortBy) {
        orderBy = {
          [input.sortBy]: input.sortOrder ?? "asc",
        };
      } else {
        orderBy = {
          publishedDate: "desc",
        };
      }

      return ctx.db.book.findMany({
        where: {
          AND: [genreFilter, searchTermFilter],
        },
        orderBy,
        take: limit,
        include: {
          genres: true,
          author: true,
        },
      });
    }),
  getPopularBooks: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 6;

      // Fetch the top books based on average rating directly from the database
      const books = await ctx.db.book.findMany({
        take: limit,
        orderBy: {
          averageRating: "desc",
        },
        include: {
          ratings: {
            select: {
              score: true,
            },
          },
          genres: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
            orderBy: {
              name: "asc",
            },
          },
        },
      });

      return books;
    }),
});
