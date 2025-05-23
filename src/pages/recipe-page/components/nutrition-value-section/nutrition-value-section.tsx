import { Box, SimpleGrid, Text } from '@chakra-ui/react';

import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { NutritionValue } from '~/types/recipe';

import { NutritionValueCard } from './nutrition-value-card';

const measurement: Record<string, string> = {
    calories: 'Ккал',
    weight: 'Грамм',
};

const nutritionValues: Record<string, string> = {
    calories: 'Калорийность',
    proteins: 'Белки',
    fats: 'Жиры',
    carbohydrates: 'Углеводы',
};

export const NutritionValueSection: React.FC<NutritionValue> = ({
    calories,
    proteins,
    fats,
    carbohydrates,
}) => (
    <Box as='section' w={SIZES.full}>
        <Text mb={5} fontSize='sm' color={COLORS_BLACK_ALPHA[800]}>
            * Калорийность на 1 порцию
        </Text>

        <SimpleGrid columns={{ base: 1, md: 4 }} gap={6}>
            <NutritionValueCard
                description={nutritionValues.calories}
                value={calories}
                measurement={measurement.calories}
            />

            <NutritionValueCard
                description={nutritionValues.proteins}
                value={proteins}
                measurement={measurement.weight}
            />

            <NutritionValueCard
                description={nutritionValues.fats}
                value={fats}
                measurement={measurement.weight}
            />

            <NutritionValueCard
                description={nutritionValues.carbohydrates}
                value={carbohydrates}
                measurement={measurement.weight}
            />
        </SimpleGrid>
    </Box>
);
