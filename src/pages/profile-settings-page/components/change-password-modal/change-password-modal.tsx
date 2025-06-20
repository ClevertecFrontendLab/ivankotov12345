import { Button, Heading, ModalProps, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { InputPassword } from '~/components/form-fields';
import { ModalWrapper } from '~/components/modal-wrapper';
import { LABELS, PASSWORD_HINT_TEXT } from '~/constants/labels';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { PASSWORDS_ARE_EQUAL, RESPONSE_STATUS, UPDATE_PASSWORD_STATUS } from '~/constants/statuses';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import {
    UpdatePasswordSchema,
    updatePasswordSchema,
} from '~/constants/validation-schemas/update-user-data';
import { useUpdatePasswordMutation } from '~/query/services/user';
import { useAppDispatch } from '~/store/hooks';
import { setToastData, setToastIsOpen } from '~/store/slices/app-slice';
import { ResponseData } from '~/types/response';

type ChangePasswordModalProps = Pick<ModalProps, 'isOpen' | 'onClose'>;

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(updatePasswordSchema),
    });

    const [updatePassword] = useUpdatePasswordMutation();

    const onSubmit: SubmitHandler<UpdatePasswordSchema> = async (data) => {
        const { password, newPassword } = data;
        try {
            await updatePassword({ password, newPassword }).unwrap();
            dispatch(setToastData(UPDATE_PASSWORD_STATUS[RESPONSE_STATUS.SUCCESS]));
            dispatch(setToastIsOpen(true));
            onClose();
            reset();
        } catch (error) {
            const currentError = error as unknown as ResponseData;
            if (currentError.description === PASSWORDS_ARE_EQUAL) {
                setError('password', {
                    type: 'server',
                });
            }
        }
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <Heading fontSize='2xl'>Сменить пароль</Heading>

            <VStack as='form' gap={8} onSubmit={handleSubmit(onSubmit)}>
                <InputPassword
                    register={register('password')}
                    isInvalid={!!errors.password}
                    label={LABELS.oldPassword}
                    placeholder={PLACEHOLDERS.oldPassword}
                    error={errors.password?.message}
                />

                <InputPassword
                    register={register('newPassword')}
                    isInvalid={!!errors.newPassword}
                    label={LABELS.newPassword}
                    placeholder={PLACEHOLDERS.newPassword}
                    hint={PASSWORD_HINT_TEXT}
                />

                <InputPassword
                    register={register('confirmNewPassword')}
                    isInvalid={!!errors.confirmNewPassword}
                    label={LABELS.repeatPassword}
                    placeholder={PLACEHOLDERS.passwordShort}
                />

                <Button type='submit' variant={STYLE_VARIANTS.black} w={SIZES.full}>
                    Сохранить пароль
                </Button>
            </VStack>
        </ModalWrapper>
    );
};
