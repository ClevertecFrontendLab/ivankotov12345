import { CloseButton, Modal, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react';

import { SIZES } from '~/constants/sizes';
import { BORDERS } from '~/constants/styles';

export const ModalWrapper: React.FC<ModalProps> = ({ children, isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} variant='authModal'>
        <ModalOverlay />

        <ModalContent>
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
            />

            {children}
        </ModalContent>
    </Modal>
);
