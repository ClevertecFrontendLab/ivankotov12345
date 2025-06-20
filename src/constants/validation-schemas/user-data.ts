import { z } from 'zod';

import { emailSchema } from './e-mail';
import { VALIDATION_ERRORS } from './validation-error-messages';

export const userNameValidation = z
    .string()
    .min(1, { message: VALIDATION_ERRORS.nameEmpty })
    .regex(/^[А-Яа-яЁё]/, { message: VALIDATION_ERRORS.firstLetterError })
    .regex(/^[А-Яа-яЁё-]+$/, { message: VALIDATION_ERRORS.cyrillicOnly })
    .max(50, { message: VALIDATION_ERRORS.maxLength });

export const userDataSchema = z.object({
    email: emailSchema.shape.email,
    firstName: z.string().min(1, { message: VALIDATION_ERRORS.nameEmpty }).and(userNameValidation),
    lastName: z
        .string()
        .min(1, { message: VALIDATION_ERRORS.lastNameEmpty })
        .and(userNameValidation),
});

export type UserDataSchema = z.output<typeof userDataSchema>;
