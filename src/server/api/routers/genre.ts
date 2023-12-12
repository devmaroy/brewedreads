import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

// Zod is used for schema validation

export const genreRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ orderByName: z.enum(["asc", "desc"]).optional() }))
    .query(({ ctx, input }) => {
      // Use the input for ordering.
      const orderByName = input.orderByName ?? "asc"; // Default to 'asc' if not provided

      return ctx.db.genre.findMany({
        where: {
          books: {
            some: {},
          },
        },
        orderBy: {
          name: orderByName,
        },
      });
    }),
});
