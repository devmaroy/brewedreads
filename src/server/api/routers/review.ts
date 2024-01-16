import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const reviewRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        cursor: z.string().optional(),
        limit: z.number().min(1).max(100).default(10),
        select: z.object({
          id: z.boolean().optional(),
          createdDate: z.boolean().optional(),
          content: z.boolean().optional(),
          user: z
            .object({
              select: z.object({
                id: z.boolean().optional(),
                name: z.boolean().optional(),
                avatar: z.boolean().optional(),
              }),
            })
            .optional(),
          rating: z
            .object({
              select: z.object({
                id: z.boolean().optional(),
                score: z.boolean().optional(),
              }),
            })
            .optional(),
        }),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { cursor, limit, select } = input;

      const [reviews] = await db.$transaction([
        db.review.findMany({
          take: limit + 1,
          cursor: cursor ? { id: cursor } : undefined,
          select,
        }),
      ]);

      let nextCursor: typeof cursor | undefined = undefined;

      if (reviews.length > limit) {
        const nextItem = reviews.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        reviews,
        nextCursor,
      };
    }),
});
