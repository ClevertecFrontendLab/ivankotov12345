import { Box, Button, Heading } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CredentialsDataForm } from '~/components/credentials-data-form';
import { ALERT_ERROR_TEXT } from '~/constants/statuses';
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
        formState: { errors },
    } = useForm({
        resolver: zodResolver(credentialsSchema),
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<CredentialsSchema> = async (data) => {
        try {
            await resetAuthData({ ...data, email: email }).unwrap();
            onClose();
        } catch {
            showToast(ALERT_ERROR_TEXT);
        }
    };

    return (
        <>
            <Heading>Восстановление аккаунта</Heading>
            <Box as='form' onSubmit={handleSubmit(onSubmit)}>
                <CredentialsDataForm register={register} errors={errors} />
                <Button variant='black' type='submit'>
                    Зарегистрироваться
                </Button>
            </Box>
        </>
    );
};
