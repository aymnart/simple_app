import { auth } from "@/auth";
import "@/css/globals.css";
import { getUserPreferenceById } from "@/data/user-preference";
import { Toaster } from "@/components/ui/toaster";
import { fontMap } from "@/font.config";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = (await auth())?.user;

  // Fetch user preferences (server-side)
  if (!user?.id) {
    return { error: "Unauthorized" };
  }

  const userPref = await getUserPreferenceById(user.id);
  const theme = userPref?.theme || "light";
  const font = userPref?.font || "Inter";

  return (
    <html lang="en" className={theme}>
      <body className={cn(fontMap[font], "antialiased")}>
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
