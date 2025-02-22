import { Account } from "@/lib/account";
import { db } from "@/lib/db";
import { syncEmailsToDatabase } from "@/lib/sync-to-db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { accountId, userId } = await req.json();
  if (!accountId || !userId) {
    return NextResponse.json(
      {
        error: "Missing account id or user id!",
      },
      { status: 400 }
    );
  }

  const dbAccount = await db.account.findUnique({
    where: {
      id: accountId,
      userId,
    },
  });

  if (!dbAccount) {
    return NextResponse.json({ error: "Account not found!" }, { status: 404 });
  }

  if (!dbAccount.access_token) {
    return NextResponse.json(
      { error: "Access token not found!" },
      { status: 400 }
    );
  }
  //perform initial sync
  const account = new Account(dbAccount.access_token);
  const response = await account.performInitialSync();
  if (!response) {
    return NextResponse.json(
      { error: "Failed to perform inital sync!" },
      { status: 500 }
    );
  }

  const { emails, deltaToken } = response;

  await db.account.update({
    where: {
      id: accountId,
    },
    data: {
      nextDeltaToken: deltaToken,
    },
  });
  await syncEmailsToDatabase(emails, accountId);
  console.log("deltaToken :>> ", deltaToken);
  return NextResponse.json({ success: true }, { status: 200 });
};
