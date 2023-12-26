import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type Book } from "@/types/types";
import { type Prisma } from "@prisma/client";
import { z } from "zod";

// Function to create genres filter
const createGenresFilter = (
  genres: string | string[] | undefined,
): Prisma.BookWhereInput => {
  if (!genres || genres.length === 0) return {};
  const slugFilter =
    typeof genres === "string" ? { equals: genres } : { in: genres };
  return { genres: { some: { slug: { ...slugFilter, mode: "insensitive" } } } };
};

export const bookRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        cursor: z.string().optional(),
        limit: z.number().min(1).max(100).default(10),
        genres: z.union([
          z.string().optional(),
          z.array(z.string()).optional(),
        ]),
        searchTerm: z.string().optional().default(""),
        sortBy: z
          .enum([
            "",
            "title_asc",
            "title_desc",
            "publishedDate_asc",
            "publishedDate_desc",
            "pageCount_asc",
            "pageCount_desc",
            "averageRating_asc",
            "averageRating_desc",
          ])
          .optional()
          .default("publishedDate_desc"),
        include: z
          .object({
            author: z.boolean().optional(),
            genres: z.boolean().optional(),
          })
          .optional()
          .default({}),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { cursor, limit, genres, searchTerm, sortBy, include } = input;

      // Genres filter
      const genresFilter = createGenresFilter(genres);

      // SortBy filter
      const [sortByField = "publishedDate", sortByOrder = "desc"] = sortBy
        ? sortBy.split("_")
        : [];

      // Where clause
      const where: Prisma.BookWhereInput = {
        AND: {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
          ...genresFilter,
        },
      };

      const [books]: [Book[]] = await db.$transaction([
        db.book.findMany({
          take: limit + 1,
          where,
          orderBy: {
            [sortByField]: sortByOrder,
          },
          cursor: cursor ? { id: cursor } : undefined,
          include: include,
        }),
      ]);

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
