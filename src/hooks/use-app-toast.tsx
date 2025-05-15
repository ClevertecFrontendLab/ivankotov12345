import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    CloseButton,
    useToast,
    UseToastOptions,
    VStack,
} from '@chakra-ui/react';

import { COLORS } from '~/constants/colors';

export const useAppToast = () => {
    const toast = useToast();

    const showToast = (options: UseToastOptions) => {
        toast({
            duration: 15000,
            position: 'bottom',
            render: ({ status, title, description, onClose }) => (
                <Alert variant='solid' status={status} py={3} px={4} gap={3} bottom={20}>
                    <AlertIcon color={COLORS.white} />

                    <VStack alignItems='start'>
                        <AlertTitle lineHeight={0}>{title}</AlertTitle>
                        {description && <AlertDescription>{description}</AlertDescription>}
                    </VStack>

                    <CloseButton
                        size='sm'
                        position='relative'
                        top={-1}
                        left={-1}
                        onClick={onClose}
                    />
                </Alert>
            ),
            ...options,
        });
    };

    return showToast;
};
