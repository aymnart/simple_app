import { auth } from "@/auth";
import "@/css/globals.css";
import { getUserPreferenceById } from "@/data/user-preference";
import { Toaster } from "@/components/ui/toaster";
import { fontMap } from "@/font.config";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense, cache } from "react";
import { Loader2 } from "lucide-react";

// App configuration constants
const CONFIG = {
  PREFERENCES: {
    THEME: "light",
    FONT: "Inter",
  },
  LANG: "en",
};

// Cache the auth result to prevent duplicate calls
const getAuthSession = cache(async () => await auth());

/**
 * Cached function to fetch user preferences with fallback to defaults
 * @param userId The user's ID
 * @returns User theme and font preferences
 */
const getUserPreferences = cache(async (userId?: string) => {
  if (!userId) {
    return { theme: CONFIG.PREFERENCES.THEME, font: CONFIG.PREFERENCES.FONT };
  }

  try {
    const prefs = await getUserPreferenceById(userId);
    return {
      theme: prefs?.theme || CONFIG.PREFERENCES.THEME,
      font: prefs?.font || CONFIG.PREFERENCES.FONT,
    };
  } catch (error) {
    console.error("Failed to fetch user preferences:", error, userId);
    return { theme: CONFIG.PREFERENCES.THEME, font: CONFIG.PREFERENCES.FONT };
  }
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get session first to correctly use the userId
  const session = await getAuthSession();

  // Get user preferences with the session ID
  const { theme, font } = await getUserPreferences(session?.user?.id).catch(
    () => ({
      theme: CONFIG.PREFERENCES.THEME,
      font: CONFIG.PREFERENCES.FONT,
    })
  );

  // Validate font exists in fontMap or use default
  const safeFont = font in fontMap ? font : CONFIG.PREFERENCES.FONT;

  return (
    <html lang={CONFIG.LANG} className={theme} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content={theme} />
      </head>
      <body
        className={cn(
          fontMap[safeFont],
          "antialiased min-h-screen bg-background text-foreground"
        )}
      >
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen w-full">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          }
        >
          <TooltipProvider delayDuration={300}>
            {children}
            <Toaster />
          </TooltipProvider>
        </Suspense>
      </body>
    </html>
  );
}
