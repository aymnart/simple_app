"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect, useTransition } from "react";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { getUserPreferenceById } from "@/data/user";
import { fontsList } from "@/data/fonts";

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

export function AppearanceForm() {
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();
  const [defaultValues, setDefaultValues] =
    useState<AppearanceFormValues | null>(null);

  // Fetch user preferences when component mounts
  useEffect(() => {
    async function fetchPreferences() {
      if (user?.id) {
        const userPreference = await getUserPreferenceById(user.id);
        setDefaultValues({
          theme:
            userPreference?.theme === "light" ||
            userPreference?.theme === "dark"
              ? userPreference.theme
              : "light",
          font:
            userPreference && fontsList.includes(userPreference.font)
              ? userPreference.font
              : fontsList[0],
        });
      }
    }
    fetchPreferences();
  }, [user?.id]);

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Font Selection */}
        <FormField
          control={form.control}
          name="font"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font</FormLabel>
              <div className="relative w-max">
                <FormControl>
                  <select
                    disabled={isPending}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-[200px] appearance-none font-normal"
                    )}
                    {...field}
                    defaultValue={defaultValues.font}
                  >
                    <option value="inter">Choose font</option>
                    {fontsList.map((el, index) => (
                      <option value={el} key={index}>
                        {el}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
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
                defaultValue={defaultValues.theme}
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
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent hover:text-accent-foreground">
                      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Light
                    </span>
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
                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Dark
                    </span>
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
              Loading
            </div>
          ) : (
            "Update preferences"
          )}
        </Button>
      </form>
    </Form>
  );
}
