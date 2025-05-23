import { Box, Heading, Image, ModalProps, Text } from '@chakra-ui/react';

import registrationImage from '~/assets/modal-images/registration.png';
import { ModalWrapper } from '~/components/modal-wrapper';
import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { DATA_TEST_ID } from '~/constants/test-id';

type ModalSignUpSuccessProps = Pick<ModalProps, 'isOpen' | 'onClose'> & { email: string };

export const ModalSignUpSuccess: React.FC<ModalSignUpSuccessProps> = ({
    isOpen,
    onClose,
    email,
}) => (
    <ModalWrapper isOpen={isOpen} onClose={onClose} testId={DATA_TEST_ID.signUpSuccessModal}>
        <Image
            src={registrationImage}
            alt='registration'
            maxW={{ base: SIZES.imageBase, lg: SIZES.full }}
        />
        <Box>
            <Heading mb={4} fontSize='2xl'>
                Остался последний шаг. Нужно верифицировать ваш e-mail{' '}
            </Heading>
            <Box color={COLORS_BLACK_ALPHA[900]}>
                <Text>Мы отправили вам на почту</Text>
                <Text fontWeight='semibold'>{email}</Text>
                <Text>ссылку для верификации.</Text>
            </Box>
        </Box>

        <Text fontSize='xs' color={COLORS_BLACK_ALPHA[600]}>
            Не пришло письмо? Проверьте папку Спам. По другим вопросам свяжитесь с{' '}
            <Text as='span' textDecor='underline' textUnderlineOffset={2}>
                поддержкой
            </Text>
        </Text>
    </ModalWrapper>
);
