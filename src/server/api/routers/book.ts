import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type Book } from "@/types/types";
import { z } from "zod";

export const bookRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        cursor: z.string().optional(),
        limit: z.number().min(1).max(100).default(10),
        genre: z.union([z.string(), z.array(z.string())]).optional(),
        searchTerm: z.string().optional(),
        sortBy: z
          .enum(["title", "publishedDate", "pageCount", "averageRating"])
          .optional()
          .default("publishedDate"),
        sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
        include: z.record(z.any()).optional().default({}),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { cursor, limit, genre, searchTerm, sortBy, sortOrder, include } =
        input;

      // Genres filter
      let genreFilter = {};
      if (genre) {
        const genreArray = Array.isArray(genre) ? genre : [genre];
        genreFilter = {
          OR: genreArray.map((genre) => ({
            genres: {
              some: {
                name: genre,
              },
            },
          })),
        };
      }

      // Search term filter
      let searchTermFilter = {};
      if (searchTerm) {
        searchTermFilter = {
          title: {
            contains: input.searchTerm,
            mode: "insensitive",
          },
        };
      }

      // SortBy filter
      let sortByFilter = {};
      if (sortBy && sortOrder) {
        sortByFilter = {
          [sortBy]: sortOrder,
        };
      }

      // Include
      let includeFilter = {};
      if (include) {
        includeFilter = include;
      }

      const books: Book[] = await db.book.findMany({
        take: limit + 1,
        where: {
          AND: [genreFilter, searchTermFilter],
        },
        orderBy: sortByFilter,
        cursor: cursor ? { id: cursor } : undefined,
        include: { ...includeFilter },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (books.length > limit) {
        const nextItem = books.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        books,
        nextCursor,
      };
    }),
});
