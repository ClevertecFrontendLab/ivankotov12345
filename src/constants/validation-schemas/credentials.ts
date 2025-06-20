import { z } from 'zod';

import { VALIDATION_ERRORS } from './validation-error-messages';

export const passwordSchema = z
    .string()
    .min(1, { message: VALIDATION_ERRORS.passwordEmpty })
    .max(50, { message: VALIDATION_ERRORS.maxLength })
    .regex(/^(?!.*[А-Яа-яЁё\s])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$&_+-.]{8,}$/, {
        message: VALIDATION_ERRORS.incorrectFormat,
    });

export const credentialsSchema = z
    .object({
        login: z
            .string()
            .min(1, { message: VALIDATION_ERRORS.loginEmpty })
            .max(50, { message: VALIDATION_ERRORS.maxLength })
            .regex(/^[A-Za-z0-9!@#$&_+\-.:]{5,}$/, { message: VALIDATION_ERRORS.incorrectFormat }),
        password: passwordSchema,
        passwordConfirm: z.string().min(1, { message: VALIDATION_ERRORS.repeatPassword }),
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

export type CredentialsSchema = z.output<typeof credentialsSchema>;
