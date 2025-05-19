import { Tag } from '@chakra-ui/react';
import React from 'react';

import { COLORS_LIME } from '~/constants/styles/colors';

export const FilterTag: React.FC<{ item: string }> = ({ item }) => (
    <Tag variant='outline' border='lime' color={COLORS_LIME[600]} boxShadow='none'>
        {item.replace(/^./, (char) => char.toUpperCase())}
    </Tag>
);
