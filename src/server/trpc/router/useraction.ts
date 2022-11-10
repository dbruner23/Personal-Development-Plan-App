import { router, publicProcedure } from '../trpc'
import { z } from "zod";

export const useractionRouter = router({
    savePttrials: publicProcedure
        .input(
            z.object({
                pttrials: z.string(),
                username: z.string(),
                feedbackData: z.string()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const pttrialslog = await ctx.prisma.userActions.create({
                data: {
                    pttrials: input.pttrials,
                    username: input.username,
                    ptfeedback: input.feedbackData
                }
            })
            return pttrialslog;
        }),
    
})