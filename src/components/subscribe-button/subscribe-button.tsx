import { Button, Tooltip } from '@chakra-ui/react';

import { COLORS, COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { BORDERS } from '~/constants/styles/styles';
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
            await toggleSubscription({ fromUserId: userId, toUserId: bloggerId }).unwrap();
        } finally {
            setIsLoading?.(false);
        }
    };
    return (
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
        >
            <Button
                size='xs'
                variant={isFavorite ? STYLE_VARIANTS.none : STYLE_VARIANTS.black}
                border={isFavorite ? BORDERS.solid : 'none'}
                leftIcon={isFavorite ? <UnsubscribeIcon /> : <SubscribeIcon />}
                borderColor={COLORS_BLACK_ALPHA[600]}
                onClick={onSubscribeButtonClick}
            >
                {isFavorite ? 'Отписаться' : 'Подписаться'}
            </Button>
        </Tooltip>
    );
};
