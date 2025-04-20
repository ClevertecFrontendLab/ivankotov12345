import { Stack } from '@chakra-ui/react';
import React from 'react';

import { FavoriteIcon, LikeIcon, PeopleIcon } from '../icons';
import { StatButton } from '../stat-button';

type StatsPropsType = {
    size: string;
    isOpen?: boolean;
};

export const Stats: React.FC<StatsPropsType> = ({ size, isOpen }) => (
    <Stack
        px={{ base: 4, lg: 16 }}
        py={4}
        gap={{ base: 3, xl: 6 }}
        direction={{ base: 'row', lg: 'column' }}
        alignItems='flex-end'
        visibility={isOpen ? 'hidden' : 'visible'}
    >
        <StatButton quantity={185} icon={<LikeIcon />} size={size} />
        <StatButton quantity={589} icon={<PeopleIcon />} size={size} />
        <StatButton quantity={587} icon={<FavoriteIcon />} size={size} />
    </Stack>
);
