import { Card, Flex, Text } from '@chakra-ui/react';
import React from 'react';

import { COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/styles/colors';

type NutritionValueCardProps = {
    description: string;
    value: number;
    measurement: string;
};

export const NutritionValueCard: React.FC<NutritionValueCardProps> = ({
    description,
    value,
    measurement,
}) => (
    <Card
        as={Flex}
        direction={{ base: 'row', md: 'column' }}
        alignItems='center'
        variant='outline'
        borderRadius='2xl'
        p={4}
        gap={3}
    >
        <Text fontSize='sm' flex={2} color={COLORS_BLACK_ALPHA[600]} textTransform='lowercase'>
            {description}
        </Text>

        <Text
            fontSize='4xl'
            flex={1}
            fontWeight='medium'
            textAlign='center'
            color={COLORS_LIME[800]}
        >
            {value}
        </Text>

        <Text
            fontSize='sm'
            fontWeight='semibold'
            textTransform='uppercase'
            color={COLORS_BLACK_ALPHA[900]}
        >
            {measurement}
        </Text>
    </Card>
);
