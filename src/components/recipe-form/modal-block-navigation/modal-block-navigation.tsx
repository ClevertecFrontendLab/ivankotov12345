import { EditIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, Image, ModalProps, Text } from '@chakra-ui/react';

import breakfast from '~/assets/modal-images/breakfast.png';
import { ModalWrapper } from '~/components/modal-wrapper';
import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';

type ModalBlockNavigationProps = Pick<ModalProps, 'isOpen' | 'onClose'> & {
    onSubmitDraft: () => Promise<void>;
    unblockNavigation: () => void;
};

export const ModalBlockNavigation: React.FC<ModalBlockNavigationProps> = ({
    isOpen,
    onClose,
    onSubmitDraft,
    unblockNavigation,
}) => (
    <ModalWrapper isOpen={isOpen} onClose={onClose} testId=''>
        <Image src={breakfast} alt='breakfast' />

        <Box>
            <Heading mb={4} fontSize='2xl'>
                Выйти без сохранения?
            </Heading>
            <Text color={COLORS_BLACK_ALPHA[700]}>
                Чтобы сохранить, нажмите кнопку сохранить черновик
            </Text>
        </Box>

        <Button
            variant={STYLE_VARIANTS.black}
            w={SIZES.full}
            leftIcon={<EditIcon />}
            onClick={onSubmitDraft}
        >
            Сохранить черновик
        </Button>
        <Button variant={STYLE_VARIANTS.none} onClick={unblockNavigation}>
            Выйти без сохраненеия
        </Button>
    </ModalWrapper>
);
