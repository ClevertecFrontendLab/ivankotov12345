import { z } from 'zod';

import { passwordSchema } from './credentials';
import { emailSchema } from './e-mail';
import { userNameValidation } from './user-data';
import { VALIDATION_ERRORS } from './validation-error-messages';

export const updateUserDataSchema = z.object({
    firstName: z.string().min(1, { message: VALIDATION_ERRORS.nameEmpty }).and(userNameValidation),
    lastName: z
        .string()
        .min(1, { message: VALIDATION_ERRORS.lastNameEmpty })
        .and(userNameValidation),
    email: emailSchema.shape.email,
    login: z.string().min(1).max(50),
});

export const updatePasswordSchema = z
    .object({
        password: passwordSchema,
        newPassword: passwordSchema,
        confirmNewPassword: z.string().min(1, { message: VALIDATION_ERRORS.repeatPassword }),
    })
    .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
        if (confirmNewPassword !== newPassword) {
            ctx.addIssue({
                code: 'custom',
                message: VALIDATION_ERRORS.matchesPassword,
                path: ['passwordConfirm'],
            });
        }
    });

export type UpdateUserDataSchema = z.output<typeof updateUserDataSchema>;
export type UpdatePasswordSchema = z.output<typeof updatePasswordSchema>;
