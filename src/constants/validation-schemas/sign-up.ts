import { z } from 'zod';

import { credentialsSchema } from './credentials';
import { emailSchema } from './e-mail';
import { VALIDATION_ERRORS } from './validation-error-messages';

const userNameValidation = z
    .string()
    .min(1, { message: VALIDATION_ERRORS.nameEmpty })
    .regex(/^[А-Яа-яЁё]/, { message: VALIDATION_ERRORS.firstLetterError })
    .regex(/^[А-Яа-яЁё\- ]+$/, { message: VALIDATION_ERRORS.cyrillicOnly })
    .max(50, { message: VALIDATION_ERRORS.maxLength });

export const signUpSchema = credentialsSchema
    .extend({
        email: emailSchema.shape.email,
        firstName: userNameValidation,
        lastName: userNameValidation,
    })
    .superRefine(({ password, passwordConfirm }, ctx) => {
        if (passwordConfirm !== password) {
            ctx.addIssue({
                code: 'custom',
                message: VALIDATION_ERRORS.matchesPassword,
                path: ['passwordConfirm'],
            });
        }
    });

export type SignUpSchema = z.output<typeof signUpSchema>;
