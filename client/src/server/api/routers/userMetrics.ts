import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userMetricsRouter = createTRPCRouter({
  getCurrentMetrics: protectedProcedure.query(async ({ ctx }) => {
    const id = ctx.session.user.id;

    const currentYear = Number(new Date().getFullYear());
    const currentMonth = Number(new Date().getMonth() + 1);

    return ctx.db.userMetrics.findUnique({
      where: {
        userId_month_year: {
          userId: id,
          month: currentMonth,
          year: currentYear,
        },
      },
    });
  }),
});
