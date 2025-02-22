import { createTRPCRouter, privateProcedure } from "../trpc";

export const accountRouter = createTRPCRouter({
  getAccounts: privateProcedure.query(async ({ ctx }) => {
    try {
      console.log("Fetching accounts for user:", ctx.auth.id);
      const accounts = await ctx.db.account.findMany({
        where: { userId: ctx.auth.id },
        select: { id: true, email: true, name: true },
      });
      console.log("Accounts fetched successfully:", accounts);
      return accounts;
    } catch (error) {
      console.error("Error fetching accounts:", error);
      throw error;
    }
  }),
});
