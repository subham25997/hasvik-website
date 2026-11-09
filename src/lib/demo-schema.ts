import { z } from "zod";

z.config({ jitless: true });

export type DemoValidationMessages = {
  name: string;
  phone: string;
  email: string;
  category: string;
};

const defaultMessages: DemoValidationMessages = {
  name: "Enter a name with at least 2 characters.",
  phone: "Enter a valid phone number.",
  email: "Enter a valid email address.",
  category: "Choose a category.",
};

export function demoFieldsSchema(messages: DemoValidationMessages = defaultMessages) {
  return z.object({
    leadType: z.enum(["business", "individual"]),
    name: z.string().trim().min(2, messages.name).max(100, messages.name),
    phone: z
      .string()
      .trim()
      .min(7, messages.phone)
      .max(24, messages.phone)
      .regex(/^[+\d\s().-]+$/, messages.phone),
    email: z.union([z.literal(""), z.string().trim().email(messages.email).max(120, messages.email)]),
    categoryId: z.string().trim().min(1, messages.category).max(100),
    city: z.string().trim().max(80),
    description: z.string().trim().max(1000),
    website: z.string(),
  });
}

export const demoServerSchema = demoFieldsSchema().extend({
  website: z.string().max(0),
  startedAt: z.number().int().nonnegative(),
});

export type DemoFields = z.infer<ReturnType<typeof demoFieldsSchema>>;
