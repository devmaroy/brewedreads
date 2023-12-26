import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type Genre } from "@/types/types";
import { z } from "zod";

// Zod is used for schema validation

export const genreRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        cursor: z.string().optional(),
        limit: z.number().min(1).max(100).default(10),
        sortBy: z
          .enum(["", "name_asc", "name_desc", "slug_asc", "slug_desc"])
          .optional()
          .default("name_asc"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { cursor, limit, sortBy } = input;

      // SortBy filter
      const sortByItems = sortBy && sortBy.split("_");
      const sortByField = sortByItems[0] ?? "name";
      const sortByOrder = sortByItems[1] ?? "desc";

      const [genres]: [Genre[]] = await db.$transaction([
        db.genre.findMany({
          take: limit + 1,
          where: {
            books: {
              some: {},
            },
          },
          orderBy: {
            [sortByField]: sortByOrder,
          },
          cursor: cursor ? { id: cursor } : undefined,
        }),
      ]);

      let nextCursor: typeof cursor | undefined = undefined;

      if (genres.length > limit) {
        const nextItem = genres.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        genres,
        nextCursor,
      };
    }),
});
