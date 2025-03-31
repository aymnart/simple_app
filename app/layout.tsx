import { auth } from "@/auth";
import "@/css/globals.css";
import { getUserPreferenceById } from "@/data/user-preference";
import { Toaster } from "@/components/ui/toaster";
import { defaultFont, fontMap } from "@/font.config";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;
  let theme = "light";
  let font = "Inter";

  // Fetch user preferences (server-side)
  if (user?.id) {
    const userPref = await getUserPreferenceById(user.id);
    theme = userPref?.theme || "light";
    font = userPref?.font || "Inter";
  }

  return (
    <html lang="en" className={theme}>
      <body
        className={cn(fontMap[font] || defaultFont.className, "antialiased")}
      >
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
