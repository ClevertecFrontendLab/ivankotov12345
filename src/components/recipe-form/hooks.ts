import { useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useBlocker } from 'react-router';

export const useBlockerNavigation = (isBlocking: boolean) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const blocker = useBlocker(() => isBlocking);

    const unblockNavigation = () => {
        onClose();
        blocker.proceed?.();
    };

    const blockNavigation = () => {
        onClose();
        blocker.reset?.();
    };

    useEffect(() => {
        if (blocker.state === 'blocked') onOpen();
    }, [blocker, onOpen]);

    return { isOpen, onClose, unblockNavigation, blockNavigation };
};
