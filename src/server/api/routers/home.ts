import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sheetClient } from "~/server/bootstrap";
import { GoogleSheetService } from "~/server/services/google-sheet-services";

export const homeRouter = createTRPCRouter({

  showGroup: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      try {
        const usersSheetClient = sheetClient.users;
        const googleSheetService = new GoogleSheetService(usersSheetClient);
        const user = await googleSheetService.getUserById(input.userId);
        return {
          message: 'Request Successful',
          status: 'ok' as const,
          found: !!user,
          name: user?.Name,
          group: user?.Group,
        }
      } catch (err) {
        console.error(err);
        return {
          message: 'Internal Server Error',
          status: 'error' as const,
          found: false,
        }
      }
    }),

});
