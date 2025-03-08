import { z } from 'zod';

export const formSchema = z.object({
    status: z.enum(['pending', 'reached_out']).optional(),
});

export type SchemaType = z.infer<typeof formSchema>;
