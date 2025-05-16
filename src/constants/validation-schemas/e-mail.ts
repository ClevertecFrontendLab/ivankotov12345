import { z } from 'zod';

import { VALIDATION_ERRORS } from './validation-error-messages';

export const emailSchema = z.object({
    email: z
        .string()
        .min(1, { message: VALIDATION_ERRORS.emailEmpty })
        .max(50, { message: VALIDATION_ERRORS.maxLength })
        .email({ message: VALIDATION_ERRORS.incorrectEmail }),
});

export type EmailSchema = z.output<typeof emailSchema>;
