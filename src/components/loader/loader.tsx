import { Modal, ModalContent, ModalOverlay, Spinner } from '@chakra-ui/react';

import { COLORS } from '~/constants/colors';

type LoaderProps = {
    isLoading: boolean;
};

export const Loader: React.FC<LoaderProps> = ({ isLoading }) => (
    <Modal isOpen={isLoading} onClose={() => {}} isCentered variant='loader'>
        <ModalOverlay />

        <ModalContent>
            <Spinner w={9} h={9} color={COLORS.black} />
        </ModalContent>
    </Modal>
);
