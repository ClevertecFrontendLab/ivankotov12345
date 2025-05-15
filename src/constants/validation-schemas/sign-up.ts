import { z } from 'zod';

import { VALIDATION_ERRORS } from './validation-error-messages';

const passwordValidation = z
    .string()
    .min(1, { message: VALIDATION_ERRORS.passwordEmpty })
    .regex(/^[A-Za-z0-9!@#$&_+.-]{8,}$/, { message: VALIDATION_ERRORS.incorrectFormat })
    .max(50, { message: VALIDATION_ERRORS.maxLength });

const userNameValidation = z
    .string()
    .min(1, { message: VALIDATION_ERRORS.nameEmpty })
    .regex(/^[А-Яа-яЁё]/, { message: VALIDATION_ERRORS.firstLetterError })
    .regex(/^[А-Яа-яЁё\- ]+$/, { message: VALIDATION_ERRORS.cyrillicOnly })
    .max(50, { message: VALIDATION_ERRORS.maxLength });

export const signUpSchema = z
    .object({
        email: z
            .string()
            .min(1, { message: VALIDATION_ERRORS.emailEmpty })
            .max(50, { message: VALIDATION_ERRORS.maxLength })
            .email({ message: VALIDATION_ERRORS.incorrectEmail }),
        login: z
            .string()
            .min(5, { message: VALIDATION_ERRORS.loginEmpty })
            .max(50, { message: VALIDATION_ERRORS.maxLength })
            .regex(/^[A-Za-z0-9!@#$&_+\-.:]+$/, { message: VALIDATION_ERRORS.incorrectFormat }),
        password: passwordValidation,
        confirmPassword: passwordValidation,
        firstName: userNameValidation,
        lastName: userNameValidation,
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                message: VALIDATION_ERRORS.matchesPassword,
                path: ['confirmPassword'],
            });
        }
    });

export type SignUpSchema = z.output<typeof signUpSchema>;
