import {
    Box,
    Heading,
    HStack,
    Image,
    PinInput,
    PinInputField,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

import verify from '~/assets/modal-images/verify.png';
import { COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/colors';
import { ALERT_ERROR_TEXT, RESPONSE_STATUS } from '~/constants/statuses';
import { useAppToast } from '~/hooks/use-app-toast';
import { useVerifyOtpMutation } from '~/query/services/auth';
import { ResponseError } from '~/types/response';

type CheckOtpProps = {
    setStep: (step: number) => void;
    step: number;
    email: string;
};

const pinItems = Array.from({ length: 6 }).map((_, index) => index + 1);

export const CheckOtp: React.FC<CheckOtpProps> = ({ setStep, step, email }) => {
    const [otpValue, setOtpValue] = useState('');
    const [isError, setIsError] = useState(false);
    const [verifyOtp] = useVerifyOtpMutation();
    const showToast = useAppToast();

    const onOtpChange = (value: string) => setOtpValue(value);

    const onOtpComplete = async (value: string) => {
        try {
            verifyOtp({ email: email, otpToken: value }).unwrap();
            setIsError(false);
            setStep(step + 1);
        } catch (error) {
            const currentError = error as ResponseError;

            if (+currentError.status >= RESPONSE_STATUS.SERVER_ERROR) {
                showToast(ALERT_ERROR_TEXT, false);
            }

            setIsError(true);
            setOtpValue('');
        }
    };

    return (
        <>
            <Image src={verify} alt='verify' />

            <VStack gap={4}>
                {isError && <Heading fontSize='2xl'>Неверный код</Heading>}
                <Box>
                    <Text>Мы отправили вам на e-mail</Text>
                    <Text>{email}</Text>
                    <Text>шестизначный код. Введите его ниже.</Text>
                </Box>

                <HStack>
                    <PinInput
                        value={otpValue}
                        isInvalid={isError}
                        onChange={onOtpChange}
                        onComplete={onOtpComplete}
                    >
                        {pinItems.map((pinItem) => (
                            <PinInputField
                                key={pinItem}
                                color={COLORS_LIME[800]}
                                _focus={{ borderColor: 'inherit' }}
                                _placeholder={{ color: COLORS_LIME[800] }}
                            />
                        ))}
                    </PinInput>
                </HStack>
            </VStack>

            <Text color={COLORS_BLACK_ALPHA[600]} fontSize='xs'>
                Не пришло письмо? Проверьте папку Спам.
            </Text>
        </>
    );
};
