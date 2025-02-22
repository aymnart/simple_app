import { auth } from "@/auth";
import { exchangeCodeForAccessToken, getAccountDetails } from "@/lib/aurinko";
import { db } from "@/lib/db";
import { LOGIN_DEFAULT_REDIRECT } from "@/routes";
import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import axios from "axios";

export const GET = async (req: NextRequest) => {
  const userId = (await auth())?.user.id;
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const params = req.nextUrl.searchParams;
  const status = params.get("status");
  if (status !== "success") {
    return NextResponse.json(
      {
        message: "Failed to link account!",
      },
      { status: 400 }
    );
  }
  const code = params.get("code");
  if (!code) {
    return NextResponse.json(
      {
        message: "No code provided!",
      },
      { status: 400 }
    );
  }

  const token = await exchangeCodeForAccessToken(code);
  if (!token) {
    return NextResponse.json(
      {
        message: "Failed to exchange code for access token!",
      },
      { status: 400 }
    );
  }
  const accountDetails = await getAccountDetails(token.accessToken);

  await db.account.upsert({
    where: {
      id: token.accountId.toString(),
    },
    update: {
      access_token: token.accessToken,
    },
    create: {
      id: token.accountId.toString(),
      userId,
      email: accountDetails.email,
      name: accountDetails.name,
      access_token: token.accessToken,
    },
  });
  //trigger initial email sync
  waitUntil(
    axios
      .post(`${process.env.NEXT_PUBLIC_URL}/api/initial-sync`, {
        accountId: token.accountId.toString(),
        userId,
      })
      .then((response) => {
        console.log("Initial sync triggered :>> ", response.data);
      })
      .catch((error) => console.error("Failed to trigger initial sync", error))
  );
  return NextResponse.redirect(new URL(LOGIN_DEFAULT_REDIRECT, req.url));
};
