import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Center,
    CloseButton,
    VStack,
} from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';

import { COLORS } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { DATA_TEST_ID } from '~/constants/test-id';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectApp, setToastData, setToastIsOpen } from '~/store/slices/app-slice';

const INDENT_BOTTOM = {
    sm: '100px',
    lg: '80px',
};

const ALERT_WIDTH = {
    sm: '300px',
    lg: '400px',
};

const DURATION = 15000;

export const AlertError: React.FC = () => {
    const { statusData } = useAppSelector(selectApp);

    const dispatch = useAppDispatch();

    const onAlertClose = useCallback(() => {
        dispatch(setToastIsOpen(false));
        dispatch(setToastData());
    }, [dispatch]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            onAlertClose();
        }, DURATION);
        return () => clearTimeout(timerId);
    }, [dispatch, onAlertClose]);

    if (!statusData) return null;

    return (
        <Center
            position='fixed'
            w={SIZES.full}
            bottom={{ base: INDENT_BOTTOM.sm, lg: INDENT_BOTTOM.lg }}
        >
            <Alert
                variant={STYLE_VARIANTS.solid}
                status={statusData?.status || 'error'}
                w={{ base: ALERT_WIDTH.sm, lg: ALERT_WIDTH.lg }}
                py={3}
                px={4}
                gap={3}
                color={COLORS.white}
                data-test-id={DATA_TEST_ID.errorNotification}
            >
                <AlertIcon color={COLORS.white} />

                <VStack alignItems='start' gap={0}>
                    <AlertTitle>{statusData?.title}</AlertTitle>
                    {statusData?.description && (
                        <AlertDescription>{statusData?.description}</AlertDescription>
                    )}
                </VStack>

                <CloseButton
                    data-test-id={DATA_TEST_ID.closeAlertButton}
                    position='absolute'
                    variant={STYLE_VARIANTS.none}
                    top={1}
                    right={3}
                    onClick={onAlertClose}
                />
            </Alert>
        </Center>
    );
};
