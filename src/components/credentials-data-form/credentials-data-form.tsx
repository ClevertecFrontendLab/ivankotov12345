import { FieldErrors, FieldValues, SetFieldValue, UseFormRegister } from 'react-hook-form';

import { InputPassword } from '~/components/form-fields';
import { LABELS, LOGIN_HINT_TEXT, PASSWORD_HINT_TEXT } from '~/constants/labels';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { DATA_TEST_ID } from '~/constants/test-id';
import { CredentialsSchema } from '~/constants/validation-schemas/credentials';

import { AppInput } from '../form-fields';

type CredentialsDataFormStepProps = {
    register: UseFormRegister<CredentialsSchema>;
    errors: FieldErrors<CredentialsSchema>;
    setValue: SetFieldValue<FieldValues>;
};

export const CredentialsDataForm: React.FC<CredentialsDataFormStepProps> = ({
    register,
    errors,
    setValue,
}) => (
    <>
        <AppInput
            isInvalid={!!errors.login}
            label={LABELS.login}
            placeholder={PLACEHOLDERS.loginShort}
            register={register('login')}
            hint={LOGIN_HINT_TEXT}
            error={errors.login?.message}
            testId={DATA_TEST_ID.loginInput}
            variant={STYLE_VARIANTS.authInput}
            setValue={setValue}
        />

        <InputPassword
            isInvalid={!!errors.password}
            label={LABELS.password}
            placeholder={PLACEHOLDERS.passwordShort}
            register={register('password')}
            hint={PASSWORD_HINT_TEXT}
            error={errors.password?.message}
            testId={DATA_TEST_ID.passwordInput}
        />

        <InputPassword
            isInvalid={!!errors.passwordConfirm}
            label={LABELS.repeatPassword}
            placeholder={PLACEHOLDERS.passwordShort}
            register={register('passwordConfirm')}
            error={errors.passwordConfirm?.message}
            testId={DATA_TEST_ID.confirmPasswordInput}
        />
    </>
);
