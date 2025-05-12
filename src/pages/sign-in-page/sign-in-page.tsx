import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { InputPassword } from '~/components/input-password';
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

    const errorLogin = errors.login ? true : false;
    const errorPassword = errors.password ? true : false;

    console.log(errors);
    return (
        <>
            <form>
                <FormControl isInvalid={errorLogin}>
                    <FormLabel>Логин для входа на сайт</FormLabel>
                    <Input size='lg' placeholder={PLACEHOLDERS.login} {...register('login')} />
                    <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errorPassword}>
                    <FormLabel>Пароль</FormLabel>
                    <InputPassword
                        placeholder={PLACEHOLDERS.password}
                        register={register('password')}
                    />
                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>

                <Button variant='black'>Войти</Button>
            </form>
            <Button>Забыли логин или пароль?</Button>
        </>
    );
};
