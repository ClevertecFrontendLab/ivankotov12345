import { Image, Tag, Text } from '@chakra-ui/react';

import { CARD_BADGE_ITEMS } from '~/constants/card-badge-items';

type CardBadgeProps = {
    backgroundColor: string;
    category: string;
};

export const CardBadge: React.FC<CardBadgeProps> = ({ backgroundColor, category }) => (
    <Tag gap={1.5} py={0.5} px={2} bg={backgroundColor}>
        <Image src={CARD_BADGE_ITEMS[category]} alt={category} />
        <Text>{category}</Text>
    </Tag>
);
