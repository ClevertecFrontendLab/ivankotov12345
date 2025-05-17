import { Button, Progress, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ZodType } from 'zod';

import { COLORS_BLACK_ALPHA } from '~/constants/colors';
import { ALERT_ERROR_TEXT, RESPONSE_STATUS } from '~/constants/statuses';
import { credentialsSchema } from '~/constants/validation-schemas/credentials';
import { userDataSchema } from '~/constants/validation-schemas/user-data';
import { useAppToast } from '~/hooks/use-app-toast';
import { useSignUpMutation } from '~/query/services/auth';
import { ResponseError } from '~/types/response';

import { CredentialsDataFormStep } from './components/credentials-data-form-step';
import { ModalSignUpSuccess } from './components/modal-sign-up-success';
import { ModalVerificationError } from './components/modal-verification-error';
import { UserDataFormStep } from './components/user-data-form-step';

const STEPS_LIST = ['Шаг 1. Личная информация', 'Шаг 2. Логин и пароль'];
const STEPS_BUTTON_TEXT_LIST = ['Дальше', 'Зарегистрироваться'];

const signUpSchema: ZodType[] = [userDataSchema, credentialsSchema];

export const SignUpPage: React.FC = () => {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState('');

    const { isOpen, onClose, onOpen } = useDisclosure();
    const showTaost = useAppToast();

    const {
        register,
        handleSubmit,
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

    const progressValue = (validatedCount * 100) / 6;

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
                showTaost(ALERT_ERROR_TEXT);
            }
        }
    };

    const formSteps = [
        <UserDataFormStep register={register} errors={errors} />,
        <CredentialsDataFormStep register={register} errors={errors} />,
    ];

    return (
        <>
            <Text w='full'>{STEPS_LIST[step]}</Text>

            <Progress
                variant='progressLime'
                hasStripe
                w='full'
                size='sm'
                value={progressValue}
                bgColor={COLORS_BLACK_ALPHA[100]}
            />

            <VStack as='form' w='full' mt={6} gap={6} onSubmit={handleSubmit(onSubmit)}>
                {formSteps[step]}

                <Button type='submit' variant='black' size='lg' w='full' mt={12}>
                    {STEPS_BUTTON_TEXT_LIST[step]}
                </Button>
            </VStack>

            <ModalVerificationError />
            <ModalSignUpSuccess isOpen={isOpen} onClose={onClose} email={email} />
        </>
    );
};
