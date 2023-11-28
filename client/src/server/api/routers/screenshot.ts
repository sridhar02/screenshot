import { z } from "zod";
import { uuid } from "uuidv4";

import { env } from "~/env";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const screenRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const id = ctx.session.user.id;
      const screenshoturl = env.API_URL;
      const imageUpload = env.UPLOAD_URL;

      const resp = await fetch(`${screenshoturl}?url=${input.url}`);

      const imageBlob = await resp.blob();
      const imageId = uuid();

      const resp2 = await fetch(`${imageUpload}/${imageId}`, {
        method: "PUT",
        body: imageBlob,
        headers: {
          "content-type": "application/octet-stream",
          accept: "application/json",
        },
      });

      const resp2JSON = await resp2.json();

      return ctx.db.screenshot.create({
        data: {
          imageUrl: resp2JSON.url,
          userProvidedUrl: input.url,
          userId: id,
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.screenshot.findMany({
      orderBy: { createdAt: "desc" },
      where: { userId: ctx.session.user.id },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
