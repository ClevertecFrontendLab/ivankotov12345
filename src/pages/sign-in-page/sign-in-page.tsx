import { Button, useDisclosure, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Outlet, useNavigate } from 'react-router';

import { InputPassword } from '~/components/form-fields';
import { AppInput } from '~/components/form-fields';
import { LABELS } from '~/constants/labels';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { AUTHORIZATION_STATUS, RESPONSE_STATUS } from '~/constants/statuses';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { DATA_TEST_ID } from '~/constants/test-id';
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
        setValue,
        setError,
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
                setError('login', { message: '' });
                setError('password', { message: '' });
            }
            if (+status >= RESPONSE_STATUS.SERVER_ERROR) {
                onOpen();
            }
        }
    };

    return (
        <>
            <VStack
                as='form'
                w={SIZES.full}
                gap={6}
                onSubmit={handleSubmit(onSubmit)}
                data-test-id={DATA_TEST_ID.signInForm}
            >
                <AppInput
                    isInvalid={!!errors.login}
                    label={LABELS.login}
                    placeholder={PLACEHOLDERS.login}
                    register={register('login')}
                    error={errors.login?.message}
                    variant={STYLE_VARIANTS.authInput}
                    testId={DATA_TEST_ID.loginInput}
                    setValue={setValue}
                />

                <InputPassword
                    isInvalid={!!errors.password}
                    label={LABELS.password}
                    placeholder={PLACEHOLDERS.password}
                    register={register('password')}
                    error={errors.password?.message}
                    testId={DATA_TEST_ID.passwordInput}
                />

                <Button
                    variant={STYLE_VARIANTS.black}
                    size='lg'
                    w={SIZES.full}
                    mt={28}
                    type='submit'
                    data-test-id={DATA_TEST_ID.submitButton}
                >
                    Войти
                </Button>
            </VStack>

            <Button
                variant={STYLE_VARIANTS.none}
                size='xs'
                fontSize='md'
                mt={4}
                mx='auto'
                onClick={onForgotDataClick}
                data-test-id={DATA_TEST_ID.forgotPassword}
            >
                Забыли логин или пароль?
            </Button>

            <ModalSignInError isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit(onSubmit)} />

            <Outlet />
        </>
    );
};
