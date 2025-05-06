import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Center,
    CloseButton,
    VStack,
} from '@chakra-ui/react';

import { COLORS } from '~/constants/colors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectApp, setErrorAlertIsOpen, setErrorData } from '~/store/slices/app-slice';

const INDENT_BOTTOM = {
    sm: '100px',
    lg: '80px',
};

const ALERT_WIDTH = {
    sm: '300px',
    lg: '400px',
};

export const AlertError: React.FC = () => {
    const { isErrorAlertOpen, errorData } = useAppSelector(selectApp);

    const dispatch = useAppDispatch();

    const onAlertCloseClick = () => {
        dispatch(setErrorAlertIsOpen(false));
        dispatch(setErrorData(undefined));
    };
    return isErrorAlertOpen ? (
        <Center position='fixed' w='full' bottom={{ base: INDENT_BOTTOM.sm, lg: INDENT_BOTTOM.lg }}>
            <Alert
                status='error'
                w={{ base: ALERT_WIDTH.sm, lg: ALERT_WIDTH.lg }}
                py={3}
                px={4}
                gap={3}
                bg={COLORS.red}
                color={COLORS.white}
            >
                <AlertIcon color={COLORS.white} />

                <VStack alignItems='start'>
                    <AlertTitle>{errorData?.title}</AlertTitle>
                    <AlertDescription>{errorData?.message}</AlertDescription>
                </VStack>

                <CloseButton
                    position='absolute'
                    right={3}
                    top={3}
                    color={COLORS.white}
                    onClick={onAlertCloseClick}
                />
            </Alert>
        </Center>
    ) : null;
};
