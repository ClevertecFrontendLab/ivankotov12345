import { Button, Tooltip } from '@chakra-ui/react';

import { COLORS, COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { BORDERS } from '~/constants/styles/styles';
import { DATA_TEST_ID } from '~/constants/test-id';
import { useToggleSubscriptionMutation } from '~/query/services/blogs';
import { useAppSelector } from '~/store/hooks';
import { selectUserId } from '~/store/slices/app-slice';

import { SubscribeIcon, UnsubscribeIcon } from '../icons';

type SubscribeButtonProps = {
    setIsLoading: (isLoading: boolean) => void;
    bloggerId: string;
    isFavorite: boolean;
};

const SUBSCRIBE_LABEL = 'Нажмите, если хотите отписаться';

export const SubscribeButton: React.FC<Partial<SubscribeButtonProps>> = ({
    bloggerId,
    isFavorite,
    setIsLoading,
}) => {
    const userId = useAppSelector(selectUserId);
    const [toggleSubscription] = useToggleSubscriptionMutation();

    const onSubscribeButtonClick = async () => {
        if (!userId || !bloggerId) return;
        setIsLoading?.(true);

        try {
            await toggleSubscription({ fromUserId: userId, toUserId: bloggerId });
        } finally {
            setIsLoading?.(false);
        }
    };
    return (
        <>
            <Tooltip
                hasArrow
                label={SUBSCRIBE_LABEL}
                isDisabled={!isFavorite}
                left={4}
                maxW={40}
                px={2}
                borderRadius='base'
                bg={COLORS_BLACK_ALPHA[900]}
                fontSize='sm'
                color={COLORS.white}
                data-test-id={DATA_TEST_ID.blogTooltip}
                display={isFavorite ? 'block' : 'none'}
            >
                <Button
                    size='xs'
                    display={isFavorite ? 'block' : 'none'}
                    variant={STYLE_VARIANTS.none}
                    border={BORDERS.solid}
                    leftIcon={<UnsubscribeIcon />}
                    borderColor={COLORS_BLACK_ALPHA[600]}
                    onClick={onSubscribeButtonClick}
                    data-test-id={DATA_TEST_ID.blogToggleUnsubscribe}
                >
                    Отписаться
                </Button>
            </Tooltip>

            <Button
                display={isFavorite ? 'none' : 'block'}
                size='xs'
                variant={STYLE_VARIANTS.black}
                border='none'
                leftIcon={<SubscribeIcon />}
                borderColor={COLORS_BLACK_ALPHA[600]}
                onClick={onSubscribeButtonClick}
                data-test-id={DATA_TEST_ID.blogToggleSubscribe}
            >
                Подписаться
            </Button>
        </>
    );
};
