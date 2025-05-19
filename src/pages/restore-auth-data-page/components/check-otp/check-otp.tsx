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
import { AUTH_SERVER_ERROR, RESPONSE_STATUS } from '~/constants/statuses';
import { COLORS, COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/styles/colors';
import { BORDERS } from '~/constants/styles/styles';
import { DATA_TEST_ID } from '~/constants/test-id';
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

    const onOtpChange = (value: string) => {
        setIsError(false);
        setOtpValue(value);
    };

    const onOtpComplete = async (value: string) => {
        try {
            await verifyOtp({ email: email, otpToken: value }).unwrap();

            setIsError(false);
            setStep(step + 1);
        } catch (error) {
            const currentError = error as ResponseError;

            if (+currentError.status >= RESPONSE_STATUS.SERVER_ERROR) {
                showToast(AUTH_SERVER_ERROR, false);
            } else {
                setIsError(true);
            }
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
                    <Text fontWeight='semibold'>{email}</Text>
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
                                _invalid={{
                                    boxShadow: 'none',
                                    border: BORDERS.solid,
                                    borderColor: COLORS.red,
                                }}
                                _focus={{
                                    border: BORDERS.solid,
                                    borderColor: isError ? COLORS.red : 'inherit',
                                }}
                                _placeholder={{ color: COLORS_LIME[800] }}
                                data-test-id={`${DATA_TEST_ID.verificationCodeInput}${pinItem}`}
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
