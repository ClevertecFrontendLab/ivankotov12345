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
import { DATA_TEST_ID } from '~/constants/test-id';
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
    const { errorData } = useAppSelector(selectApp);

    const dispatch = useAppDispatch();

    const onAlertCloseClick = () => {
        dispatch(setErrorAlertIsOpen(false));
        dispatch(setErrorData());
    };
    return (
        <Center position='fixed' w='full' bottom={{ base: INDENT_BOTTOM.sm, lg: INDENT_BOTTOM.lg }}>
            <Alert
                status='error'
                w={{ base: ALERT_WIDTH.sm, lg: ALERT_WIDTH.lg }}
                py={3}
                px={4}
                gap={3}
                bg={COLORS.red}
                color={COLORS.white}
                data-test-id={DATA_TEST_ID.errorNotification}
            >
                <AlertIcon color={COLORS.white} />

                <VStack alignItems='start'>
                    <AlertTitle>{errorData?.title}</AlertTitle>
                    <AlertDescription>{errorData?.message}</AlertDescription>
                </VStack>

                <CloseButton
                    data-test-id={DATA_TEST_ID.closeAlertButton}
                    position='relative'
                    right={-1}
                    top={-1}
                    onClick={onAlertCloseClick}
                />
            </Alert>
        </Center>
    );
};
