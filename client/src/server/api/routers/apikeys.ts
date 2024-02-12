import crypto from 'crypto'

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const apiKeysRouter = createTRPCRouter({ 
    getAPIKey: protectedProcedure.query(async ({ ctx, input }) => { 
        const randomKey = crypto.randomBytes(32).toString('base64')
        
        const apiKey = await ctx.db.userAccessKeys.findFirst({ where:{ userId: ctx.session.user.id} })   
    
        if(!apiKey){   
            return ctx.db.userAccessKeys.create({
                data: {
                    key: randomKey,
                    userId: ctx.session.user.id
                }
            })
        }else{
            return apiKey 
        }
    }),

    delete: protectedProcedure.mutation(async ({ ctx, input }) => { 
        const apiKey = await ctx.db.userAccessKeys.findFirst({ where:{ userId: ctx.session.user.id} })

        if(apiKey){
            return ctx.db.userAccessKeys.delete({
                where: {
                    id: apiKey.id
                }
            })
        }else{
            return null
        }
    }),

})