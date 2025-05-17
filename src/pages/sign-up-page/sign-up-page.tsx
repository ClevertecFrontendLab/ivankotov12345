import { Button, Progress, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { COLORS_BLACK_ALPHA } from '~/constants/colors';
import { RESPONSE_STATUS } from '~/constants/statuses';
import { SignUpSchema, signUpSchema } from '~/constants/validation-schemas/sign-up';
import { useAppToast } from '~/hooks/use-app-toast';
import { useSignUpMutation } from '~/query/services/auth';
import { ResponseError } from '~/types/response';

import { CredentialsDataFormStep } from './components/credentials-data-form-step';
import { ModalSignUpSuccess } from './components/modal-sign-up-success';
import { ModalVerificationError } from './components/modal-verification-error';
import { UserDataFormStep } from './components/user-data-form-step';

const STEPS_LIST = ['Шаг 1. Личная информация', 'Шаг 2. Логин и пароль'];
const STEPS_BUTTON_TEXT_LIST = ['Дальше', 'Зарегистрироваться'];

export const SignUpPage: React.FC = () => {
    const [step, setStep] = useState(0);

    const { isOpen, onClose, onOpen } = useDisclosure();
    const showTaost = useAppToast();

    const {
        register,
        getValues,
        formState: { errors, dirtyFields },
    } = useForm({
        resolver: zodResolver(signUpSchema),
        mode: 'onChange',
    });

    const validatedCount = (Object.keys(dirtyFields) as Array<keyof SignUpSchema>).reduce(
        (acc: number, fieldName: keyof SignUpSchema) => {
            if (dirtyFields[fieldName] && !errors[fieldName]) {
                return acc + 1;
            }
            return acc;
        },
        0,
    );

    const progressValue = (validatedCount * 100) / 6;

    const [signUp] = useSignUpMutation();

    const onNextStep = () => {
        if (step === 0) setStep(() => step + 1);
    };

    const onSubmit = async () => {
        const fromValues = getValues();
        const { passwordConfirm, ...signUpData } = fromValues;

        try {
            await signUp(signUpData).unwrap();
            onOpen();
        } catch (error) {
            const currentError = error as ResponseError;
            const { status, data } = currentError;

            if (status === RESPONSE_STATUS.BAD_REQUEST)
                showTaost({ status: 'error', title: data.message });
        }
    };

    const formSteps = [
        <UserDataFormStep register={register} errors={errors} />,
        <CredentialsDataFormStep register={register} errors={errors} />,
    ];

    return (
        <>
            <Text>{STEPS_LIST[step]}</Text>

            <Progress
                variant='progressLime'
                hasStripe
                w='full'
                size='sm'
                value={progressValue}
                bgColor={COLORS_BLACK_ALPHA[100]}
            />

            <VStack as='form' w='full' mt={6} gap={6}>
                {formSteps[step]}
            </VStack>

            <Button
                onClick={step === 0 ? onNextStep : onSubmit}
                type={step === 0 ? 'button' : 'submit'}
                variant='black'
                w='full'
                mt={12}
            >
                {STEPS_BUTTON_TEXT_LIST[step]}
            </Button>

            <ModalVerificationError />
            <ModalSignUpSuccess isOpen={isOpen} onClose={onClose} email='ЗАГЛУШКААА' />
        </>
    );
};
