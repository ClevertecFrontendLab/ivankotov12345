import { z } from 'zod';

import { emailSchema } from './e-mail';
import { VALIDATION_ERRORS } from './validation-error-messages';

const userNameValidation = z
    .string()
    .min(1, { message: VALIDATION_ERRORS.nameEmpty })
    .regex(/^[А-Яа-яЁё]/, { message: VALIDATION_ERRORS.firstLetterError })
    .regex(/^[А-Яа-яЁё\- ]+$/, { message: VALIDATION_ERRORS.cyrillicOnly })
    .max(50, { message: VALIDATION_ERRORS.maxLength });

export const userDataSchema = z.object({
    email: emailSchema.shape.email,
    firstName: userNameValidation,
    lastName: userNameValidation,
});

export type UserDataSchema = z.output<typeof userDataSchema>;
