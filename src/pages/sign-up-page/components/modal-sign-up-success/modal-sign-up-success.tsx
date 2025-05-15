import { Box, Heading, Image, ModalProps, Text } from '@chakra-ui/react';

import registrationImage from '~/assets/modal-images/registration.png';
import { ModalWrapper } from '~/components/modal-wrapper';
import { COLORS_BLACK_ALPHA } from '~/constants/colors';

type ModalSignUpSuccessProps = Pick<ModalProps, 'isOpen' | 'onClose'> & { email: string };

export const ModalSignUpSuccess: React.FC<ModalSignUpSuccessProps> = ({
    isOpen,
    onClose,
    email,
}) => (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
        <Image src={registrationImage} alt='registration' />
        <Box>
            <Heading mb={4} fontSize='2xl'>
                Остался последний шаг. Нужно верифицировать ваш e-mail{' '}
            </Heading>
            <Text color={COLORS_BLACK_ALPHA[900]}>
                Мы отправили вам на почту <b>{email}</b> ссылку для верификации.
            </Text>
        </Box>

        <Text fontSize='xs' color={COLORS_BLACK_ALPHA[600]}>
            Не пришло письмо? Проверьте папку Спам. По другим вопросам свяжитесь с{' '}
            <Text as='span' textDecor='underline' textUnderlineOffset={2}>
                поддержкой
            </Text>
        </Text>
    </ModalWrapper>
);
