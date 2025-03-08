import { z } from 'zod';

export const formSchema = z.object({
    search: z.string().trim().optional(),
    status: z.enum(['pending', 'reached_out', 'all']).optional(),
});

export type SchemaType = z.infer<typeof formSchema>;
