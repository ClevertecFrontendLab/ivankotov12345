import { z } from 'zod';

import { VALIDATION_ERRORS } from './validation-error-messages';

export const signInSchema = z.object({
    login: z
        .string()
        .min(1, { message: VALIDATION_ERRORS.loginEmpty })
        .max(50, { message: VALIDATION_ERRORS.maxLength }),
    password: z
        .string()
        .min(1, { message: VALIDATION_ERRORS.passwordEmpty })
        .max(50, { message: VALIDATION_ERRORS.maxLength }),
});

export type SignInSchema = z.output<typeof signInSchema>;
