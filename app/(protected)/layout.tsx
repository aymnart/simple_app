import { SessionProvider } from "next-auth/react";
import React from "react";
import Navbar from "./_components/navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div>
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
}
