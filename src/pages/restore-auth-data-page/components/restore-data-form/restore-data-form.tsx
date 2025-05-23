import { Button, Heading, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CredentialsDataForm } from '~/components/credentials-data-form';
import { AUTH_SERVER_ERROR, RESTORE_DATA_SUCCESS } from '~/constants/statuses';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
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
            showToast(RESTORE_DATA_SUCCESS);
        } catch {
            showToast(AUTH_SERVER_ERROR, false);
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
                    variant={STYLE_VARIANTS.black}
                    size='lg'
                    type='submit'
                    w={SIZES.full}
                    data-test-id={DATA_TEST_ID.submitButton}
                >
                    Зарегистрироваться
                </Button>
            </VStack>
        </>
    );
};
