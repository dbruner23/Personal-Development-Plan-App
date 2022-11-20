import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const overallfeedbackRouter = router({
    saveOverallFeedback: publicProcedure
        .input(
            z.object({
                username: z.string(),
                finalOverallFeedback: z.string(),
                
            })
        )
        .mutation(async ({ ctx, input }) => {
            const pttrialslog = await ctx.prisma.overallFeedback.create({
                data: {
                    username: input.username,
                    overallfeedback: input.finalOverallFeedback
                }
            })
            return pttrialslog;
        }),
});
