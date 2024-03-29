import { bookRouter } from "@/server/api/routers/book";
import { genreRouter } from "@/server/api/routers/genre";
import { reviewRouter } from "@/server/api/routers/review";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  genre: genreRouter,
  book: bookRouter,
  review: reviewRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
