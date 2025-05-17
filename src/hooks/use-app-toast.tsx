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
                <Alert variant='solid' status={status} py={3} px={4} bottom={20}>
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
