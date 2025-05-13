import { Button, Progress, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { signUp } from '~/constants/validation-schemas/sign-up';

import { CredentialsDataFormStep } from './components/credentials-data-form-step';
import { UserDataFormStep } from './components/user-data-form-step';

export const SignUpPage: React.FC = () => {
    const [step, setStep] = useState(0);

    const {
        register,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signUp),
        mode: 'onChange',
    });

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
            <Text>Шаг</Text>
            <Progress />

            <form>{formSteps[step]}</form>

            <Button onClick={onNextStep}>Шаги</Button>
        </>
    );
};
