import { router, publicProcedure } from '../trpc'
import { z } from "zod";

export const useractionRouter = router({
    saveUser: publicProcedure
        .input(
            z.object({
            username: z.string()
        }),
    )
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.prisma.userActions.create({
                data: {
                username: input.username
            }
        })
        return user;
    }),
    
})