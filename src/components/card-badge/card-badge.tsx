import { Badge, Image } from '@chakra-ui/react';

import { CARD_BADGE_ITEMS } from '~/constants/card-badge-items';

type CardBadgeProps = {
    backgroundColor: string;
    category: string;
};

export const CardBadge: React.FC<CardBadgeProps> = ({ backgroundColor, category }) => (
    <Badge
        display='flex'
        alignItems='center'
        borderRadius='base'
        gap={1.5}
        py={0.5}
        px={2}
        bg={backgroundColor}
        fontSize='sm'
        fontWeight='normal'
        textTransform='none'
    >
        <Image src={CARD_BADGE_ITEMS[category]} alt={category} />
        {category}
    </Badge>
);
