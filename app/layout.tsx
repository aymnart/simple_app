import { auth } from "@/auth";
import "./globals.css";
import { getUserPreferenceById } from "@/data/user";
import { Toaster } from "@/components/ui/toaster";
import { defaultFont, fontMap } from "@/data/fonts";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;
  // Fetch user preferences (server-side)
  let theme = "light";
  let font = "inter";

  if (user?.id) {
    const userPref = await getUserPreferenceById(user.id);
    theme = userPref?.theme || "light";
    font = userPref?.font || "inter";
  }

  return (
    <html lang="en" className={theme}>
      <body className={fontMap[font] || defaultFont.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
