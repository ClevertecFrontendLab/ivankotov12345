import { Box, Button, Image, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import breakfast from '~/assets/modal-images/breakfast.png';
import { AppInput } from '~/components/form-fields';
import { LABELS } from '~/constants/labels';
import { PLACEHOLDERS } from '~/constants/placeholders';
import {
    AUTH_SERVER_ERROR,
    EMAIL_VERIFICATION_STATUS,
    RESPONSE_STATUS,
} from '~/constants/statuses';
import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { DATA_TEST_ID } from '~/constants/test-id';
import { EmailSchema, emailSchema } from '~/constants/validation-schemas/e-mail';
import { useAppToast } from '~/hooks/use-app-toast';
import { useSendOtpMutation } from '~/query/services/auth';
import { StepFormProps } from '~/types/props';
import { ResponseError } from '~/types/response';

type CheckEmailFormProps = StepFormProps & { setEmail: (email: string) => void };

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
                showToast(AUTH_SERVER_ERROR, false);
            } else {
                showToast(EMAIL_VERIFICATION_STATUS[+currentError.status], false);
            }
            setValue('email', '');
            setError('email', { message: '' });
        }
    };

    return (
        <>
            <Image
                src={breakfast}
                alt='breakfast'
                maxW={{ base: SIZES.imageBase, lg: SIZES.full }}
            />

            <Text color={COLORS_BLACK_ALPHA[900]} px={3}>
                Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код
            </Text>

            <Box as='form' onSubmit={handleSubmit(onSubmit)} w={SIZES.full}>
                <AppInput
                    isInvalid={!!errors.email}
                    label={LABELS.email}
                    placeholder={PLACEHOLDERS.email}
                    register={register('email')}
                    error={errors.email?.message}
                    variant={STYLE_VARIANTS.authInput}
                    testId={DATA_TEST_ID.emailInput}
                    setValue={setValue}
                />

                <Button
                    type='submit'
                    variant={STYLE_VARIANTS.black}
                    size='lg'
                    w={SIZES.full}
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
