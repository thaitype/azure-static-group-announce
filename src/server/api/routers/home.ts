import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const homeRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input, ctx }) => {
      ctx.context.log("Hello ", input.text);
      return {
        greeting: `Hellox ${input.text}`,
      };

    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      ctx.context.log("Create post name: ", input.name);
      return {
        message: `Post created: ${input.name}`,
      }
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = {
      title: "Hello XXX",
    }
    return post ?? null;
  }),

  showGroup: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return `Group Annoucement for ${input.userId}`;
    }),

});
