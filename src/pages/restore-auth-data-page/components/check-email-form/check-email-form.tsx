import { Box, Button, Image, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import breakfast from '~/assets/modal-images/breakfast.png';
import { InputAuthForm } from '~/components/input-auth-form';
import { COLORS_BLACK_ALPHA } from '~/constants/colors';
import { LABELS } from '~/constants/labels';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { ALERT_ERROR_TEXT, EMAIL_VERIFICATION_STATUS, RESPONSE_STATUS } from '~/constants/statuses';
import { EmailSchema, emailSchema } from '~/constants/validation-schemas/e-mail';
import { useAppToast } from '~/hooks/use-app-toast';
import { useSendOtpMutation } from '~/query/services/auth';
import { ResponseError } from '~/types/response';

type CheckEmailFormProps = {
    setStep: (step: number) => void;
    setEmail: (email: string) => void;
    step: number;
};

export const CheckEmailForm: React.FC<CheckEmailFormProps> = ({ setStep, step, setEmail }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(emailSchema),
        mode: 'onChange',
    });

    const showToast = useAppToast();

    const [sendOtp] = useSendOtpMutation();

    const onSubmit: SubmitHandler<EmailSchema> = async (data) => {
        try {
            await sendOtp(data).unwrap();
            setEmail(data.email);
            setStep(step + 1);
        } catch (error) {
            const currentError = error as ResponseError;

            if (+currentError.status >= RESPONSE_STATUS.SERVER_ERROR) {
                showToast(ALERT_ERROR_TEXT);
            } else {
                showToast(EMAIL_VERIFICATION_STATUS[+currentError.status]);
            }
        }
    };

    return (
        <>
            <Image src={breakfast} alt='breakfast' />

            <Text color={COLORS_BLACK_ALPHA[900]}>
                Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код
            </Text>

            <Box as='form' onSubmit={handleSubmit(onSubmit)}>
                <InputAuthForm
                    isInvalid={!!errors.email}
                    label={LABELS.email}
                    placeholder={PLACEHOLDERS.email}
                    register={register('email')}
                />

                <Button variant='black' w='full' type='submit'>
                    Получить код
                </Button>
            </Box>
        </>
    );
};
