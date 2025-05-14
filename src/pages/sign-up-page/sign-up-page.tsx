import { Button, Progress, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { COLORS_BLACK_ALPHA } from '~/constants/colors';
import { SignUp, signUp } from '~/constants/validation-schemas/sign-up';

import { CredentialsDataFormStep } from './components/credentials-data-form-step';
import { UserDataFormStep } from './components/user-data-form-step';

const STEPS_LIST = ['Шаг 1. Личная информация', 'Шаг 2. Логин и пароль'];

export const SignUpPage: React.FC = () => {
    const [step, setStep] = useState(0);

    const {
        register,
        formState: { errors, dirtyFields },
    } = useForm({
        resolver: zodResolver(signUp),
        mode: 'onChange',
    });

    const validatedCount = (Object.keys(dirtyFields) as Array<keyof SignUp>).reduce(
        (acc: number, fieldName: keyof SignUp) => {
            if (dirtyFields[fieldName] && !errors[fieldName]) {
                return acc + 1;
            }
            return acc;
        },
        0,
    );

    const progressValue = (validatedCount * 100) / 6;

    const onNextStep = () => {
        if (step >= 1) return;
        setStep(() => step + 1);
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

            <VStack as='form' w='full'>
                {formSteps[step]}
            </VStack>

            <Button onClick={onNextStep}>Шаги</Button>
        </>
    );
};
