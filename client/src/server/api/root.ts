import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { screenRouter } from "./routers/screenshot";
import { apiKeysRouter } from "./routers/apikeys";
import { userMetricsRouter } from "./routers/userMetrics";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  screenshot: screenRouter,
  apiKeys: apiKeysRouter,
  userMetrics: userMetricsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
