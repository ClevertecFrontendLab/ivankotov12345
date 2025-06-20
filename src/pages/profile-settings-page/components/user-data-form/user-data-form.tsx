import { Box, Button, SimpleGrid, useDisclosure, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AppInput } from '~/components/form-fields';
import { LOGIN_HINT_TEXT } from '~/constants/labels';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { RESPONSE_STATUS, UPDATE_INFO_STATUS } from '~/constants/statuses';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import {
    UpdateUserDataSchema,
    updateUserDataSchema,
} from '~/constants/validation-schemas/update-user-data';
import { useUpdateInfoMutation } from '~/query/services/user';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setToastData, setToastIsOpen } from '~/store/slices/app-slice';
import { selectCurrentUser } from '~/store/slices/user-slice';

import { ChangePasswordModal } from '../change-password-modal';

export const UserDataForm: React.FC = () => {
    const currentUser = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        register,
        setValue,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(updateUserDataSchema),
    });

    const [updateInfo] = useUpdateInfoMutation();

    useEffect(() => {
        if (currentUser) {
            const { firstName, lastName, email, login } = currentUser;

            reset({ firstName, lastName, email, login });
        }
    }, [currentUser, reset]);

    const onSubmit: SubmitHandler<UpdateUserDataSchema> = async (data) => {
        const { firstName, lastName } = data;
        await updateInfo({ firstName, lastName });
        dispatch(setToastData(UPDATE_INFO_STATUS[RESPONSE_STATUS.SUCCESS]));
        dispatch(setToastIsOpen(true));
    };

    return (
        <Box>
            <SimpleGrid columns={2} gap={6}>
                <AppInput
                    label={PLACEHOLDERS.name}
                    register={register('firstName')}
                    setValue={setValue}
                    isInvalid={!!errors.firstName}
                    placeholder={PLACEHOLDERS.name}
                    variant={STYLE_VARIANTS.authInput}
                />

                <AppInput
                    label={PLACEHOLDERS.lastName}
                    register={register('lastName')}
                    setValue={setValue}
                    isInvalid={!!errors.lastName}
                    placeholder={PLACEHOLDERS.lastName}
                    variant={STYLE_VARIANTS.authInput}
                />

                <AppInput
                    label={PLACEHOLDERS.email}
                    register={register('email')}
                    setValue={setValue}
                    isInvalid={!!errors.email}
                    placeholder={PLACEHOLDERS.email}
                    variant={STYLE_VARIANTS.authInput}
                    disabled={true}
                />

                <AppInput
                    label={PLACEHOLDERS.login}
                    register={register('login')}
                    setValue={setValue}
                    isInvalid={!!errors.login}
                    placeholder={PLACEHOLDERS.login}
                    variant={STYLE_VARIANTS.authInput}
                    disabled={true}
                    hint={LOGIN_HINT_TEXT}
                />
            </SimpleGrid>

            <VStack alignItems='start'>
                <Button variant={STYLE_VARIANTS.none} onClick={onOpen}>
                    Сменить пароль
                </Button>

                <Button variant={STYLE_VARIANTS.black} onClick={handleSubmit(onSubmit)}>
                    Сохранить изменения
                </Button>
            </VStack>

            <ChangePasswordModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};
