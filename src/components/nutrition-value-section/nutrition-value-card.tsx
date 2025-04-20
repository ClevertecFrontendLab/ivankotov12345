import { Card, Text, VStack } from '@chakra-ui/react';
import React from 'react';

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
    <Card as={VStack} variant='outline' borderRadius='2xl' p={4} gap={3}>
        <Text fontSize='sm' color='blackAlpha.600' textTransform='lowercase'>
            {description}
        </Text>
        <Text fontSize='4xl' fontWeight='medium' color='lime.800'>
            {value}
        </Text>

        <Text fontSize='sm' fontWeight='semibold' textTransform='uppercase' color='blackAlpha.900'>
            {measurement}
        </Text>
    </Card>
);
