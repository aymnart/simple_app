import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const authoriseAccountAccess = async (
  accountId: string,
  userId: string
) => {
  const account = await db.account.findFirst({
    where: {
      id: accountId,
      userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      access_token: true,
    },
  });
  if (!account) {
    throw new Error("Account not found!");
  }
  return account;
};

export const accountRouter = createTRPCRouter({
  getAccounts: privateProcedure.query(async ({ ctx }) => {
    try {
      const accounts = await ctx.db.account.findMany({
        where: { userId: ctx.auth.id },
        select: { id: true, email: true, name: true },
      });
      return accounts;
    } catch (error) {
      console.error("Error fetching accounts:", error);
      throw error;
    }
  }),
  getNumThreads: privateProcedure
    .input(
      z.object({
        accountId: z.string(),
        tab: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const account = await authoriseAccountAccess(
        input.accountId,
        ctx.auth.id
      );

      const filter: Prisma.ThreadWhereInput = {};
      if (input.tab === "inbox") {
        filter.inboxStatus = true;
      } else if (input.tab === "draft") {
        filter.draftStatus = true;
      } else if (input.tab === "sent") {
        filter.sentStatus = true;
      }
      return await ctx.db.thread.count({
        where: {
          accountId: account.id,
          ...filter,
        },
      });
    }),
});
