import { Image, Tag, Text } from '@chakra-ui/react';

import { CARD_BADGE_ITEMS } from '~/constants/card-badge-items';

type CardBadgeProps = {
    backgroundColor: string;
    category: string;
};

export const CardBadge: React.FC<CardBadgeProps> = ({ backgroundColor, category }) => (
    <Tag bg={backgroundColor} py={0.5} px={{ base: 1, lg: 2 }}>
        <Image src={CARD_BADGE_ITEMS[category]} alt={category} w={4} h={4} />
        <Text whiteSpace='nowrap' fontWeight='normal'>
            {category}
        </Text>
    </Tag>
);
