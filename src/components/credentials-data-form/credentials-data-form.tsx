import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { InputAuthForm } from '~/components/input-auth-form';
import { InputPassword } from '~/components/input-password';
import { LABELS, LOGIN_HINT_TEXT, PASSWORD_HINT_TEXT } from '~/constants/labels';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { CredentialsSchemaWithPasswordCheck } from '~/constants/validation-schemas/credentials';
import { SignUpSchema } from '~/constants/validation-schemas/sign-up';

type CredentialsDataFormStepProps = {
    register: UseFormRegister<SignUpSchema | CredentialsSchemaWithPasswordCheck>;
    errors: FieldErrors<SignUpSchema>;
};

export const CredentialsDataForm: React.FC<CredentialsDataFormStepProps> = ({
    register,
    errors,
}) => (
    <>
        <InputAuthForm
            isInvalid={!!errors.login}
            label={LABELS.login}
            placeholder={PLACEHOLDERS.loginShort}
            register={register('login')}
            hint={LOGIN_HINT_TEXT}
            error={errors.login?.message}
        />

        <InputPassword
            isInvalid={!!errors.password}
            label={LABELS.password}
            placeholder={PLACEHOLDERS.passwordShort}
            register={register('password')}
            hint={PASSWORD_HINT_TEXT}
            error={errors.password?.message}
        />

        <InputPassword
            isInvalid={!!errors.passwordConfirm}
            label={LABELS.repeatPassword}
            placeholder={PLACEHOLDERS.passwordShort}
            register={register('passwordConfirm')}
            error={errors.passwordConfirm?.message}
        />
    </>
);
