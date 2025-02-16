"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect, useTransition } from "react";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { appearanceFormSchema } from "@/schemas";
import { updateAppearancePreferences } from "@/actions/preferences";
import { useCurrentUser } from "@/hooks/use-current-user";
import { fontMap, fontsList } from "@/font.config";
import ModeSkeleton from "./mode-skeleton";

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

type AppearanceFormProps = {
  theme: string;
  font: string;
};

export function AppearanceForm({ theme, font }: AppearanceFormProps) {
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();
  const [defaultValues, setDefaultValues] =
    useState<AppearanceFormValues | null>(null);

  // Fetch user preferences when component mounts
  useEffect(() => {
    async function fetchPreferences() {
      if (user?.id) {
        setDefaultValues({
          theme: theme === "light" || theme === "dark" ? theme : "light",
          font: fontsList.includes(font) ? font : fontsList[0],
        });
      }
    }
    fetchPreferences();
  }, [user?.id, theme, font]);

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: defaultValues || {},
  });

  // Prevent rendering until default values are set (fixes hydration issue)
  if (!defaultValues)
    return (
      <p className="flex items-center">
        <Loader className="animate-spin h-4 w-4 mr-4" />
        Loading preferences...
      </p>
    );

  function onSubmit(data: AppearanceFormValues) {
    startTransition(async () => {
      try {
        await updateAppearancePreferences(data);
        toast({ title: "User preferences updated!", variant: "success" });
        //reload the window after 1 sec so the user see the changes
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        toast({
          title: "Error",
          description: (error as Error).message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        {/* Font Selection */}
        <FormField
          control={form.control}
          name="font"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font</FormLabel>
              <div className="relative w-max">
                <FormControl>
                  <Select
                    disabled={isPending}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>

                    <SelectContent>
                      {fontsList.map((font, index) => (
                        <SelectItem value={font} key={index}>
                          <span className={fontMap[font]}>{font}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </div>
              <FormDescription>
                Set the font you want to use in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Theme Selection */}
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Theme</FormLabel>
              <FormDescription>
                Select the theme for the dashboard.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid max-w-md grid-cols-2 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem
                        disabled={isPending}
                        value="light"
                        className="sr-only"
                      />
                    </FormControl>
                    <ModeSkeleton mode="light" />
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem
                        disabled={isPending}
                        value="dark"
                        className="sr-only"
                      />
                    </FormControl>
                    <ModeSkeleton mode="dark" />
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button disabled={isPending} type="submit">
          {isPending ? (
            <div className="flex items-center">
              <Loader className="animate-spin mr-2" />
              Updating preferences
            </div>
          ) : (
            "Update preferences"
          )}
        </Button>
      </form>
    </Form>
  );
}
