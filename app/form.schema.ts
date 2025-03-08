import { z } from 'zod';

export const formSchema = z.object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    citizenship: z.string().nullable(),
    linkedin: z.string().url('Invalid LinkedIn profile URL'),
    visas: z.array(z.string()).min(1, 'Select at least one visa of interest'), // Multi-select
    // resume: z.instanceof(File, { message: 'Resume file is required' }), // File upload
    additional: z.string().max(1000, 'Additional info should be under 1000 characters'),
});

export type SchemaType = z.infer<typeof formSchema>;
