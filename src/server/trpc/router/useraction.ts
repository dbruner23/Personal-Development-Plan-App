import { router, publicProcedure } from '../trpc'
import { z } from "zod";

export const useractionRouter = router({
    savePttrials: publicProcedure
        .input(
            z.object({
                username: z.string(),
                prototypeId: z.string(),
                pttrials: z.string(),
                prototypeFeedback: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const pttrialslog = await ctx.prisma.userActions.create({
                data: {
                    username: input.username,
                    prototype: input.prototypeId,
                    pttrials: input.pttrials,
                    ptfeedback: input.prototypeFeedback            
                }
            })
            return pttrialslog;
        }),
    getPttrials: publicProcedure
        .query(async ({ ctx, input }) => {
            const pttrialsData = await ctx.prisma.userActions.findMany({
                select: {
                    pttrials: true
                }
            })
            return pttrialsData
        })
        
        
    
})