import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod"; // Zod is used for schema validation

export const bookRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        // orderByCreatedAt: z.enum(["asc", "desc"]).optional(),
        orderByPublishedAt: z.enum(["asc", "desc"]).optional(),
        genre: z.string().optional(),
        limit: z.number().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      // Use the input for ordering.
      // const orderByCreatedAt = input.orderByCreatedAt ?? "desc"; // Default to 'asc' if not provided
      const limit = input.limit ?? 6;
      const orderByPublishedAt = input.orderByPublishedAt ?? "desc"; // Default to 'asc' if not provided

      // Filter by genre
      const genreFilter = input.genre
        ? {
            genres: {
              some: {
                name: input.genre,
              },
            },
          }
        : {};

      return ctx.db.book.findMany({
        where: genreFilter,
        orderBy: {
          // createdAt: orderByCreatedAt,
          publishedDate: orderByPublishedAt,
        },
        take: limit,
      });
    }),
});
