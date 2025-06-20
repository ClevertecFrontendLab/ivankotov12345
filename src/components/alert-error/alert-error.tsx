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

import { ALERT_ERROR_TEXT } from '~/constants/statuses';
import { COLORS } from '~/constants/styles/colors';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { Z_INDEX } from '~/constants/styles/z-index';
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

const VALID_STATUSES = ['error', 'success', 'warning', 'info'] as const;

export const AlertError: React.FC = () => {
    const { statusData } = useAppSelector(selectApp);
    const dispatch = useAppDispatch();

    const onAlertClose = useCallback(() => {
        dispatch(setToastIsOpen(false));
        dispatch(setToastData());
    }, [dispatch]);

    useEffect(() => {
        if (!statusData) return;

        const timerId = setTimeout(() => {
            onAlertClose();
        }, DURATION);
        return () => clearTimeout(timerId);
    }, [dispatch, onAlertClose, statusData]);

    if (!statusData) return null;

    const status = VALID_STATUSES.includes(statusData.status) ? statusData.status : 'error';

    return (
        <Center
            position='fixed'
            left='50%'
            transform='translateX(-50%)'
            bottom={{ base: INDENT_BOTTOM.sm, lg: INDENT_BOTTOM.lg }}
            zIndex={Z_INDEX.toast}
        >
            <Alert
                variant={STYLE_VARIANTS.solid}
                status={status}
                w={{ base: ALERT_WIDTH.sm, lg: ALERT_WIDTH.lg }}
                py={3}
                px={4}
                gap={3}
                color={COLORS.white}
                data-test-id={DATA_TEST_ID.errorNotification}
            >
                <AlertIcon color={COLORS.white} />

                <VStack alignItems='start' gap={0}>
                    <AlertTitle data-test-id={DATA_TEST_ID.errorNotificationTitle}>
                        {statusData.title || ALERT_ERROR_TEXT.title}
                    </AlertTitle>
                    {statusData.description && (
                        <AlertDescription>{statusData.description}</AlertDescription>
                    )}
                    {status === 'error' && !statusData.description && (
                        <AlertDescription data-test-id={DATA_TEST_ID.errorNotificationDescription}>
                            {ALERT_ERROR_TEXT.description}
                        </AlertDescription>
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
