import { Tag } from '@chakra-ui/react';
import React from 'react';

import { COLORS_LIME } from '~/constants/styles/colors';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';

export const FilterTag: React.FC<{ item: string }> = ({ item }) => (
    <Tag
        variant={STYLE_VARIANTS.outline}
        border='lime'
        color={COLORS_LIME[600]}
        boxShadow='none'
        mr={2}
    >
        {item.replace(/^./, (char) => char.toUpperCase())}
    </Tag>
);
