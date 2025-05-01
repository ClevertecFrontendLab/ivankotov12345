import { Image, Tag, Text } from '@chakra-ui/react';

import { getFullImagePath } from '~/helpers/get-full-image-path';

type CardBadgeProps = {
    backgroundColor: string;
    title: string;
    icon: string;
};

export const CardBadge: React.FC<CardBadgeProps> = ({ backgroundColor, icon, title }) => (
    <Tag bg={backgroundColor} py={0.5} px={{ base: 1, lg: 2 }}>
        <Image src={getFullImagePath(icon)} alt={icon} w={4} h={4} />
        <Text whiteSpace='nowrap' fontWeight='normal'>
            {title}
        </Text>
    </Tag>
);
