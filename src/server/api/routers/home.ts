import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sheetClient } from "~/server/bootstrap";
import { GoogleSheetService } from "~/server/services/google-sheet-services";

export const homeRouter = createTRPCRouter({

  showGroup: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const usersSheetClient = sheetClient.users;
      const googleSheetService = new GoogleSheetService(usersSheetClient);
      await googleSheetService.getUsers();
      return `Group Annoucement for ${input.userId}`;
    }),

});
