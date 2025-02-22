"use client";
import { api } from "@/trpc/react";
import React from "react";

type Props = {
  isCollapsed: boolean;
};

const AccountSwitcher = ({ isCollapsed }: Props) => {
  const { data } = api.account.getAccounts.useQuery();
  if (!data) {
    return;
  }
  return (
    <>
      {data?.map((account) => {
        return <div key={account.id}>{account.email}</div>;
      })}
    </>
  );
};

export default AccountSwitcher;
