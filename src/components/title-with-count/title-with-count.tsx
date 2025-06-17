import { Heading, Text } from '@chakra-ui/react';

import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { BASE_TITLE_FONT_SIZE } from '~/constants/styles/sizes';

type TitleWithCountProps = {
    title: string;
    count: number;
};

export const TitleWithCount: React.FC<TitleWithCountProps> = ({ title, count }) => (
    <Heading
        fontSize={{ base: BASE_TITLE_FONT_SIZE, lg: 'xl' }}
        fontWeight='bold'
        alignSelf='start'
    >
        {title}{' '}
        <Text as='span' color={COLORS_BLACK_ALPHA[600]} fontWeight='normal'>{`(${count})`}</Text>
    </Heading>
);
