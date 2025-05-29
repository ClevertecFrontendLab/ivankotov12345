import { ModalProps } from '@chakra-ui/react';

import { ModalWrapper } from '~/components/modal-wrapper';

type ModalBlockNavigationProps = Pick<ModalProps, 'isOpen' | 'onClose'>;

export const ModalBlockNavigation: React.FC<ModalBlockNavigationProps> = ({ isOpen, onClose }) => (
    <ModalWrapper isOpen={isOpen} onClose={onClose} testId=''>
        <div>123</div>
    </ModalWrapper>
);
