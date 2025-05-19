import { Box, Button, Heading, Image, ModalProps, Text } from '@chakra-ui/react';

import breakfast from '~/assets/modal-images/breakfast.png';
import { ModalWrapper } from '~/components/modal-wrapper';
import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { DATA_TEST_ID } from '~/constants/test-id';

type ModalSignInErrorProps = Pick<ModalProps, 'isOpen' | 'onClose'> & { onSubmit: () => void };

export const ModalSignInError: React.FC<ModalSignInErrorProps> = ({
    isOpen,
    onClose,
    onSubmit,
}) => (
    <ModalWrapper isOpen={isOpen} onClose={onClose} testId={DATA_TEST_ID.signInErrorModal}>
        <Image src={breakfast} alt='breakfast' />

        <Box>
            <Heading mb={4} fontSize='2xl'>
                Вход не выполнен
            </Heading>
            <Text color={COLORS_BLACK_ALPHA[700]}>
                Что-то пошло не так. <br /> Попробуйте еще раз
            </Text>
        </Box>

        <Button
            variant={STYLE_VARIANTS.black}
            w={SIZES.full}
            onClick={onSubmit}
            data-test-id={DATA_TEST_ID.repeatButton}
        >
            Повторить
        </Button>
    </ModalWrapper>
);
