import * as z from "zod";
import { fontsList } from "@/font.config";

export const appearanceFormSchema = z.object({
  theme: z.string().optional(),
  font: z
    .enum(fontsList as [string, ...string[]], {
      invalid_type_error: "Select a font",
      required_error: "Please select a font.",
    })
    .optional(),
});
