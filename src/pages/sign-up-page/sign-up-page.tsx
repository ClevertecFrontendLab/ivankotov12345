import { Button, Progress, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { ZodType } from 'zod';

import { CredentialsDataForm } from '~/components/credentials-data-form';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { AUTH_SERVER_ERROR, RESPONSE_STATUS } from '~/constants/statuses';
import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { DATA_TEST_ID } from '~/constants/test-id';
import { credentialsSchema } from '~/constants/validation-schemas/credentials';
import { userDataSchema } from '~/constants/validation-schemas/user-data';
import { useAppToast } from '~/hooks/use-app-toast';
import { useSignUpMutation } from '~/query/services/auth';
import { ResponseError } from '~/types/response';

import { ModalSignUpSuccess } from './components/modal-sign-up-success';
import { ModalVerificationError } from './components/modal-verification-error';
import { UserDataFormStep } from './components/user-data-form-step';

const STEPS_LIST = ['Шаг 1. Личная информация', 'Шаг 2. Логин и пароль'];
const STEPS_BUTTON_TEXT_LIST = ['Дальше', 'Зарегистрироваться'];
const FIELDS_COUNT = 6;

const signUpSchema: ZodType[] = [userDataSchema, credentialsSchema];

export const SignUpPage: React.FC = () => {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const { isOpen, onClose, onOpen } = useDisclosure();
    const showTaost = useAppToast();

    const onSuccessModalClose = () => {
        navigate(ROUTER_PATHS.signIn);
        onClose();
    };

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors, dirtyFields },
    } = useForm({
        resolver: zodResolver(signUpSchema[step]),
        mode: 'onChange',
    });

    const validatedCount = Object.keys(dirtyFields).reduce((acc, fieldName) => {
        if (dirtyFields[fieldName] && !errors[fieldName]) {
            return acc + 1;
        }
        return acc;
    }, 0);

    const progressValue = (validatedCount * 100) / FIELDS_COUNT;

    const [signUp] = useSignUpMutation();

    const onSubmit = async () => {
        const formValues = getValues();
        const { passwordConfirm, ...signUpData } = formValues;

        if (step === 0) {
            setEmail(signUpData.email);
            setStep(() => step + 1);
            return;
        }

        try {
            await signUp(signUpData).unwrap();
            onOpen();
        } catch (error) {
            const currentError = error as ResponseError;
            const { status, data } = currentError;

            if (status === RESPONSE_STATUS.BAD_REQUEST)
                showTaost({ status: 'error', title: data.message });

            if (+status >= RESPONSE_STATUS.SERVER_ERROR) {
                showTaost(AUTH_SERVER_ERROR);
            }
        }
    };

    const formSteps = [
        <UserDataFormStep register={register} errors={errors} setValue={setValue} />,
        <CredentialsDataForm register={register} errors={errors} setValue={setValue} />,
    ];

    return (
        <>
            <Text w='full'>{STEPS_LIST[step]}</Text>

            <Progress
                variant={STYLE_VARIANTS.progressLime}
                hasStripe
                w='full'
                size='sm'
                value={progressValue}
                bgColor={COLORS_BLACK_ALPHA[100]}
                data-test-id={DATA_TEST_ID.signUpProgress}
            />

            <VStack
                as='form'
                w='full'
                mt={6}
                gap={6}
                onSubmit={handleSubmit(onSubmit)}
                data-test-id={DATA_TEST_ID.signUpForm}
            >
                {formSteps[step]}

                <Button
                    type='submit'
                    variant={STYLE_VARIANTS.black}
                    size='lg'
                    w='full'
                    mt={12}
                    data-test-id={DATA_TEST_ID.submitButton}
                >
                    {STEPS_BUTTON_TEXT_LIST[step]}
                </Button>
            </VStack>

            <ModalVerificationError />
            <ModalSignUpSuccess isOpen={isOpen} onClose={onSuccessModalClose} email={email} />
        </>
    );
};
