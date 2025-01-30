import React from "react";
<<<<<<< HEAD
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
export default async function SettingsPage() {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
=======
import { auth } from "@/auth";
export default async function SettingsPage() {
  const session = await auth();
  return <div>{JSON.stringify(session)}</div>;
>>>>>>> faba722a5463531c5f1545214a45b747ef25443d
}
