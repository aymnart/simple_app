import { Separator } from "@/components/ui/separator";
import { AppearanceForm } from "@/components/settings/appearance-form";
import { getUserPreferenceById } from "@/data/user-preference";
import { auth } from "@/auth";
import { fontsList } from "@/font.config";

export default async function SettingsAppearancePage() {
  const userId = (await auth())?.user?.id;

  if (!userId) {
    return <p>You need to be logged in to edit preferences.</p>;
  }

  const userPreference = await getUserPreferenceById(userId);

  const theme = userPreference?.theme || "light";
  const font = userPreference?.font || fontsList[0];

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
