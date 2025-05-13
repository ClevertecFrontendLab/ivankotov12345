import { Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { InputAuthForm } from '~/components/input-auth-form';
import { InputPassword } from '~/components/input-password';
import { LABELS } from '~/constants/labels';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { signIn } from '~/constants/validation-schemas/sign-in';

export const SignInPage: React.FC = () => {
    const {
        register,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signIn),
        mode: 'onBlur',
    });

    return (
        <>
            <form>
                <InputAuthForm
                    isInvalid={!!errors.login}
                    label={LABELS.login}
                    placeholder={PLACEHOLDERS.login}
                    register={register('login')}
                    error={errors.login?.message}
                />

                <InputPassword
                    isInvalid={!!errors.password}
                    label={LABELS.password}
                    placeholder={PLACEHOLDERS.password}
                    register={register('password')}
                    error={errors.password?.message}
                />

                <Button variant='black'>Войти</Button>
            </form>

            <Button>Забыли логин или пароль?</Button>
        </>
    );
};
