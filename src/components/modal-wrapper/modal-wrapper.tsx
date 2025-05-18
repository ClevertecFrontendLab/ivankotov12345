import { CloseButton, Modal, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react';

import { SIZES } from '~/constants/sizes';
import { BORDERS } from '~/constants/styles';
import { DATA_TEST_ID } from '~/constants/test-id';

export const ModalWrapper: React.FC<ModalProps & { testId: string }> = ({
    children,
    isOpen,
    onClose,
    testId,
}) => (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} variant='authModal'>
        <ModalOverlay />

        <ModalContent data-test-id={testId}>
            <CloseButton
                size='sm'
                position='absolute'
                top={6}
                right={6}
                border={BORDERS.black}
                borderRadius={SIZES.full}
                onClick={onClose}
                _hover={{
                    bg: 'transparent',
                }}
                data-test-id={DATA_TEST_ID.closeButton}
            />

            {children}
        </ModalContent>
    </Modal>
);
