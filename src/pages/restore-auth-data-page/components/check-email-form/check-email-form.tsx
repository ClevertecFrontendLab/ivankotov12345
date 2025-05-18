import { Box, Button, Image, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import breakfast from '~/assets/modal-images/breakfast.png';
import { InputAuth } from '~/components/input-auth';
import { COLORS_BLACK_ALPHA } from '~/constants/colors';
import { LABELS } from '~/constants/labels';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { ALERT_ERROR_TEXT, EMAIL_VERIFICATION_STATUS, RESPONSE_STATUS } from '~/constants/statuses';
import { DATA_TEST_ID } from '~/constants/test-id';
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
        setValue,
        setError,
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
                showToast(ALERT_ERROR_TEXT, false);
            } else {
                showToast(EMAIL_VERIFICATION_STATUS[+currentError.status], false);
                setValue('email', '');
                setError('email', { message: '' });
            }
        }
    };

    return (
        <>
            <Image src={breakfast} alt='breakfast' />

            <Text color={COLORS_BLACK_ALPHA[900]} px={3}>
                Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код
            </Text>

            <Box as='form' onSubmit={handleSubmit(onSubmit)} w='full'>
                <InputAuth
                    isInvalid={!!errors.email}
                    label={LABELS.email}
                    placeholder={PLACEHOLDERS.email}
                    register={register('email')}
                    testId={DATA_TEST_ID.emailInput}
                    setValue={setValue}
                />

                <Button
                    type='submit'
                    variant='black'
                    size='lg'
                    w='full'
                    mt={6}
                    data-test-id={DATA_TEST_ID.submitButton}
                >
                    Получить код
                </Button>
            </Box>

            <Text color={COLORS_BLACK_ALPHA[600]} fontSize='xs'>
                Не пришло письмо? Проверьте папку Спам.
            </Text>
        </>
    );
};
