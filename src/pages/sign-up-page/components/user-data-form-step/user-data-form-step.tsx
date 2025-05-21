import { FieldErrors, FieldValues, SetFieldValue, UseFormRegister } from 'react-hook-form';

import { InputAuth } from '~/components/input-auth';
import { LABELS } from '~/constants/labels';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { DATA_TEST_ID } from '~/constants/test-id';
import { UserDataSchema } from '~/constants/validation-schemas/user-data';

type UserDataFormStepProps = {
    register: UseFormRegister<UserDataSchema>;
    errors: FieldErrors<UserDataSchema>;
    setValue: SetFieldValue<FieldValues>;
};

export const UserDataFormStep: React.FC<UserDataFormStepProps> = ({
    register,
    errors,
    setValue,
}) => (
    <>
        <InputAuth
            isInvalid={!!errors.firstName}
            label={LABELS.name}
            placeholder={PLACEHOLDERS.name}
            register={register('firstName')}
            error={errors.firstName?.message}
            testId={DATA_TEST_ID.firstNameInput}
            setValue={setValue}
        />

        <InputAuth
            isInvalid={!!errors.lastName}
            label={LABELS.lastName}
            placeholder={PLACEHOLDERS.lastName}
            register={register('lastName')}
            error={errors.lastName?.message}
            testId={DATA_TEST_ID.lastNameInput}
            setValue={setValue}
        />

        <InputAuth
            isInvalid={!!errors.email}
            label={LABELS.email}
            placeholder={PLACEHOLDERS.email}
            register={register('email')}
            error={errors.email?.message}
            testId={DATA_TEST_ID.emailInput}
            setValue={setValue}
        />
    </>
);
