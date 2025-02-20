import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const homeRouter = createTRPCRouter({

  showGroup: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return `Group Annoucement for ${input.userId}`;
    }),

});
