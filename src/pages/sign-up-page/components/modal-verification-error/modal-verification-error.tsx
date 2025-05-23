import { Box, Heading, Image, Text } from '@chakra-ui/react';

import verificationErrorImage from '~/assets/modal-images/verification-error-image.png';
import { ModalWrapper } from '~/components/modal-wrapper';
import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { DATA_TEST_ID } from '~/constants/test-id';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectModalVerification, setIsModalVerificationOpen } from '~/store/slices/app-slice';

export const ModalVerificationError: React.FC = () => {
    const isModalVerificationOen = useAppSelector(selectModalVerification);

    const dispatch = useAppDispatch();

    const onClose = () => dispatch(setIsModalVerificationOpen(false));
    return (
        <ModalWrapper
            isOpen={isModalVerificationOen}
            onClose={onClose}
            testId={DATA_TEST_ID.emailVerificationFailedModal}
        >
            <Image
                src={verificationErrorImage}
                alt='verification error'
                maxW={{ base: SIZES.imageBase, lg: SIZES.full }}
            />
            <Box>
                <Heading mb={4} fontSize='2xl'>
                    Упс! Что-то пошло не так
                </Heading>
                <Text color={COLORS_BLACK_ALPHA[700]}>
                    Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться
                    снова.
                </Text>
            </Box>

            <Text fontSize='xs' color={COLORS_BLACK_ALPHA[600]}>
                Остались вопросы? Свяжитесь с{' '}
                <Text as='span' textDecor='underline' textUnderlineOffset={2}>
                    поддержкой
                </Text>
            </Text>
        </ModalWrapper>
    );
};
