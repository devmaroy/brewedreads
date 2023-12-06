import { postRouter } from "@/server/api/routers/post";
import { genreRouter } from "@/server/api/routers/genre";
import { bookRouter } from "@/server/api/routers/book";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  genre: genreRouter,
  book: bookRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
