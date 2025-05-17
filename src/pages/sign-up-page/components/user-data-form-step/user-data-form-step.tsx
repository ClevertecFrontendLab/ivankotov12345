import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { InputAuth } from '~/components/input-auth';
import { LABELS } from '~/constants/labels';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { SignUpSchema } from '~/constants/validation-schemas/sign-up';

type UserDataFormStepProps = {
    register: UseFormRegister<SignUpSchema>;
    errors: FieldErrors<SignUpSchema>;
};

export const UserDataFormStep: React.FC<UserDataFormStepProps> = ({ register, errors }) => (
    <>
        <InputAuth
            isInvalid={!!errors.firstName}
            label={LABELS.name}
            placeholder={PLACEHOLDERS.name}
            register={register('firstName')}
            error={errors.firstName?.message}
        />

        <InputAuth
            isInvalid={!!errors.lastName}
            label={LABELS.lastName}
            placeholder={PLACEHOLDERS.lastName}
            register={register('lastName')}
            error={errors.lastName?.message}
        />

        <InputAuth
            isInvalid={!!errors.email}
            label={LABELS.email}
            placeholder={PLACEHOLDERS.email}
            register={register('email')}
            error={errors.email?.message}
        />
    </>
);
