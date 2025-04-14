"use server";
import "@/css/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { fontMap } from "@/font.config";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cache, Suspense } from "react";
import Loading from "./loading";
import { auth } from "@/auth";
import { getUserPreferenceById } from "@/data/user-preference";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

   // Cache the auth result to prevent duplicate calls
   const getAuthSession = cache(async () => await auth());
   // Get session first to correctly use the userId
   const session = await getAuthSession();
 
   // Get user preferences with the session ID
   const { theme, font } = await getUserPreferenceById(session?.user?.id,{theme:true,font:true});
  return (
    <html lang="en" className={theme} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content={theme} />      
      </head>
      <body className={cn(fontMap[font], "antialiased min-h-screen")}>
        <Suspense fallback={<Loading />}>
          <TooltipProvider delayDuration={1}>
            {children}
            <Toaster />
          </TooltipProvider>
        </Suspense>
      </body>
    </html>
  );
}
