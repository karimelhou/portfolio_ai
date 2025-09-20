import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Please provide your name.'),
  email: z.string().email('A valid email is required.'),
  message: z.string().min(10, 'Please describe your project or question.'),
  locale: z.string()
});

export type ContactFormValues = z.infer<typeof contactSchema>;
