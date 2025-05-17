import { Button, useDisclosure, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Outlet, useNavigate } from 'react-router';

import { InputAuth } from '~/components/input-auth';
import { InputPassword } from '~/components/input-password';
import { LABELS } from '~/constants/labels';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { AUTHORIZATION_STATUS, RESPONSE_STATUS } from '~/constants/statuses';
import { SignInSchema, signInSchema } from '~/constants/validation-schemas/sign-in';
import { useAppToast } from '~/hooks/use-app-toast';
import { useSignInMutation } from '~/query/services/auth';
import { ResponseError } from '~/types/response';

import { ModalSignInError } from './components/modal-sign-in-error';

export const SignInPage: React.FC = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const showTaost = useAppToast();

    const [signIn] = useSignInMutation();
    const onForgotDataClick = () => navigate(ROUTER_PATHS.restoreAuthData);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signInSchema),
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<SignInSchema> = async (data) => {
        try {
            await signIn(data).unwrap();
            navigate(ROUTER_PATHS.homePage);
        } catch (error) {
            const currentError = error as ResponseError;
            const { status } = currentError;
            if (status && +status < RESPONSE_STATUS.SERVER_ERROR) {
                showTaost(AUTHORIZATION_STATUS[+status]);
            }
            if (+status >= RESPONSE_STATUS.SERVER_ERROR) {
                onOpen();
            }
        }
    };

    return (
        <>
            <VStack as='form' w='full' gap={6} onSubmit={handleSubmit(onSubmit)}>
                <InputAuth
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

                <Button variant='black' size='lg' w='full' mt={28} type='submit'>
                    Войти
                </Button>
            </VStack>

            <Button
                variant='none'
                size='xs'
                fontSize='md'
                mt={4}
                mx='auto'
                onClick={onForgotDataClick}
            >
                Забыли логин или пароль?
            </Button>

            <ModalSignInError isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit(onSubmit)} />

            <Outlet />
        </>
    );
};
