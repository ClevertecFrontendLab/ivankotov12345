import { z } from 'zod';

export const noteSchema = z.object({
    text: z.string().min(10).max(160),
});

export type NoteSchema = z.output<typeof noteSchema>;
