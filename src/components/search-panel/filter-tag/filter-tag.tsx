import { Tag } from '@chakra-ui/react';
import React from 'react';

import { COLORS_LIME } from '~/constants/colors';

type FilterTagProps = {
    item: string;
};

export const FilterTag: React.FC<FilterTagProps> = ({ item }) => (
    <Tag variant='outline' border='lime' color={COLORS_LIME[600]} boxShadow='none'>
        {item.replace(/^./, (char) => char.toUpperCase())}
    </Tag>
);
