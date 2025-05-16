import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { InputAuthForm } from '~/components/input-auth-form';
import { LABELS } from '~/constants/labels';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { SignUpSchema } from '~/constants/validation-schemas/sign-up';

type UserDataFormStepProps = {
    register: UseFormRegister<SignUpSchema>;
    errors: FieldErrors<SignUpSchema>;
};

export const UserDataFormStep: React.FC<UserDataFormStepProps> = ({ register, errors }) => (
    <>
        <InputAuthForm
            isInvalid={!!errors.firstName}
            label={LABELS.name}
            placeholder={PLACEHOLDERS.name}
            register={register('firstName')}
            error={errors.firstName?.message}
        />

        <InputAuthForm
            isInvalid={!!errors.lastName}
            label={LABELS.lastName}
            placeholder={PLACEHOLDERS.lastName}
            register={register('lastName')}
            error={errors.lastName?.message}
        />

        <InputAuthForm
            isInvalid={!!errors.email}
            label={LABELS.email}
            placeholder={PLACEHOLDERS.email}
            register={register('email')}
            error={errors.email?.message}
        />
    </>
);
