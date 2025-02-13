import { Separator } from "@/components/ui/separator";
import { AppearanceForm } from "./appearance-form";
import { getUserPreferenceById } from "@/data/user";
import { auth } from "@/auth";

export default async function SettingsAppearancePage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return <p>You need to be logged in to edit preferences.</p>;
  }

  const userPreference = await getUserPreferenceById(userId);

  const theme = userPreference?.theme || "light";
  const font = userPreference?.font || "inter";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm theme={theme} font={font} />
    </div>
  );
}
