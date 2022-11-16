import { router, publicProcedure } from '../trpc'
import { z } from "zod";

export const useractionRouter = router({
    savePttrials: publicProcedure
        .input(
            z.object({
                username: z.string(),
                pttrials: z.string(),
                prototypeFeedback: z.string(),
                finalOverallFeedback: z.string()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const pttrialslog = await ctx.prisma.userActions.create({
                data: {
                    username: input.username,
                    pttrials: input.pttrials,
                    ptfeedback: input.prototypeFeedback,
                    overallfeedback: input.finalOverallFeedback
                }
            })
            return pttrialslog;
        }),
    
})