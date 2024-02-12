import { z } from "zod";
import { uuid } from "uuidv4";

import { env } from "~/env";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { maxScreenshotSize } from "~/utils/contants";
import { PrismaClient } from "@prisma/client";

const screenshoturl = env.API_URL;
const imageUpload = env.UPLOAD_URL;

const canTakeScreenshots = async (db:PrismaClient,userId:string) =>{
  const currentYear = Number(new Date().getFullYear());
  const currentMonth = Number(new Date().getMonth() + 1);

  let currentMetric = await db.userMetrics.findUnique({
    where:{
      userId_month_year: {
        userId: userId,
        month: currentMonth,
        year: currentYear
      }
    },
  })

  if(!currentMetric){
    currentMetric = await db.userMetrics.create({
      data:{
          userId: userId,
          month: currentMonth,
          year: currentYear
      }
     })
  }

  if(currentMetric.screenshotTaken < currentMetric.screenshotLimit){
    return {
      canTakeScreenshot:true,
      currentMetric
    }
  }else {
    return {
      canTakeScreenshot:false,
      currentMetric
    }
  }

}

export const screenRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const db = ctx.db;
      const id = ctx.session.user.id;

      const { canTakeScreenshot,currentMetric } = await canTakeScreenshots(db,id);

      if(!canTakeScreenshot){
        return db.screenshot.create({
          data: {
            imageUrl: "",
            userProvidedUrl: input.url,
            userId: id,
            status: "ERROR",
            statusMessage: `You can't create more links, upgrade your plan`,
          },
        });
      }
      
      const resp = await fetch(`${screenshoturl}?url=${input.url}`);
      if (!resp.ok) {
        return db.screenshot.create({
          data: {
            imageUrl: "",
            userProvidedUrl: input.url,
            userId: id,
            status: "ERROR",
            statusMessage: `${resp.status}|| ${resp.statusText}`,
          },
        });
      }

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

      const resp2JSON = (await resp2.json()) as { url: string };

      const screenshot = db.screenshot.create({
        data: {
          imageUrl: resp2JSON.url,
          userProvidedUrl: input.url,
          userId: id,
          status: "SUCCESS",
        },
      });

      await db.userMetrics.update({
         where:{
          id: currentMetric.id
         },
         data:{
          screenshotTaken: currentMetric.screenshotTaken + 1
         }
       })

      return screenshot;

    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.screenshot.findMany({
      orderBy: { createdAt: "desc" },
      where: { userId: ctx.session.user.id },
    });
  }),
});
