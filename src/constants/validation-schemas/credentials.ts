import { z } from 'zod';

import { VALIDATION_ERRORS } from './validation-error-messages';

const passwordValidation = z
    .string()
    .min(1, { message: VALIDATION_ERRORS.passwordEmpty })
    .regex(/^[A-Za-z0-9!@#$&_+.-]{8,}$/, { message: VALIDATION_ERRORS.incorrectFormat })
    .max(50, { message: VALIDATION_ERRORS.maxLength });

export const credentialsSchema = z
    .object({
        login: z
            .string()
            .min(5, { message: VALIDATION_ERRORS.loginEmpty })
            .max(50, { message: VALIDATION_ERRORS.maxLength })
            .regex(/^[A-Za-z0-9!@#$&_+\-.:]+$/, { message: VALIDATION_ERRORS.incorrectFormat }),
        password: passwordValidation,
        passwordConfirm: passwordValidation,
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
