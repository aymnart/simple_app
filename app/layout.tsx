import { auth } from "@/auth";
import "@/css/globals.css";
import { getUserPreferenceById } from "@/data/user";
import { Toaster } from "@/components/ui/toaster";
import { defaultFont, fontMap } from "@/font.config";
import { cn } from "@/lib/utils";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;
  // Fetch user preferences (server-side)
  let theme = "light";
  let font = "Inter";

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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
