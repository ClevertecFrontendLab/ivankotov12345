import { Box, Heading, VStack } from '@chakra-ui/react';

import { Сarousel } from '~/components/carousel';
import { UserCard } from '~/components/user-card';
import { COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/colors';
import { usePathItems } from '~/hooks/use-path-items';
import { IngredientsTable } from '~/pages/recipe-page/components/ingredients-table';
import { NutritionValueSection } from '~/pages/recipe-page/components/nutrition-value-section';
import { RecipePageCard } from '~/pages/recipe-page/components/recipe-page-card';
import { StepCard } from '~/pages/recipe-page/components/step-card';
import { useGetRecipeQuery } from '~/query/services/recipe';
import { RecipeType } from '~/types/recipe';

export const RecipePage: React.FC = () => {
    const { currId } = usePathItems();

    const { data } = useGetRecipeQuery(currId);

    const {
        image,
        title,
        description,
        categoriesIds,
        bookmarks,
        likes,
        time,
        nutritionValue,
        ingredients,
        steps,
        portions,
    } = data as unknown as RecipeType;
    return (
        <VStack gap={10} mt={{ base: 6, lg: 14 }} mb={20}>
            <RecipePageCard
                image={image}
                title={title}
                description={description}
                categoriesIds={categoriesIds}
                bookmarks={bookmarks}
                likes={likes}
                time={time}
            />

            <VStack gap={10} maxW='recipeDetailsMaxWidth'>
                <NutritionValueSection {...nutritionValue} />
                <IngredientsTable ingredients={ingredients} portions={portions} />

                <VStack as='section' w='full' gap={5} alignItems='start'>
                    <Heading variant='sectionHeader'>Шаги приготовления</Heading>
                    {steps.map((step, index) => (
                        <StepCard
                            key={step.stepNumber}
                            {...step}
                            background={
                                index === steps.length - 1
                                    ? COLORS_LIME[50]
                                    : COLORS_BLACK_ALPHA[100]
                            }
                        />
                    ))}
                </VStack>

                <UserCard />
            </VStack>

            <Box w='full'>
                <Сarousel />
            </Box>
        </VStack>
    );
};
