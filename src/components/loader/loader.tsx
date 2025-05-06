import { Modal, ModalContent, ModalOverlay, useMediaQuery } from '@chakra-ui/react';

import { SPINNER_SIZE } from '~/constants/sizes';

import { LoaderSpinner } from '../loader-spinner';

type LoaderProps = {
    isLoading: boolean;
};

export const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
    const [isTablet] = useMediaQuery('(max-width: 74rem)');
    return (
        <Modal isOpen={isLoading} onClose={() => {}} isCentered variant='loader'>
            <ModalOverlay />

            <ModalContent>
                <LoaderSpinner
                    spinnerSize={isTablet ? SPINNER_SIZE.sizeSm : SPINNER_SIZE.sizeLg}
                    wrapperSpinnerSize={isTablet ? SPINNER_SIZE.wrapperSm : SPINNER_SIZE.wrapperlg}
                />
            </ModalContent>
        </Modal>
    );
};
