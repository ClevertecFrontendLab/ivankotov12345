import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    useToast,
    UseToastOptions,
} from '@chakra-ui/react';

import { COLORS } from '~/constants/colors';

const DURATION = 15000;

const ALERT_WIDTH = {
    sm: '328px',
    lg: '400px',
};

const INDENT_BOTTOM = {
    sm: '100px',
    lg: '80px',
};

export const useAppToast = () => {
    const toast = useToast();

    const showToast = (options: UseToastOptions, isLeftSideToast: boolean = true) => {
        toast({
            duration: DURATION,
            position: 'bottom',
            containerStyle: {
                position: 'relative',
                right: isLeftSideToast ? { base: 0, lg: '25%' } : 0,
            },
            render: ({ status, title, description, onClose }) => (
                <Alert
                    variant='solid'
                    status={status}
                    w={{ base: ALERT_WIDTH.sm, lg: ALERT_WIDTH.lg }}
                    py={3}
                    px={4}
                    bottom={{ base: INDENT_BOTTOM.sm, lg: INDENT_BOTTOM.lg }}
                >
                    <AlertIcon color={COLORS.white} />

                    <Box>
                        <AlertTitle>{title}</AlertTitle>
                        {description && <AlertDescription>{description}</AlertDescription>}
                    </Box>

                    <CloseButton size='sm' alignSelf='start' onClick={onClose} />
                </Alert>
            ),
            ...options,
        });
    };

    return showToast;
};
