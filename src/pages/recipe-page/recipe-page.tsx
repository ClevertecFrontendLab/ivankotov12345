import { Box, Heading, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';

import { Сarousel } from '~/components/carousel';
import { UserCard } from '~/components/user-card';
import { COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { usePathItems } from '~/hooks/use-path-items';
import { IngredientsTable } from '~/pages/recipe-page/components/ingredients-table';
import { NutritionValueSection } from '~/pages/recipe-page/components/nutrition-value-section';
import { RecipePageCard } from '~/pages/recipe-page/components/recipe-page-card';
import { StepCard } from '~/pages/recipe-page/components/step-card';
import { useGetRecipeQuery } from '~/query/services/recipe';
import { useAppDispatch } from '~/store/hooks';
import { clearSelectedRecipeTitle } from '~/store/slices/selected-recipe-slice';
import { RecipeType } from '~/types/recipe';

export const RecipePage: React.FC = () => {
    const { currId } = usePathItems();
    const { data } = useGetRecipeQuery(currId);

    const dispatch = useAppDispatch();

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

    useEffect(
        () => () => {
            dispatch(clearSelectedRecipeTitle());
        },
        [dispatch],
    );

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

            <VStack gap={10} maxW={SIZES.recipeDetailsMaxWidth}>
                <NutritionValueSection {...nutritionValue} />
                <IngredientsTable ingredients={ingredients} portions={portions} />

                <VStack as='section' w={SIZES.full} gap={5} alignItems='start'>
                    <Heading variant={STYLE_VARIANTS.sectionHeading}>Шаги приготовления</Heading>
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

            <Box w={SIZES.full}>
                <Сarousel />
            </Box>
        </VStack>
    );
};
