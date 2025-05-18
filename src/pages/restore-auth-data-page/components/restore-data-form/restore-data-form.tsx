import { Button, Heading, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CredentialsDataForm } from '~/components/credentials-data-form';
import { ALERT_ERROR_TEXT, RESTORE_DATA_SUCCESS } from '~/constants/statuses';
import { DATA_TEST_ID } from '~/constants/test-id';
import { CredentialsSchema, credentialsSchema } from '~/constants/validation-schemas/credentials';
import { useAppToast } from '~/hooks/use-app-toast';
import { useResetAuthDataMutation } from '~/query/services/auth';

type RestoreDataFormProps = {
    email: string;
    onClose: () => void | Promise<void>;
};

export const RestoreDataForm: React.FC<RestoreDataFormProps> = ({ email, onClose }) => {
    const [resetAuthData] = useResetAuthDataMutation();
    const showToast = useAppToast();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(credentialsSchema),
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<CredentialsSchema> = async (data) => {
        try {
            await resetAuthData({ ...data, email: email }).unwrap();
            onClose();
            showToast(RESTORE_DATA_SUCCESS, false);
        } catch {
            showToast(ALERT_ERROR_TEXT, false);
        }
    };

    return (
        <>
            <Heading fontSize='2xl' px={5}>
                Восстановление аккаунта
            </Heading>
            <VStack as='form' onSubmit={handleSubmit(onSubmit)} gap={6} textAlign='start'>
                <CredentialsDataForm register={register} errors={errors} setValue={setValue} />
                <Button
                    variant='black'
                    size='lg'
                    type='submit'
                    w='full'
                    data-test-id={DATA_TEST_ID.submitButton}
                >
                    Зарегистрироваться
                </Button>
            </VStack>
        </>
    );
};
